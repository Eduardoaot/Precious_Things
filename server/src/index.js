import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());

const DIA = 24 * 60 * 60 * 1000;

// Mientras el listado siga con datos de ejemplo llegan ids tipo "c-1001": ese es el cliente 1.
function idDeCliente(raw) {
  const digitos = String(raw).match(/(\d+)\s*$/);
  if (!digitos) return null;
  const numero = Number(digitos[1]);
  if (!Number.isInteger(numero) || numero <= 0) return null;
  return numero > 1000 ? numero - 1000 : numero;
}

const partirEtiquetas = (texto) =>
  (texto || '')
    .split(',')
    .map((etiqueta) => etiqueta.trim())
    .filter(Boolean);

const dias = (desde) => Math.round((Date.now() - new Date(desde).getTime()) / DIA);

// Lo que las vistas no traen: se calcula sobre las órdenes del cliente.
function resumenDeOrdenes(ordenes) {
  if (ordenes.length === 0) {
    return {
      ticketPromedio: 0,
      ultimaCompra: null,
      primeraCompra: null,
      diasSinComprar: null,
      diasComoCliente: null,
      pedidoMasAlto: null,
      totalPiezas: 0,
    };
  }

  const total = ordenes.reduce((suma, orden) => suma + orden.total, 0);
  return {
    ticketPromedio: Math.round(total / ordenes.length),
    ultimaCompra: ordenes[0].fecha,
    primeraCompra: ordenes[ordenes.length - 1].fecha,
    diasSinComprar: dias(ordenes[0].fecha),
    diasComoCliente: dias(ordenes[ordenes.length - 1].fecha),
    pedidoMasAlto: ordenes.reduce((mayor, orden) => (orden.total > mayor.total ? orden : mayor), ordenes[0]),
    totalPiezas: ordenes.reduce((suma, orden) => suma + orden.cantidad, 0),
  };
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1 FROM v_listado_clientes LIMIT 1');
    res.json({ ok: true, base: process.env.DB_NAME || 'bd_laquinta' });
  } catch (error) {
    res.status(503).json({ ok: false, error: error.message });
  }
});

// Listado del panel: vw_ListadoClientes trae nombre y actividad, v_listado_clientes las etiquetas.
app.get('/api/clientes', async (_req, res) => {
  try {
    const [filas] = await pool.query(
      `SELECT l.idCliente, l.NombreCliente, l.Pedidos_Ultimos_90Dias, l.Gasto_Ultimos_90Dias,
              l.TipoCliente, v.tipo_cliente, v.etiquetas
       FROM vw_ListadoClientes l
       INNER JOIN v_listado_clientes v ON v.idCliente = l.idCliente
       ORDER BY l.idCliente`
    );

    res.json(
      filas.map((fila) => ({
        id: fila.idCliente,
        nombre: fila.NombreCliente,
        pedidos90: Number(fila.Pedidos_Ultimos_90Dias),
        gasto90: Number(fila.Gasto_Ultimos_90Dias),
        tipo: fila.tipo_cliente,
        tipoFuncion: fila.TipoCliente,
        etiquetas: partirEtiquetas(fila.etiquetas),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tarjetas de arriba del panel.
app.get('/api/kpis', async (_req, res) => {
  try {
    const [filas] = await pool.query(
      'SELECT tipo_cliente, cuantos_clientes, porcentaje, gasto_90d FROM v_kpis_clientes'
    );

    const kpis = { 'alto-valor': null, normal: null, riesgo: null };
    Object.keys(kpis).forEach((tipo) => {
      const fila = filas.find((item) => item.tipo_cliente === tipo);
      kpis[tipo] = {
        clientes: fila ? Number(fila.cuantos_clientes) : 0,
        porcentaje: fila ? Number(fila.porcentaje) : 0,
        gasto90: fila ? Number(fila.gasto_90d) : 0,
      };
    });

    res.json(kpis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cuántos clientes comparten cada motivo de la vista del listado.
app.get('/api/etiquetas', async (_req, res) => {
  try {
    const [filas] = await pool.query('SELECT etiquetas FROM v_listado_clientes');
    const conteo = {};
    filas.forEach((fila) => {
      partirEtiquetas(fila.etiquetas).forEach((motivo) => {
        conteo[motivo] = (conteo[motivo] || 0) + 1;
      });
    });
    res.json(conteo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clientes/:id', async (req, res) => {
  const idCliente = idDeCliente(req.params.id);
  if (idCliente === null) {
    return res.status(400).json({ error: 'Identificador de cliente no válido' });
  }

  try {
    const [listado] = await pool.query(
      `SELECT idCliente, nombre, pedidos_90d, gasto_90d, tipo_cliente, etiquetas
       FROM v_listado_clientes
       WHERE idCliente = ?`,
      [idCliente]
    );

    if (listado.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const [clasificacion] = await pool.query(
      'SELECT total_pedidos, gasto_total, pedidos_30d FROM v_cliente_clasificacion WHERE idCliente = ?',
      [idCliente]
    );

    const [financieras] = await pool.query(
      `SELECT PedidosUltimos90Dias, GastoUltimos90Dias, GastoHistorico,
              PedidosHistoricos, Antiguedad, TicketPromedio
       FROM vw_clientes_metricas_financieras
       WHERE idCliente = ?`,
      [idCliente]
    );

    const [filas] = await pool.query(
      `SELECT idPedido, NumPedido, Fecha, Cantidad, Precio, Total
       FROM vw_ordenes_por_usuario
       WHERE idCliente = ?
       ORDER BY Fecha DESC, idPedido DESC`,
      [idCliente]
    );

    const general = listado[0];
    const numeros = clasificacion[0] ?? { total_pedidos: 0, gasto_total: 0, pedidos_30d: 0 };
    const finanzas = financieras[0] ?? null;

    const ordenes = filas.map((fila) => ({
      idPedido: fila.idPedido,
      numPedido: fila.NumPedido,
      fecha: fila.Fecha,
      cantidad: fila.Cantidad,
      precio: fila.Precio,
      total: Number(fila.Total),
    }));

    res.json({
      cliente: {
        id: general.idCliente,
        nombre: general.nombre,
        tipo: general.tipo_cliente,
        etiquetas: partirEtiquetas(general.etiquetas),
      },
      stats: {
        ...resumenDeOrdenes(ordenes),
        // Los seis indicadores de la ficha salen de vw_clientes_metricas_financieras.
        pedidos90: Number(finanzas?.PedidosUltimos90Dias ?? general.pedidos_90d),
        gasto90: Number(finanzas?.GastoUltimos90Dias ?? general.gasto_90d),
        totalPedidos: Number(finanzas?.PedidosHistoricos ?? numeros.total_pedidos),
        totalGastado: Number(finanzas?.GastoHistorico ?? numeros.gasto_total),
        ticketPromedio: Number(finanzas?.TicketPromedio ?? 0),
        antiguedad: finanzas?.Antiguedad ?? 'Sin compras',
        pedidos30: Number(numeros.pedidos_30d),
      },
      ordenes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`API de Precious Things escuchando en http://localhost:${port}`);
});
