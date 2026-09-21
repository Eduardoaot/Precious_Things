import Reveal from './Reveal';
import './Footer.css';

const COLUMNS = [
  { title: 'Colecciones', items: ['Anillos', 'Collares', 'Aretes', 'Pulseras', 'Alta joyería'] },
  { title: 'La casa', items: ['Nuestro taller', 'Certificaciones', 'Cuidado de piezas', 'Citas privadas'] },
  { title: 'Boutiques', items: ['Ciudad de México', 'Monterrey', 'Guadalajara', 'Mérida', 'Querétaro'] },
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft__rule" aria-hidden="true" />
      <div className="shell ft__inner">
        <Reveal variant="slide-left" className="ft__brand">
          <span className="ft__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40"><path d="M8 15 L20 5 L32 15 L20 35 Z M8 15 L32 15 M20 5 L14 15 L20 35 L26 15 Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </span>
          <h3 className="ft__name">Precious Things</h3>
          <p className="ft__claim">
            Joyería fina desde 1962. Cada pieza sale del taller con nombre, certificado y garantía
            de por vida.
          </p>
        </Reveal>

        <div className="ft__cols">
          {COLUMNS.map((column, i) => (
            <Reveal key={column.title} variant="zoom" delay={i * 100} className="ft__col">
              <h4>{column.title}</h4>
              <ul>
                {column.items.map((item) => (
                  <li key={item}><a href="#coleccion">{item}</a></li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell ft__base">
        <span>© {new Date().getFullYear()} Precious Things. Todos los derechos reservados.</span>
        <span className="ft__baseLinks">
          <a href="#casa">Aviso de privacidad</a>
          <a href="#casa">Términos de venta</a>
        </span>
      </div>
    </footer>
  );
}
