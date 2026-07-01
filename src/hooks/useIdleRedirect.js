import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ACTIVITY_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'wheel'];

export function useIdleRedirect(enabled, timeoutSeconds) {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!enabled || location.pathname === '/') return undefined;

    const goHome = () => navigate('/');

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(goHome, Math.max(5, timeoutSeconds) * 1000);
    };

    resetTimer();
    ACTIVITY_EVENTS.forEach((eventName) => window.addEventListener(eventName, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [enabled, timeoutSeconds, navigate, location.pathname]);
}
