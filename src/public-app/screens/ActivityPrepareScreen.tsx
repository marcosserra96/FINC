import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScreenShell } from '../components/ScreenShell';
import { RestartCorner } from '../components/RestartCorner';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './ActivityPrepareScreen.css';

const COUNT_STEPS = ['3', '2', '1', 'Vamos!'] as const;
const STEP_MS = 650;

/**
 * Contagem regressiva de orientação entre escolher a atividade e ela
 * começar de fato — avança sozinha, sem exigir toque. Tocar em qualquer
 * lugar da tela adianta pra quem já sabe o que vai fazer.
 */
export function ActivityPrepareScreen() {
  const { state, beginActivity } = useApp();
  const activity = state.activities.find((a) => a.id === state.session.activityId);
  const reducedMotion = state.config.reducedMotion;
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      const id = window.setTimeout(beginActivity, 300);
      return () => window.clearTimeout(id);
    }
    const isLast = stepIndex === COUNT_STEPS.length - 1;
    const id = window.setTimeout(
      () => (isLast ? beginActivity() : setStepIndex((i) => i + 1)),
      isLast ? STEP_MS * 0.85 : STEP_MS
    );
    return () => window.clearTimeout(id);
  }, [stepIndex, reducedMotion, beginActivity]);

  if (!activity) return null;

  const current = COUNT_STEPS[stepIndex];
  const isGo = current === 'Vamos!';

  return (
    <ScreenShell>
      <RestartCorner />
      <div className="activity-prepare" onClick={beginActivity} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') beginActivity(); }}>
        <div className="activity-prepare__header anim-fade-in">
          <span className="activity-prepare__header-icon" style={{ background: activity.themeColor }}>
            <Icon name={activity.icon as IconName} size={18} />
          </span>
          <div>
            <strong>{activity.name}</strong>
            <span>{activity.instructions}</span>
          </div>
        </div>

        {reducedMotion ? (
          <p className="activity-prepare__reduced-hint">Preparando...</p>
        ) : (
          <div className="activity-prepare__stage">
            <span className="activity-prepare__glow" style={{ background: activity.themeColor }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={stepIndex}
                className={`activity-prepare__count${isGo ? ' activity-prepare__count--go' : ''}`}
                initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.35, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </div>
        )}

        <span className="activity-prepare__hint">Toque para pular</span>
      </div>
    </ScreenShell>
  );
}
