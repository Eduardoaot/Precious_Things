import useReveal from '../hooks/useReveal';

export default function Reveal({
  as: Tag = 'div',
  variant = 'zoom',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useReveal();
  const base = `reveal-${variant}`;

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? 'is-in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
