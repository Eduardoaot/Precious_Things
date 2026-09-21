import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Avatar from '../components/Avatar';
import TagDetail from '../components/TagDetail';
import { TIPOS, getClientes, money } from '../data/clientes';
import './Panel.css';

const KPIS = [
  {
    id: 'alto-valor',
    tone: 'mint',
    label: 'Clientes de alto valor',
    hint: 'Ticket alto y compra recurrente',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M5 9 L12 3 L19 9 L12 21 Z M5 9 L19 9" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
  },
  {
    id: 'normal',
    tone: 'sky',
    label: 'Clientes normales',
    hint: 'Compra estable dentro del promedio',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 Z M4 21c0-4 3.6-6 8-6s8 2 8 6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
  },
  {
    id: 'riesgo',
    tone: 'rose',
    label: 'Clientes en riesgo',
    hint: 'Sin compras en los últimos 90 días',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 4 L21 20 H3 Z M12 10 v4 M12 17 v0.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
    ),
  },
];

const COLUMNS = [
  { key: 'cliente', label: 'Cliente', width: '2.1fr' },
  { key: 'pedidos', label: 'Pedidos 90 días', width: '1.1fr', sortBy: 'pedidos90' },
  { key: 'gasto', label: 'Gasto 90 días', width: '1.1fr', sortBy: 'gasto90' },
  { key: 'tipo', label: 'Tipo de cliente', width: '1.1fr' },
  { key: 'etiquetas', label: 'Etiquetas', width: '1.7fr' },
  { key: 'vista', label: 'Vista general', width: '1fr' },
];

const FILTERS = [{ id: 'todos', label: 'Todos' }, ...Object.entries(TIPOS).map(([id, tipo]) => ({ id, label: tipo.label }))];

const GRID = COLUMNS.map((column) => column.width).join(' ');
const PAGE_SIZE = 8;
const MAX_TAGS = 2;

// Cada clic en el encabezado: mayor a menor, menor a mayor, sin orden.
const NEXT_DIR = { none: 'desc', desc: 'asc', asc: 'none' };
const ARIA_SORT = { desc: 'descending', asc: 'ascending' };

function SortIcon({ dir }) {
  return (
    <svg viewBox="0 0 12 16" aria-hidden="true" className={`pn__sortIcon is-${dir}`}>
      <path className="up" d="M6 1 L10.5 6.5 H1.5 Z" />
      <path className="down" d="M6 15 L1.5 9.5 H10.5 Z" />
    </svg>
  );
}

