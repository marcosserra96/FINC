import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './ThemeToggle.css';

/**
 * Alternância clara/escura discreta, fixa no topo-centro de toda tela
 * pública (fora do caminho do "Recomeçar" no canto e da área secreta do
 * admin) — pensada pra quando a arte do estande for clara e o time quiser
 * o totem combinando com a decoração do evento.
 */
export function ThemeToggle() {
  const { state, toggleTheme } = useApp();
  const isDark = state.theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={!isDark}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <Icon name={isDark ? 'moon' : 'sun'} size={18} strokeWidth={1.8} />
    </button>
  );
}
