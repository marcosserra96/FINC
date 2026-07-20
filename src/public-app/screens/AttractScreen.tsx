import { motion } from 'framer-motion';
import { ScreenShell } from '../components/ScreenShell';
import { AdminAccessTrigger } from '../components/AdminAccessTrigger';
import { Icon } from '@/components/ui/Icon';
import { AttractTicker } from '../components/AttractTicker';
import { useApp } from '@/store/AppContext';
import { useFullscreen } from '@/hooks/useFullscreen';
import './AttractScreen.css';

export function AttractScreen() {
  const { state, goToAgeSelect } = useApp();
  const { texts } = state.config;
  const titleLines = texts.attractTitle.split('\n');
  const { isFullscreen, requestFullscreen } = useFullscreen();

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
      <div className="attract" onClick={goToAgeSelect} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToAgeSelect(); }}>
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
