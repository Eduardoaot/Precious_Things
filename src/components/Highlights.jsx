import Reveal from './Reveal';
import Stars from './Stars';
import fachada from '../assets/payday/fachada.jpg';
import './Highlights.css';

const ASPECTS = [
  {
    tone: 'rose',
    title: 'Taller propio',
    text: 'Cada pieza nace en nuestro taller, con maestros orfebres que trabajan a mano el metal y el engaste.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 18 L12 4 L20 18 Z M4 18 L20 18" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
  },
  {
    tone: 'mint',
    title: 'Piedras certificadas',
    text: 'Trabajamos con gemas de origen trazable. Cada compra viaja con su certificado de autenticidad.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M5 9 L12 3 L19 9 L12 21 Z M5 9 L19 9" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
  },
  {
    tone: 'lilac',
    title: 'Atención privada',
    text: 'Una asesora acompaña la elección completa, desde la primera cita hasta la entrega en casa.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 Z M4 21c0-4 3.6-6 8-6s8 2 8 6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
  },
  {
    tone: 'sky',
    title: 'Garantía de por vida',
    text: 'Pulido, ajuste de talla y revisión de engaste para siempre, en cualquiera de nuestras cinco casas.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 3 L20 6 v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6 Z M8.5 12.2 L11 14.8 L15.8 9.8" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
  },
];

const FIGURES = [
  { value: '1962', label: 'Año de fundación' },
  { value: '62k', label: 'Piezas entregadas' },
  { value: '5', label: 'Casas en el país' },
  { value: '4.9', label: 'Valoración media' },
];

export default function Highlights() {
  return (
    <section className="hl" id="casa">
      <div className="shell">
        <div className="hl__head">
          <Reveal variant="slide-left" className="hl__headLeft">
            <span className="eyebrow hl__eyebrow">Lo que nos distingue</span>
            <h2 className="display hl__title">
              La mejor joyería
              <span className="hl__titleAccent"> del país</span>
            </h2>
          </Reveal>

          <Reveal variant="slide-right" delay={120} className="hl__headRight">
            <p className="body-text">
              Seis décadas de oficio nos colocan al frente de la joyería nacional. Nuestras piezas se
              diseñan, se funden y se pulen bajo el mismo techo, con el cuidado de quien entrega algo
              destinado a durar generaciones.
            </p>
            <div className="hl__score">
              <Stars value={5} size={20} />
              <span>4.9 sobre 5 en 12,480 valoraciones</span>
            </div>
          </Reveal>
        </div>

        <Reveal variant="zoom" as="figure" className="hl__store">
          <img src={fachada} alt="Fachada de la boutique Precious Things" loading="lazy" />
          <figcaption>Nuestra casa matriz, abierta desde 1962</figcaption>
        </Reveal>

        <div className="hl__grid">
          {ASPECTS.map((aspect, i) => (
            <Reveal
              key={aspect.title}
              variant="unfold"
              delay={i * 110}
              className={`hl__card hl__card--${aspect.tone}`}
            >
              <span className="hl__icon">{aspect.icon}</span>
              <h3 className="hl__cardTitle">{aspect.title}</h3>
              <p className="hl__cardText">{aspect.text}</p>
              <span className="hl__index">{String(i + 1).padStart(2, '0')}</span>
            </Reveal>
          ))}
        </div>

        <div className="hl__figures">
          {FIGURES.map((figure, i) => (
            <Reveal key={figure.label} variant="zoom" delay={i * 90} className="hl__figure">
              <strong>{figure.value}</strong>
              <Reveal variant="grow" delay={i * 90 + 160} className="hl__figureRule" />
              <span>{figure.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
