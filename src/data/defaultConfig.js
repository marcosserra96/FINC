export const DEFAULT_CONFIG = {
  homeMessage: {
    title: 'O futuro da energia começa com você',
    subtitle: 'Toque em uma experiência para começar',
  },
  inactivityTimeoutSeconds: 90,
  activities: {
    quiz: true,
    memory: true,
    appliance: true,
  },
  rankingEnabled: true,
  adminPin: '2026',
  logoDataUrl: null,
};

export function mergeWithDefaultConfig(stored) {
  if (!stored || typeof stored !== 'object') return { ...DEFAULT_CONFIG };
  return {
    ...DEFAULT_CONFIG,
    ...stored,
    homeMessage: {
      ...DEFAULT_CONFIG.homeMessage,
      ...(stored.homeMessage || {}),
    },
    activities: {
      ...DEFAULT_CONFIG.activities,
      ...(stored.activities || {}),
    },
  };
}
