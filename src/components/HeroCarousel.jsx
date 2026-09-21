import { useCallback, useEffect, useRef, useState } from 'react';
import elDiamante from '../assets/payday/el-diamante.jpg';
import collarMitchell from '../assets/payday/collar-mitchell.jpg';
import relojes from '../assets/payday/relojes.jpg';
import cofrePerlas from '../assets/payday/cofre-perlas.jpg';
import Stars from './Stars';
import './HeroCarousel.css';

const SLIDES = [
  {
    id: 'diamante',
    tag: 'Pieza única',
    discount: '25%',
    title: 'El Diamante',
    line: 'Diamante talla marquesa en montura de dragones de bronce.',
    price: '89,900',
    before: '119,900',
    image: elDiamante,
    rating: 5,
    tones: ['#d6e7f5', '#e4d9f3', '#cfe7dc'],
  },
  {
    id: 'mitchell',
    tag: 'Oferta de temporada',
    discount: '30%',
    title: 'Collar Mitchell',
    line: 'Eslabón de oro con ónix cuadrado, en estuche de la casa.',
    price: '18,900',
    before: '26,900',
    image: collarMitchell,
    rating: 5,
    tones: ['#f7d8dc', '#fbe1cf', '#f4e4bd'],
  },
  {
    id: 'relojes',
    tag: 'Nueva llegada',
    discount: '15%',
    title: 'Reloj Imperial',
    line: 'Caja de oro blanco con brazalete de eslabones pulidos.',
    price: '11,250',
    before: '13,250',
    image: relojes,
    rating: 4,
    tones: ['#f4e4bd', '#fbe1cf', '#d6e7f5'],
  },
  {
    id: 'perlas',
    tag: 'Edición limitada',
    discount: '20%',
    title: 'Cofre de Perlas',
    line: 'Sarta de perlas con cuentas de oro y joyero tallado.',
    price: '14,400',
    before: '18,000',
    image: cofrePerlas,
    rating: 5,
    tones: ['#cfe7dc', '#d6e7f5', '#e4d9f3'],
  },
];

const INTERVAL = 6200;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = useCallback((next) => {
    setIndex((current) => (next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    timer.current = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(timer.current);
  }, [index, paused, go]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') go(index + 1);
      if (event.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  const active = SLIDES[index];

  return (
    <section
      className="hero"
      aria-roledescription="carrusel"
      aria-label="Ofertas destacadas"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        '--tone-1': active.tones[0],
        '--tone-2': active.tones[1],
        '--tone-3': active.tones[2],
      }}
    >
      <div className="hero__wash" aria-hidden="true" />

      <div className="hero__track" style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
        {SLIDES.map((slide, i) => (
          <article
            key={slide.id}
            className={`hero__slide ${i === index ? 'is-active' : ''}`}
            aria-hidden={i !== index}
            style={{ '--s1': slide.tones[0], '--s2': slide.tones[1], '--s3': slide.tones[2] }}
          >
            <div className="hero__copy">
              <span className="hero__tag eyebrow">{slide.tag}</span>
              <h2 className="hero__title display">{slide.title}</h2>
              <p className="hero__line body-text">{slide.line}</p>

              <div className="hero__rating">
                <Stars value={slide.rating} />
                <span className="hero__ratingText">Valoración de la comunidad</span>
              </div>

              <div className="hero__prices">
                <span className="hero__price">${slide.price}</span>
                <span className="hero__before">${slide.before}</span>
                <span className="hero__off">{slide.discount} menos</span>
              </div>

              <div className="hero__buttons">
                <button type="button" className="hero__buy">Ver la pieza</button>
                <button type="button" className="hero__alt">Agendar cita privada</button>
              </div>
            </div>

            <div className="hero__art">
              <span className="hero__halo" aria-hidden="true" />
              <span className="hero__ringline" aria-hidden="true" />
              <img src={slide.image} alt={slide.title} className="hero__jewel" />
              <span className="hero__discount">
                <strong>{slide.discount}</strong>
                <em>de descuento</em>
              </span>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="hero__arrow hero__arrow--prev"
        onClick={() => go(index - 1)}
        aria-label="Oferta anterior"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button>
      <button
        type="button"
        className="hero__arrow hero__arrow--next"
        onClick={() => go(index + 1)}
        aria-label="Oferta siguiente"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button>

      <div className="hero__dock">
        <span className="hero__counter">
          <strong>{String(index + 1).padStart(2, '0')}</strong>
          <span aria-hidden="true">/</span>
          {String(SLIDES.length).padStart(2, '0')}
        </span>
        <ul className="hero__dots">
          {SLIDES.map((slide, i) => (
            <li key={slide.id}>
              <button
                type="button"
                className={`hero__dot ${i === index ? 'is-on' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ir a ${slide.title}`}
                aria-current={i === index}
              >
                <span className="hero__dotLabel">{slide.title}</span>
                <span className="hero__dotBar"><i style={{ animationDuration: `${INTERVAL}ms` }} /></span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <a className="hero__scroll" href="#cinta">
        <span>Descubrir la casa</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 L12 20 M5 13 L12 20 L19 13" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </a>
    </section>
  );
}
