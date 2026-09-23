import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './TagDetail.css';

const WIDTH = 280;
const GAP = 8;

/*
 * Etiqueta que abre su detalle al hacer clic.
 * El detalle se monta en <body> porque las filas de la tabla recortan su contenido.
 * Con `tags` muestra varias etiquetas en el mismo detalle (el chip "+N").
 */
export default function TagDetail({ tags, label, className = '', conteos }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const trigger = useRef(null);
  const panel = useRef(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!open) return;
    const rect = trigger.current.getBoundingClientRect();
    const height = panel.current?.offsetHeight ?? 0;
    const left = Math.min(Math.max(12, rect.left), window.innerWidth - WIDTH - 12);
    const below = rect.bottom + GAP + height <= window.innerHeight;
    setPos({ left, top: below ? rect.bottom + GAP : rect.top - GAP - height });
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const close = () => setOpen(false);
    const onPointer = (event) => {
      if (!trigger.current?.contains(event.target) && !panel.current?.contains(event.target)) close();
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        close();
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  const detalles = tags.map((tag) => ({ nombre: tag, clientes: conteos?.[tag] }));

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`pn__tag tag-trigger ${open ? 'is-open' : ''} ${className}`.trim()}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {label ?? tags[0]}
      </button>

      {open &&
        createPortal(
          <div
            ref={panel}
            id={id}
            role="dialog"
            aria-label={detalles.length === 1 ? `Motivo: ${detalles[0].nombre}` : 'Más motivos'}
            className="tag-pop"
            style={{ width: WIDTH, left: pos?.left ?? -9999, top: pos?.top ?? -9999 }}
          >
            {detalles.map((tag) => (
              <div key={tag.nombre} className="tag-pop__item">
                <strong className="tag-pop__name">{tag.nombre}</strong>
                {tag.clientes !== undefined && (
                  <span className="tag-pop__count">
                    {tag.clientes} {tag.clientes === 1 ? 'cliente cumple' : 'clientes cumplen'} este motivo
                  </span>
                )}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