export default function Panel() {
  const clientes = getClientes();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('todos');
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({ by: null, dir: 'none' });

  const toggleSort = (by) => {
    setSort((current) => {
      const dir = NEXT_DIR[current.by === by ? current.dir : 'none'];
      return { by: dir === 'none' ? null : by, dir };
    });
    setPage(0);
  };

  const conteo = useMemo(() => {
    const base = { 'alto-valor': [], normal: [], riesgo: [] };
    clientes.forEach((cliente) => base[cliente.stats.tipo].push(cliente));
    return base;
  }, [clientes]);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clientes.filter((cliente) => {
      if (filter !== 'todos' && cliente.stats.tipo !== filter) return false;
      if (!q) return true;
      return [cliente.nombreCompleto, cliente.correo, ...cliente.etiquetas].some((text) =>
        text.toLowerCase().includes(q)
      );
    });
  }, [clientes, query, filter]);

  const ordenados = useMemo(() => {
    if (!sort.by) return filtrados;
    const factor = sort.dir === 'asc' ? 1 : -1;
    return [...filtrados].sort((a, b) => (a.stats[sort.by] - b.stats[sort.by]) * factor);
  }, [filtrados, sort]);

  const pages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const visibles = ordenados.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  return (
    <main className="pn">
      <div className="pn__rule" aria-hidden="true" />

      <section className="shell pn__head">
        <Reveal variant="slide-left" className="pn__headLeft">
          <span className="eyebrow pn__eyebrow">Panel interno</span>
          <h1 className="display pn__title">Segmentación de clientes</h1>
          <p className="body-text pn__intro">
            Vista de administración de Precious Things. Revisa la actividad de los últimos 90 días y
            entra a la vista general de cada cliente para ver su historial completo.
          </p>
        </Reveal>

        <Reveal variant="slide-right" delay={120} className="pn__status">
          <span className="pn__statusDot" aria-hidden="true" />
          <span className="pn__statusText">
            <strong>Mostrando datos de ejemplo</strong>
            <em>Se reemplazarán por los registros reales al conectar la base</em>
          </span>
        </Reveal>
      </section>

      <section className="shell pn__kpis" aria-label="Indicadores por tipo de cliente">
        {KPIS.map((kpi, i) => {
          const grupo = conteo[kpi.id];
          const share = Math.round((grupo.length / clientes.length) * 100);
          const gasto = grupo.reduce((sum, cliente) => sum + cliente.stats.gasto90, 0);
          return (
            <Reveal key={kpi.id} variant="unfold" delay={i * 120} className={`kpi kpi--${kpi.tone}`}>
              <div className="kpi__top">
                <span className="kpi__icon">{kpi.icon}</span>
                <span className="kpi__chip">{share}% del total</span>
              </div>

              <h2 className="kpi__label">{kpi.label}</h2>
              <p className="kpi__hint">{kpi.hint}</p>

              <div className="kpi__value">
                <strong className="kpi__number">{grupo.length}</strong>
                <span className="kpi__unit">clientes</span>
              </div>

              <div className="kpi__foot">
                <span>Gasto 90 días: {money(gasto)}</span>
                <span className="kpi__bar"><i style={{ width: `${share}%` }} /></span>
              </div>
            </Reveal>
          );
        })}
      </section>

      <section className="shell pn__tableWrap" aria-label="Listado de clientes">
        <Reveal variant="zoom" className="pn__panel">
          <header className="pn__toolbar">
            <div>
              <h2 className="pn__tableTitle">Listado de clientes</h2>
              <p className="pn__tableNote">{filtrados.length} de {clientes.length} clientes</p>
            </div>
            <div className="pn__tools">
              <span className="pn__search">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M16 16 L21 21" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                <input
                  type="search"
                  placeholder="Buscar cliente o etiqueta"
                  aria-label="Buscar cliente o etiqueta"
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); setPage(0); }}
                />
              </span>
              <span className="pn__chips">
                {FILTERS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`pn__chip ${filter === item.id ? 'is-on' : ''}`}
                    onClick={() => { setFilter(item.id); setPage(0); }}
                  >
                    {item.label}
                  </button>
                ))}
              </span>
            </div>
          </header>

          <div className="pn__table" role="table">
            <div className="pn__thead" role="row" style={{ gridTemplateColumns: GRID }}>
              {COLUMNS.map((column) => {
                if (!column.sortBy) {
                  return (
                    <span key={column.key} role="columnheader" className="pn__th">
                      {column.label}
                    </span>
                  );
                }
                const dir = sort.by === column.sortBy ? sort.dir : 'none';
                return (
                  <span key={column.key} role="columnheader" className="pn__th" aria-sort={ARIA_SORT[dir] ?? 'none'}>
                    <button
                      type="button"
                      className={`pn__sort ${dir !== 'none' ? 'is-active' : ''}`}
                      onClick={() => toggleSort(column.sortBy)}
                      title="Ordenar"
                    >
                      {column.label}
                      <SortIcon dir={dir} />
                    </button>
                  </span>
                );
              })}
            </div>

            <div className="pn__tbody">
              {visibles.map((cliente, row) => {
                const tipo = TIPOS[cliente.stats.tipo];
                const extra = cliente.etiquetas.length - MAX_TAGS;
                return (
                  <div
                    key={cliente.id}
                    role="row"
                    className="pn__tr"
                    style={{ gridTemplateColumns: GRID, animationDelay: `${row * 65}ms` }}
                  >
                    <span role="cell" className="pn__td pn__td--who">
                      <Avatar nombre={cliente.nombre} apellido={cliente.apellido} />
                      <span className="pn__who">
                        <strong>{cliente.nombreCompleto}</strong>
                        <em>{cliente.correo}</em>
                      </span>
                    </span>
                    <span role="cell" className="pn__td pn__num">{cliente.stats.pedidos90}</span>
                    <span role="cell" className="pn__td pn__num">{money(cliente.stats.gasto90)}</span>
                    <span role="cell" className="pn__td">
                      <span className={`pn__type pn__type--${tipo.tone}`}>{tipo.label}</span>
                    </span>
                    <span role="cell" className="pn__td pn__tags">
                      {cliente.etiquetas.slice(0, MAX_TAGS).map((tag) => (
                        <TagDetail key={tag} tags={[tag]} />
                      ))}
                      {extra > 0 && (
                        <TagDetail
                          tags={cliente.etiquetas.slice(MAX_TAGS)}
                          label={`+${extra}`}
                          className="pn__tag--more"
                        />
                      )}
                    </span>
                    <span role="cell" className="pn__td">
                      <Link to={`/panel/clientes/${cliente.id}`} className="pn__view">
                        Ver
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                      </Link>
                    </span>
                  </div>
                );
              })}
              {visibles.length === 0 && (
                <p className="pn__none">No hay clientes que coincidan con la búsqueda.</p>
              )}
            </div>
          </div>

          <footer className="pn__foot">
            <span className="pn__empty">
              <i aria-hidden="true" />
              Actividad calculada sobre los últimos 90 días
            </span>
            <div className="pn__pager">
              <button
                type="button"
                className="pn__page"
                disabled={current === 0}
                onClick={() => setPage(current - 1)}
                aria-label="Página anterior"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              </button>
              <span className="pn__pageInfo">Página {current + 1} de {pages}</span>
              <button
                type="button"
                className="pn__page"
                disabled={current >= pages - 1}
                onClick={() => setPage(current + 1)}
                aria-label="Página siguiente"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              </button>
            </div>
          </footer>
        </Reveal>
      </section>
    </main>
  );
}
