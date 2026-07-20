import { CountdownRing } from '@/components/ui/CountdownRing';
import './ActivityTimer.css';

interface ActivityTimerProps {
  secondsLeft: number;
  totalSeconds: number;
}

/**
 * Anel grande e chamativo no canto superior direito da atividade — cor e
 * animação mudam conforme o tempo acaba (azul → laranja → vermelho
 * pulsando), pra ficar claro sem precisar ler o número.
 */
export function ActivityTimer({ secondsLeft, totalSeconds }: ActivityTimerProps) {
  const ratio = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const urgency = ratio <= 0.15 ? 'critical' : ratio <= 0.4 ? 'warning' : 'normal';
  const color = urgency === 'critical' ? 'var(--color-critical)' : urgency === 'warning' ? 'var(--color-orange)' : 'var(--color-blue)';

  return (
    <div className={`activity-timer activity-timer--${urgency}`} aria-hidden="true">
      <CountdownRing secondsLeft={secondsLeft} totalSeconds={totalSeconds} size={72} color={color} />
    </div>
  );
}
