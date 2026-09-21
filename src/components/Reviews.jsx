import Reveal from './Reveal';
import Stars from './Stars';
import './Reviews.css';

const OPINIONS = [
  {
    name: 'Valeria M.',
    city: 'Monterrey',
    rating: 5,
    tone: 'rose',
    text: 'El anillo llegó impecable y la asesoría fue clarísima desde la primera cita. Se nota el trabajo de taller en cada detalle del engaste.',
  },
  {
    name: 'Andrés R.',
    city: 'Guadalajara',
    rating: 5,
    tone: 'mint',
    text: 'Pedí un collar para un aniversario y ajustaron la cadena el mismo día. La atención hace que la compra se sienta como un regalo doble.',
  },
  {
    name: 'Paulina C.',
    city: 'Ciudad de México',
    rating: 4,
    tone: 'lilac',
    text: 'Los aretes son ligeros y el esmalte conserva el color después de meses de uso diario. Volveré por la pulsera de la misma línea.',
  },
];

export default function Reviews() {
  return (
    <section className="rev" id="opiniones">
      <div className="shell">
        <div className="rev__head">
          <Reveal variant="zoom">
            <span className="eyebrow rev__eyebrow">Voces de la casa</span>
            <h2 className="display rev__title">Quienes ya llevan una pieza</h2>
          </Reveal>
          <Reveal variant="slide-right" delay={120} className="rev__avg">
            <strong>4.9</strong>
            <span>
              <Stars value={5} size={18} />
              <em>12,480 valoraciones verificadas</em>
            </span>
          </Reveal>
        </div>

        <div className="rev__grid">
          {OPINIONS.map((opinion, i) => (
            <Reveal
              key={opinion.name}
              variant={i === 0 ? 'slide-left' : i === 2 ? 'slide-right' : 'zoom'}
              delay={i * 120}
              className={`rev__card rev__card--${opinion.tone}`}
            >
              <span className="rev__quote" aria-hidden="true">&#8220;</span>
              <Stars value={opinion.rating} size={16} />
              <p className="rev__text">{opinion.text}</p>
              <div className="rev__who">
                <span className="rev__avatar" aria-hidden="true">{opinion.name.charAt(0)}</span>
                <span>
                  <strong>{opinion.name}</strong>
                  <em>{opinion.city}</em>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
