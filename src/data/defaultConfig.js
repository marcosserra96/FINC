export const DEFAULT_CONFIG = {
  homeMessage: {
    title: 'Aprenda a economizar energia brincando',
    subtitle: 'Toque em uma atividade para começar',
  },
  inactivityTimeoutSeconds: 60,
  activities: {
    quiz: true,
    house: true,
    appliance: true,
  },
  rankingEnabled: true,
  adminPin: '2026',
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
