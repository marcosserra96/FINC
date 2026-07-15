import { useCallback, useEffect, useState } from 'react';

/**
 * Modo tela cheia é opt-in via gesto do usuário (política dos navegadores),
 * então oferecemos um botão discreto que aparece só quando ainda não está
 * em fullscreen — some sozinho assim que o totem entra no modo quiosque.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const requestFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {
      // navegador pode negar sem gesto direto do usuário; ignorar silenciosamente
    });
  }, []);

  return { isFullscreen, requestFullscreen };
}
