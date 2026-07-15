import './Celebration.css';

const PIECES = Array.from({ length: 18 }, (_, i) => i);
const COLORS = ['var(--color-orange)', 'var(--color-blue)', 'var(--color-blue-light)', '#ffd166'];

/** Confete leve em CSS puro — celebra a conclusão sem pesar no desempenho. */
export function Celebration() {
  return (
    <div className="celebration" aria-hidden="true">
      {PIECES.map((i) => (
        <span
          key={i}
          className="celebration__piece"
          style={{
            left: `${(i * 97) % 100}%`,
            animationDelay: `${(i % 6) * 0.12}s`,
            background: COLORS[i % COLORS.length]
          }}
        />
      ))}
    </div>
  );
}
