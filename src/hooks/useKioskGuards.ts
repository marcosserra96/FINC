import { useEffect } from 'react';

/**
 * Trava comportamentos de navegador que não fazem sentido num totem:
 * zoom por gesto, seleção de texto, menu de contexto e o "bounce" de
 * pull-to-refresh em telas touch.
 */
export function useKioskGuards(): void {
  useEffect(() => {
    const preventContextMenu = (e: Event) => e.preventDefault();
    const preventGesture = (e: Event) => e.preventDefault();

    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 350) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    const preventMultiTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
    document.addEventListener('touchstart', preventMultiTouchZoom, { passive: false });

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('touchend', preventDoubleTapZoom);
      document.removeEventListener('touchstart', preventMultiTouchZoom);
    };
  }, []);
}
