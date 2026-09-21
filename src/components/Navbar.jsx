import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const SECTIONS = [
  { label: 'Colección', to: '/#coleccion' },
  { label: 'La casa', to: '/#casa' },
  { label: 'Opiniones', to: '/#opiniones' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const onPanel = pathname.startsWith('/panel');

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          <span className="nav__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" focusable="false">
              <path d="M8 15 L20 5 L32 15 L20 35 Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
              <path d="M8 15 L32 15 M20 5 L14 15 L20 35 L26 15 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          <span className="nav__name">
            <strong>Precious Things</strong>
            <em>Joyería fina</em>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Secciones">
          {SECTIONS.map((item) => (
            <a key={item.label} href={item.to} className="nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="nav__badge">
            <i className="nav__dot" aria-hidden="true" />
            Modo administrador
          </span>
          <NavLink
            to={onPanel ? '/' : '/panel'}
            className={`nav__cta ${onPanel ? 'nav__cta--ghost' : ''}`}
          >
            {onPanel ? 'Volver a la tienda' : 'Panel de clientes'}
          </NavLink>
        </div>
      </div>
      <div className="nav__rule" aria-hidden="true" />
    </header>
  );
}
