import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Avatar from '../components/Avatar';
import TagDetail from '../components/TagDetail';
import useOrdenesCliente from '../hooks/useOrdenesCliente';
import { TIPOS } from '../data/clientes';
import './Panel.css';
import './ClienteDetalle.css';

const ORDER_COLUMNS = [
  { key: 'folio', label: 'Folio', width: '1fr' },
  { key: 'fecha', label: 'Fecha', width: '1fr' },
  { key: 'cantidad', label: 'Cantidad', width: '1fr' },
  { key: 'total', label: 'Total', width: '1fr' },
];
const ORDER_GRID = ORDER_COLUMNS.map((column) => column.width).join(' ');

const money = (value) => `$${Number(value).toLocaleString('es-MX')}`;

// La base entrega las fechas como 'YYYY-MM-DD'.
const fecha = (value) => {
  const [anio, mes, dia] = value.split('-').map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// El nombre llega en una sola columna: "Juan Pérez" -> "Juan" + "Pérez".
function partirNombre(nombre) {
  const partes = nombre.trim().split(/\s+/);
  return { nombre: partes[0], apellido: partes.length > 1 ? partes[partes.length - 1] : partes[0] };
}

function BackLink() {
  return (
    <Link to="/panel" className="cd__back">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
      Volver al listado
    </Link>
  );
}

function Aviso({ titulo, texto }) {
  return (
    <main className="pn cd">
      <div className="pn__rule" aria-hidden="true" />
      <section className="shell cd__missing">
        <BackLink />
        <h1 className="display pn__title">{titulo}</h1>
        <p className="body-text">{texto}</p>
      </section>
    </main>
  );
}

export default function ClienteDetalle() {
  const { id } = useParams();
  const { cargando, error, datos, conteoEtiquetas } = useOrdenesCliente(id);

  if (cargando) {
    return <Aviso titulo="Cargando cliente" texto="Consultando las órdenes en la base de datos." />;
  }

  if (error) {
    return (
      <Aviso
        titulo={error.status === 404 ? 'Cliente no encontrado' : 'No se pudo cargar el cliente'}
        texto={
          error.status === 404
            ? `Las vistas no devuelven ningún cliente con el identificador «${id}».`
            : `${error.message}. Revisa que la API esté levantada en el puerto 3001.`
        }
      />
    );
  }

  const { cliente, ordenes, stats } = datos;
  const tipo = TIPOS[cliente.tipo] ?? { label: cliente.tipo, tone: 'sky' };
  const partes = partirNombre(cliente.nombre);


  const actividad = [
    { label: 'Pedidos últimos 90 días', value: stats.pedidos90, tone: 'mint' },
    { label: 'Gasto últimos 90 días', value: money(stats.gasto90), tone: 'sky' },
    { label: 'Gasto histórico', value: money(stats.totalGastado), tone: 'gold' },
    { label: 'Pedidos históricos', value: stats.totalPedidos, tone: 'lilac' },
    { label: 'Antigüedad', value: stats.antiguedad, tone: 'peach' },
    { label: 'Ticket promedio', value: money(stats.ticketPromedio), tone: 'rose' },
  ];

  const detalle = [
    { label: 'Última compra', value: stats.ultimaCompra ? fecha(stats.ultimaCompra) : 'Sin compras' },
    { label: 'Días sin comprar', value: stats.diasSinComprar ?? 'Sin compras' },
    {
      label: 'Pedido más alto',
      value: stats.pedidoMasAlto
        ? `${money(stats.pedidoMasAlto.total)} (${stats.pedidoMasAlto.numPedido})`
        : 'Sin datos',
    },
  ];

  return (
    <main className="pn cd">
      <div className="pn__rule" aria-hidden="true" />

      <section className="shell cd__top">
        <BackLink />
      </section>

      <section className="shell">
        <Reveal variant="zoom" className="cd__profile">
          <Avatar nombre={partes.nombre} apellido={partes.apellido} size={104} />
          <div className="cd__identity">
            <span className="eyebrow pn__eyebrow">Vista general del cliente</span>
            <h1 className="display cd__name">{cliente.nombre}</h1>
            <div className="cd__badges">
              <span className={`pn__type pn__type--${tipo.tone}`}>{tipo.label}</span>
              <span className="pn__tag">Cliente #{cliente.id}</span>
              {cliente.etiquetas.map((etiqueta) => (
                <TagDetail key={etiqueta} tags={[etiqueta]} conteos={conteoEtiquetas} />
              ))}
              {cliente.etiquetas.length === 0 && <span className="cd__sinTags">Sin motivos destacados</span>}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="shell cd__kpis" aria-label="Indicadores del cliente">
        {actividad.map((item, i) => (
          <Reveal key={item.label} variant="unfold" delay={i * 80} className={`cd__kpi cd__kpi--${item.tone}`}>
            <span className="cd__kpiLabel">{item.label}</span>
            <strong className="cd__kpiValue">{item.value}</strong>
          </Reveal>
        ))}
      </section>

      <section className="shell cd__section">
        <Reveal variant="zoom" className="pn__panel cd__facts">
          <header className="pn__toolbar">
            <div>
              <h2 className="pn__tableTitle">Datos de sus pedidos</h2>
              <p className="pn__tableNote">Resumen calculado sobre todo su historial</p>
            </div>
          </header>
          <dl className="cd__factGrid">
            {detalle.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="shell cd__section" aria-label="Órdenes del cliente">
        <Reveal variant="zoom" className="pn__panel">
          <header className="pn__toolbar">
            <div>
              <h2 className="pn__tableTitle">Órdenes</h2>
              <p className="pn__tableNote">{ordenes.length} pedidos, del más reciente al más antiguo</p>
            </div>
          </header>

          <div className="pn__table" role="table">
            <div className="pn__thead cd__orders" role="row" style={{ gridTemplateColumns: ORDER_GRID }}>
              {ORDER_COLUMNS.map((column) => (
                <span key={column.key} role="columnheader" className="pn__th">{column.label}</span>
              ))}
            </div>
            <div className="pn__tbody">
              {ordenes.map((orden, row) => (
                <div
                  key={orden.idPedido}
                  role="row"
                  className="pn__tr cd__orders"
                  style={{ gridTemplateColumns: ORDER_GRID, animationDelay: `${row * 45}ms` }}
                >
                  <span role="cell" className="pn__td cd__folio">{orden.numPedido}</span>
                  <span role="cell" className="pn__td">{fecha(orden.fecha)}</span>
                  <span role="cell" className="pn__td pn__num">{orden.cantidad}</span>
                  <span role="cell" className="pn__td pn__num">{money(orden.total)}</span>
                </div>
              ))}
              {ordenes.length === 0 && <p className="pn__none">Este cliente aún no tiene pedidos.</p>}
            </div>
          </div>

          <footer className="pn__foot cd__total">
            <span className="pn__empty">
              <i aria-hidden="true" />
              Total histórico
            </span>
            <strong>{money(stats.totalGastado)}</strong>
          </footer>
        </Reveal>
      </section>
    </main>
  );
}
