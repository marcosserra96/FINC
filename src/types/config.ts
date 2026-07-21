export type ActivitySelectionMode = 'visitorChoice' | 'random' | 'fixedOrder';

export interface AppTexts {
  attractTitle: string;
  attractSubtitle: string;
  startCta: string;
  ageSelectTitle: string;
  activitySelectTitle: string;
  giftWonMessage: string;
  closingMessage: string;
  timeUpTitle: string;
  timeUpMessage: string;
}

export interface GiftConfig {
  /** Sem código, sem estoque digital — a equipe acompanha o jogo ao vivo
   *  e entrega o brinde na hora. Esse toggle só liga/desliga o aviso na
   *  tela de resultado. */
  enabled: boolean;
}

export interface AppConfig {
  eventName: string;
  appVersion: string;
  texts: AppTexts;
  idleTimeoutSeconds: number;
  /** Multiplicador sobre `estimatedDurationSeconds` de cada atividade —
   *  o limite de tempo real é calculado por atividade (`estimate * multiplier`),
   *  não um valor fixo igual para todas. */
  activityTimeLimitMultiplier: number;
  activitySelectionMode: ActivitySelectionMode;
  soundEnabled: boolean;
  reducedMotion: boolean;
  intenseAnimationsEnabled: boolean;
  quizQuestionCount: number;
  scenarioCaseCount: number;
  attractCuriosities: string[];
  giftConfig: GiftConfig;
  eventModeActive: boolean;
  dataRetentionDays: number;
}

export const DEFAULT_APP_VERSION = '1.0.0';
