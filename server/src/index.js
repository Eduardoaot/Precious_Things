import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());

const DIA = 24 * 60 * 60 * 1000;
const VENTANA = 90;

// Mientras el listado siga con datos de ejemplo llegan ids tipo "c-1001": ese es el cliente 1.
function idDeCliente(raw) {
  const digitos = String(raw).match(/(\d+)\s*$/);
  if (!digitos) return null;
  const numero = Number(digitos[1]);
  if (!Number.isInteger(numero) || numero <= 0) return null;
  return numero > 1000 ? numero - 1000 : numero;
}

function resumen(ordenes) {
  const hoy = Date.now();
  const recientes = ordenes.filter((orden) => hoy - new Date(orden.fecha).getTime() <= VENTANA * DIA);
  const totalGastado = ordenes.reduce((suma, orden) => suma + orden.total, 0);
  const ultima = ordenes[0] ? new Date(ordenes[0].fecha).getTime() : null;
  const primera = ordenes.length ? new Date(ordenes[ordenes.length - 1].fecha).getTime() : null;

  return {
    pedidos90: recientes.length,
    gasto90: recientes.reduce((suma, orden) => suma + orden.total, 0),
    totalGastado,
    totalPedidos: ordenes.length,
    totalPiezas: ordenes.reduce((suma, orden) => suma + orden.cantidad, 0),
    ticketPromedio: ordenes.length ? Math.round(totalGastado / ordenes.length) : 0,
    ultimaCompra: ordenes[0]?.fecha ?? null,
    primeraCompra: ordenes[ordenes.length - 1]?.fecha ?? null,
    diasSinComprar: ultima === null ? null : Math.round((hoy - ultima) / DIA),
    diasComoCliente: primera === null ? null : Math.round((hoy - primera) / DIA),
    pedidoMasAlto: ordenes.reduce((mayor, orden) => (!mayor || orden.total > mayor.total ? orden : mayor), null),
  };
}

function tipoDeCliente({ pedidos90, gasto90, totalGastado, diasSinComprar }) {
  if (diasSinComprar === null || diasSinComprar > VENTANA) return 'riesgo';
  if (gasto90 >= 40000 || (totalGastado >= 200000 && pedidos90 >= 2)) return 'alto-valor';
  return 'normal';
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1 FROM vw_ordenes_por_usuario LIMIT 1');
    res.json({ ok: true, base: process.env.DB_NAME || 'bd_laquinta' });
  } catch (error) {
    res.status(503).json({ ok: false, error: error.message });
  }
});

app.get('/api/clientes/:id/ordenes', async (req, res) => {
  const idCliente = idDeCliente(req.params.id);
  if (idCliente === null) {
    return res.status(400).json({ error: 'Identificador de cliente no válido' });
  }

  try {
    const [filas] = await pool.query(
      `SELECT idCliente, NombreCliente, idPedido, NumPedido, Fecha, Cantidad, Precio, Total
       FROM vw_ordenes_por_usuario
       WHERE idCliente = ?
       ORDER BY Fecha DESC, idPedido DESC`,
      [idCliente]
    );

    if (filas.length === 0) {
      return res.status(404).json({
        error: 'La vista vw_ordenes_por_usuario no tiene órdenes para este cliente',
      });
    }

    const ordenes = filas.map((fila) => ({
      idPedido: fila.idPedido,
      numPedido: fila.NumPedido,
      fecha: fila.Fecha,
      cantidad: fila.Cantidad,
      precio: fila.Precio,
      total: Number(fila.Total),
    }));

    const stats = resumen(ordenes);

    res.json({
      cliente: { id: filas[0].idCliente, nombre: filas[0].NombreCliente },
      ordenes,
      stats: { ...stats, tipo: tipoDeCliente(stats) },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`API de Precious Things escuchando en http://localhost:${port}`);
});
