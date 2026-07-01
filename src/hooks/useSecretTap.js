import { useCallback, useRef } from 'react';

export function useSecretTap({ requiredTaps = 5, windowMs = 2500, onTrigger }) {
  const tapsRef = useRef([]);

  const registerTap = useCallback(() => {
    const now = Date.now();
    const recent = tapsRef.current.filter((t) => now - t < windowMs);
    recent.push(now);
    tapsRef.current = recent;
    if (recent.length >= requiredTaps) {
      tapsRef.current = [];
      onTrigger();
    }
  }, [requiredTaps, windowMs, onTrigger]);

  return registerTap;
}
