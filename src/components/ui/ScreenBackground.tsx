import './ScreenBackground.css';

/**
 * Fundo institucional compartilhado por todas as telas públicas: gradiente
 * de profundidade + linhas de energia em movimento sutil. É decorativo
 * (aria-hidden) e nunca compete com o conteúdo em primeiro plano.
 */
export function ScreenBackground() {
  return (
    <div className="screen-bg" aria-hidden="true">
      <div className="screen-bg__glow screen-bg__glow--orange" />
      <div className="screen-bg__glow screen-bg__glow--blue" />
      <svg className="screen-bg__lines" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path className="screen-bg__line" d="M-50 620 C 250 500, 450 700, 750 560 S 1150 420, 1300 500" />
        <path className="screen-bg__line screen-bg__line--delay" d="M-50 260 C 300 180, 500 340, 800 220 S 1150 120, 1300 200" />
      </svg>
    </div>
  );
}
