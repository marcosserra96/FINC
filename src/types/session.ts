import type { ActivityId, ActivityRunResult } from './activity';

export type SessionScreen =
  | 'attract'
  | 'ageSelect'
  | 'activitySelect'
  | 'activityPrepare'
  | 'activityRunning'
  | 'timeUp'
  | 'result'
  | 'completion'
  | 'giftInstructions'
  | 'noGifts'
  | 'closing'
  | 'error';

export type AgeRangeId = 'child' | 'teen' | 'adult' | 'senior';

export interface SessionState {
  sessionId: string;
  screen: SessionScreen;
  ageRange: AgeRangeId | null;
  activityId: ActivityId | null;
  startedAt: number;
  activityStartedAt: number | null;
  result: ActivityRunResult | null;
  passed: boolean | null;
  giftCode: string | null;
  giftCodeExpiresAt: number | null;
  lastInteractionAt: number;
  errorMessage: string | null;
}

export const createEmptySession = (sessionId: string): SessionState => ({
  sessionId,
  screen: 'attract',
  ageRange: null,
  activityId: null,
  startedAt: Date.now(),
  activityStartedAt: null,
  result: null,
  passed: null,
  giftCode: null,
  giftCodeExpiresAt: null,
  lastInteractionAt: Date.now(),
  errorMessage: null
});
