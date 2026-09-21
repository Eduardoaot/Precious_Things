import './Ribbon.css';

const WORDS = [
  'La mejor joyería del país',
  'Taller propio desde 1962',
  'Piedras certificadas',
  'Garantía de por vida',
  'Diseño hecho a mano',
];

export default function Ribbon({ tone = 'brown', id }) {
  const items = [...WORDS, ...WORDS];
  return (
    <div className={`ribbon ribbon--${tone}`} id={id}>
      <div className="ribbon__track">
        {items.map((word, i) => (
          <span className="ribbon__item" key={`${word}-${i}`}>
            {word}
            <i className="ribbon__gem" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 9 L12 3 L19 9 L12 21 Z" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
            </i>
          </span>
        ))}
      </div>
    </div>
  );
}
