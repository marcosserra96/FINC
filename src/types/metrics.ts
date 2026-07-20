import type { ActivityId } from './activity';
import type { AgeRangeId } from './session';

export type MetricsEventType =
  | 'session_start'
  | 'age_selected'
  | 'activity_start'
  | 'activity_complete'
  | 'activity_abandon'
  | 'gift_released'
  | 'gift_delivered'
  | 'idle_reset'
  | 'error';

export interface MetricsEvent {
  id: string;
  type: MetricsEventType;
  timestamp: number;
  eventName: string;
  appVersion: string;
  sessionId: string;
  activityId?: ActivityId;
  ageRange?: AgeRangeId;
  durationMs?: number;
  correct?: number;
  incorrect?: number;
  deviceType: 'touch' | 'desktop';
}

export interface GiftRecord {
  code: string;
  sessionId: string;
  activityId: ActivityId;
  releasedAt: number;
  expiresAt: number;
  deliveredAt: number | null;
}
