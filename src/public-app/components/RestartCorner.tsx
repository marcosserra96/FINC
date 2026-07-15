import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './RestartCorner.css';

/** Saída discreta e sempre disponível — ninguém deve ficar "preso" numa tela. */
export function RestartCorner() {
  const { resetToAttract } = useApp();
  return (
    <button type="button" className="restart-corner" onClick={resetToAttract} aria-label="Recomeçar do início">
      <Icon name="refresh" size={20} />
      <span>Recomeçar</span>
    </button>
  );
}
