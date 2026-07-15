import { useEffect, useRef } from 'react';
import { useApp } from '@/store/AppContext';
import { logEvent } from '@/services/metricsService';

/**
 * Observa inatividade e devolve o totem para a tela de atração
 * automaticamente. Também escuta toques globais para marcar interação,
 * sem depender de cada tela individualmente instrumentar isso.
 */
export function useIdleTimer(): void {
  const { state, touch, resetToAttract } = useApp();
  const lastScreenRef = useRef(state.session.screen);
  lastScreenRef.current = state.session.screen;

  useEffect(() => {
    const handleActivity = () => touch();
    window.addEventListener('pointerdown', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity);
    return () => {
      window.removeEventListener('pointerdown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [touch]);

  useEffect(() => {
    if (!state.configLoaded) return;

    const interval = window.setInterval(() => {
      const screen = lastScreenRef.current;
      if (screen === 'attract') return;
      const idleMs = Date.now() - state.session.lastInteractionAt;
      const timeoutMs = state.config.idleTimeoutSeconds * 1000;
      if (idleMs >= timeoutMs) {
        logEvent({
          type: 'idle_reset',
          eventName: state.config.eventName,
          appVersion: state.config.appVersion,
          sessionId: state.session.sessionId
        });
        resetToAttract();
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [state.configLoaded, state.config, state.session.lastInteractionAt, state.session.sessionId, resetToAttract]);
}
