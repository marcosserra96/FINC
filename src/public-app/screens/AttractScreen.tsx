import { motion } from 'framer-motion';
import { ScreenShell } from '../components/ScreenShell';
import { AdminAccessTrigger } from '../components/AdminAccessTrigger';
import { Icon } from '@/components/ui/Icon';
import { AttractTicker } from '../components/AttractTicker';
import { useApp } from '@/store/AppContext';
import { useFullscreen } from '@/hooks/useFullscreen';
import './AttractScreen.css';

export function AttractScreen() {
  const { state, goToActivitySelect, pickRandomActivity, selectActivity } = useApp();
  const { texts } = state.config;
  const titleLines = texts.attractTitle.split('\n');
  const { isFullscreen, requestFullscreen } = useFullscreen();

  // Um só toque já leva direto pro jogo: sorteia, pega a ordem fixa, ou
  // mostra a seleção — sem tela de boas-vindas intermediária.
  const handleStart = () => {
    const mode = state.config.activitySelectionMode;
    if (mode === 'random') {
      pickRandomActivity();
      return;
    }
    if (mode === 'fixedOrder') {
      const active = state.activities.filter((a) => a.active).sort((a, b) => a.order - b.order);
      if (active[0]) selectActivity(active[0].id);
      return;
    }
    goToActivitySelect();
  };

  return (
    <ScreenShell padded={false} creditSize="lg">
      <AdminAccessTrigger />
      {!isFullscreen && (
        <button
          type="button"
          className="attract__fullscreen"
          onClick={(e) => { e.stopPropagation(); requestFullscreen(); }}
          aria-label="Entrar em modo tela cheia"
        >
          <Icon name="expand" size={20} />
        </button>
      )}
      <div className="attract" onClick={handleStart} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleStart(); }}>
        <div className="anim-fade-in">
          <AttractTicker />
        </div>

        <h1 className="attract__title anim-slide-up">
          {titleLines.map((line, i) => (
            <span key={i} className="attract__title-line">{line}</span>
          ))}
        </h1>

        <motion.div
          className="attract__cta"
          animate={state.config.reducedMotion ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="attract__cta-pulse" />
          <Icon name="bolt" size={22} />
          <span>{texts.attractSubtitle}</span>
        </motion.div>
      </div>
    </ScreenShell>
  );
}
