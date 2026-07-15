const SESSION_KEY = 'energisa-painel:admin-authenticated';

// PIN padrão do MVP — documentado em docs/05-manual-operacao.md.
// Evolução recomendada: mover para variável de ambiente/config segura
// antes de um deploy de produção de longa duração.
export const DEFAULT_ADMIN_PIN = '2025';

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function authenticate(pin: string): boolean {
  if (pin === DEFAULT_ADMIN_PIN) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
