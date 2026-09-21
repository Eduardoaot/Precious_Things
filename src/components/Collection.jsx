import anillos from '../assets/payday/anillos.jpg';
import cadenas from '../assets/payday/cadenas.jpg';
import pulseras from '../assets/payday/pulseras.jpg';
import collarVioleta from '../assets/payday/collar-violeta.jpg';
import collarAmbar from '../assets/payday/collar-ambar.jpg';
import collarCascada from '../assets/payday/collar-cascada.jpg';
import Reveal from './Reveal';
import Stars from './Stars';
import './Collection.css';

const PIECES = [
  { name: 'Anillos Aurora', family: 'Oro amarillo 18k y perla', price: '8,900', rating: 5, image: anillos, tone: 'gold' },
  { name: 'Collar Lirio', family: 'Oro rosa y amatista', price: '14,400', rating: 5, image: collarVioleta, tone: 'lilac' },
  { name: 'Cadena Veneciana', family: 'Oro amarillo 14k', price: '7,600', rating: 4, image: cadenas, tone: 'peach' },
  { name: 'Pulsera Mar', family: 'Plata oxidada', price: '11,250', rating: 5, image: pulseras, tone: 'sky' },
  { name: 'Collar Cascada', family: 'Platino y diamante', price: '32,700', rating: 5, image: collarCascada, tone: 'mint' },
  { name: 'Collar Ámbar', family: 'Oro amarillo y granate', price: '9,850', rating: 4, image: collarAmbar, tone: 'rose' },
];

export default function Collection() {
  return (
    <section className="col" id="coleccion">
      <div className="shell">
        <div className="col__head">
          <Reveal variant="slide-left">
            <span className="eyebrow col__eyebrow">Colección Otoño</span>
            <h2 className="display col__title">Piezas que ya son de alguien</h2>
          </Reveal>
          <Reveal variant="slide-right" delay={120} className="col__note">
            <p className="body-text">
              Seis creaciones del taller, disponibles en las cinco casas y en línea con entrega asegurada.
            </p>
            <button type="button" className="col__all">Ver catálogo completo</button>
          </Reveal>
        </div>

        <div className="col__grid">
          {PIECES.map((piece, i) => (
            <Reveal
              key={piece.name}
              variant="zoom"
              delay={(i % 3) * 110}
              className={`col__card col__card--${piece.tone}`}
            >
              <div className="col__art">
                <img src={piece.image} alt={piece.name} className="col__jewel" loading="lazy" />
                <span className="col__badge">Disponible</span>
              </div>
              <div className="col__info">
                <div className="col__row">
                  <h3 className="col__name">{piece.name}</h3>
                  <span className="col__price">${piece.price}</span>
                </div>
                <p className="col__family">{piece.family}</p>
                <div className="col__row col__row--foot">
                  <Stars value={piece.rating} size={15} />
                  <button type="button" className="col__link">
                    Ver detalle
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
