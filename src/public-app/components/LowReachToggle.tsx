import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './LowReachToggle.css';

/**
 * Discreto de propósito: sem rótulo de texto, opacidade baixa em repouso.
 * É um ajuste do totem (a montagem não muda de altura durante o evento),
 * não um brinquedo — não deve convidar toque repetido.
 */
export function LowReachToggle() {
  const { state, toggleLowReachMode } = useApp();
  return (
    <button
      type="button"
      className={`low-reach-toggle${state.lowReachMode ? ' low-reach-toggle--active' : ''}`}
      onClick={toggleLowReachMode}
      aria-pressed={state.lowReachMode}
      aria-label={state.lowReachMode ? 'Desativar modo altura baixa' : 'Ativar modo altura baixa'}
    >
      <Icon name="lowReach" size={18} strokeWidth={1.8} />
    </button>
  );
}
