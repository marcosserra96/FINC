const PREFIX = 'energisa_kiosk_';

export const STORAGE_KEYS = {
  CONFIG: `${PREFIX}config_v1`,
  QUIZ: `${PREFIX}quiz_v1`,
  RANKING: `${PREFIX}ranking_v1`,
  ADMIN_AUTHED: `${PREFIX}admin_authed_v1`,
};

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage indisponível (modo privado, quota cheia etc). Falha silenciosa é aceitável no kiosk.
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function loadSessionFlag(key) {
  try {
    return sessionStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

export function saveSessionFlag(key, value) {
  try {
    if (value) sessionStorage.setItem(key, 'true');
    else sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}
