interface CountdownRingProps {
  secondsLeft: number;
  totalSeconds: number;
  size?: number;
  color?: string;
}

/**
 * Anel de contagem regressiva. Usado na expiração do código de brinde e,
 * por pedido explícito do usuário, também dentro da atividade (limite de
 * tempo por sessão, `ActivityRunnerScreen`) — uma exceção deliberada ao
 * princípio de "sem pressão de tempo durante o aprendizado", motivada por
 * gestão de fila do evento, não por querer apressar o visitante. Ver nota
 * em docs/03-fluxo-e-telas.md.
 */
export function CountdownRing({ secondsLeft, totalSeconds, size = 96, color = 'var(--color-orange)' }: CountdownRingProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? Math.max(0, Math.min(1, secondsLeft / totalSeconds)) : 0;
  const offset = circumference * (1 - progress);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = secondsLeft >= 60 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${secondsLeft}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${secondsLeft} segundos restantes`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={8}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={label.length > 2 ? size * 0.2 : size * 0.28} fontWeight={700} fill="currentColor">
        {label}
      </text>
    </svg>
  );
}
