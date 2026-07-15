import './ProgressBar.css';

interface ProgressBarProps {
  value: number;
  total: number;
  color?: string;
  label?: string;
}

export function ProgressBar({ value, total, color, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${pct}%`, background: color ?? 'var(--color-orange)' }}
        />
      </div>
      {label && <span className="progress-bar__label">{label}</span>}
    </div>
  );
}
