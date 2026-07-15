export type ActivitySelectionMode = 'visitorChoice' | 'random' | 'fixedOrder';

export interface AppTexts {
  attractTitle: string;
  attractSubtitle: string;
  startCta: string;
  activitySelectTitle: string;
  completionTitle: string;
  completionMessage: string;
  giftInstructions: string;
  noGiftsMessage: string;
  closingMessage: string;
}

export interface GiftConfig {
  enabled: boolean;
  totalAvailable: number;
  remaining: number;
  codeExpiryMinutes: number;
  cooldownMinutes: number;
  requireStaffConfirmation: boolean;
}

export interface AppConfig {
  eventName: string;
  appVersion: string;
  texts: AppTexts;
  idleTimeoutSeconds: number;
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
