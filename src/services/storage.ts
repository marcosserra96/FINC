const NAMESPACE = 'energisa-painel';

function key(name: string): string {
  return `${NAMESPACE}:${name}`;
}

/**
 * Wrapper sobre localStorage: nunca deixa um erro de storage (quota cheia,
 * modo privado, JSON inválido) derrubar a experiência do visitante.
 */
export const storage = {
  get<T>(name: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key(name));
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  set<T>(name: string, value: T): void {
    try {
      localStorage.setItem(key(name), JSON.stringify(value));
    } catch {
      // Armazenamento indisponível (quota, modo privado): a sessão segue em memória.
    }
  },

  remove(name: string): void {
    try {
      localStorage.removeItem(key(name));
    } catch {
      // ignore
    }
  },

  clearAll(): void {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(`${NAMESPACE}:`))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }
};

export const STORAGE_KEYS = {
  appConfig: 'app-config',
  activities: 'activities',
  metricsEvents: 'metrics-events',
  giftRecords: 'gift-records',
  lastGiftDeviceTimestamp: 'last-gift-device-ts',
  adminSession: 'admin-session',
  theme: 'theme'
} as const;
