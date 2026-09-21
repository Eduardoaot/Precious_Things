import './Stars.css';

const STAR = 'M12 2.4 L14.9 8.7 L21.6 9.6 L16.8 14.4 L18 21.2 L12 18 L6 21.2 L7.2 14.4 L2.4 9.6 L9.1 8.7 Z';

export default function Stars({ value = 5, total = 5, size = 17, label }) {
  return (
    <span className="stars" role="img" aria-label={label || `${value} de ${total} estrellas`}>
      {Array.from({ length: total }, (_, i) => (
        <svg
          key={i}
          className={`stars__item ${i < value ? 'is-full' : ''}`}
          style={{ width: size, height: size, animationDelay: `${i * 90}ms` }}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );
}
