import './Avatar.css';

// Mismo nombre, mismo color: el tono sale de un hash del nombre completo.
function hue(text) {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) % 360;
  return h;
}

function initials(nombre, apellido) {
  return `${nombre.trim().charAt(0)}${apellido.trim().charAt(0)}`.toUpperCase();
}

export default function Avatar({ nombre, apellido, size = 38 }) {
  const h = hue(`${nombre} ${apellido}`);
  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `hsl(${h} 62% 82%)`,
        color: `hsl(${h} 45% 26%)`,
      }}
    >
      {initials(nombre, apellido)}
    </span>
  );
}
