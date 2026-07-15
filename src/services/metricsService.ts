import { storage, STORAGE_KEYS } from './storage';
import type { MetricsEvent, MetricsEventType, ActivityId } from '@/types';

const MAX_EVENTS = 5000;

function isTouchDevice(): boolean {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

interface LogEventInput {
  type: MetricsEventType;
  eventName: string;
  appVersion: string;
  sessionId: string;
  activityId?: ActivityId;
  durationMs?: number;
  correct?: number;
  incorrect?: number;
}

export function logEvent(input: LogEventInput): void {
  const events = storage.get<MetricsEvent[]>(STORAGE_KEYS.metricsEvents, []);
  const event: MetricsEvent = {
    id: `ev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    deviceType: isTouchDevice() ? 'touch' : 'desktop',
    ...input
  };
  events.push(event);
  // mantém apenas os eventos mais recentes para não estourar o localStorage em eventos longos
  const trimmed = events.length > MAX_EVENTS ? events.slice(events.length - MAX_EVENTS) : events;
  storage.set(STORAGE_KEYS.metricsEvents, trimmed);
}

export function getEvents(): MetricsEvent[] {
  return storage.get<MetricsEvent[]>(STORAGE_KEYS.metricsEvents, []);
}

export interface MetricsSummary {
  totalSessions: number;
  activitiesStarted: number;
  activitiesCompleted: number;
  abandoned: number;
  giftsReleased: number;
  giftsDelivered: number;
  idleResets: number;
  avgDurationMsByActivity: Record<string, number>;
  completionByActivity: Record<string, { started: number; completed: number }>;
}

export function getSummary(): MetricsSummary {
  const events = getEvents();
  const summary: MetricsSummary = {
    totalSessions: 0,
    activitiesStarted: 0,
    activitiesCompleted: 0,
    abandoned: 0,
    giftsReleased: 0,
    giftsDelivered: 0,
    idleResets: 0,
    avgDurationMsByActivity: {},
    completionByActivity: {}
  };

  const durationsByActivity: Record<string, number[]> = {};

  for (const event of events) {
    switch (event.type) {
      case 'session_start':
        summary.totalSessions += 1;
        break;
      case 'activity_start':
        summary.activitiesStarted += 1;
        if (event.activityId) {
          summary.completionByActivity[event.activityId] ??= { started: 0, completed: 0 };
          summary.completionByActivity[event.activityId].started += 1;
        }
        break;
      case 'activity_complete':
        summary.activitiesCompleted += 1;
        if (event.activityId) {
          summary.completionByActivity[event.activityId] ??= { started: 0, completed: 0 };
          summary.completionByActivity[event.activityId].completed += 1;
          if (event.durationMs) {
            durationsByActivity[event.activityId] ??= [];
            durationsByActivity[event.activityId].push(event.durationMs);
          }
        }
        break;
      case 'activity_abandon':
        summary.abandoned += 1;
        break;
      case 'gift_released':
        summary.giftsReleased += 1;
        break;
      case 'gift_delivered':
        summary.giftsDelivered += 1;
        break;
      case 'idle_reset':
        summary.idleResets += 1;
        break;
    }
  }

  for (const [activityId, durations] of Object.entries(durationsByActivity)) {
    summary.avgDurationMsByActivity[activityId] =
      durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  return summary;
}

export function purgeOldEvents(retentionDays: number): void {
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  const events = getEvents().filter((e) => e.timestamp >= cutoff);
  storage.set(STORAGE_KEYS.metricsEvents, events);
}

export function clearAllMetrics(): void {
  storage.set(STORAGE_KEYS.metricsEvents, []);
}

export function exportEventsAsJSON(): string {
  return JSON.stringify(getEvents(), null, 2);
}

const DEMO_ACTIVITY_IDS: ActivityId[] = ['quiz-relampago', 'memoria-energia', 'organize-habitos', 'casa-eficiente'];

/**
 * Popula o painel de métricas com dados fictícios para demonstração e
 * treinamento da equipe do estande, sem precisar rodar sessões reais.
 * Ação explícita do administrador — nunca roda sozinha.
 */
export function seedDemoData(eventName: string, appVersion: string): void {
  const events = storage.get<MetricsEvent[]>(STORAGE_KEYS.metricsEvents, []);
  const now = Date.now();

  for (let i = 0; i < 40; i++) {
    const sessionId = `demo_${i}`;
    const activityId = DEMO_ACTIVITY_IDS[i % DEMO_ACTIVITY_IDS.length];
    const timestamp = now - Math.round(Math.random() * 6 * 60 * 60 * 1000);
    const completed = Math.random() > 0.25;

    events.push(
      { id: `demo_${i}_a`, type: 'session_start', timestamp, eventName, appVersion, sessionId, deviceType: 'touch' },
      { id: `demo_${i}_b`, type: 'activity_start', timestamp: timestamp + 2000, eventName, appVersion, sessionId, activityId, deviceType: 'touch' }
    );

    if (completed) {
      const durationMs = 45000 + Math.round(Math.random() * 40000);
      events.push({
        id: `demo_${i}_c`,
        type: 'activity_complete',
        timestamp: timestamp + 2000 + durationMs,
        eventName,
        appVersion,
        sessionId,
        activityId,
        durationMs,
        correct: 3 + Math.round(Math.random() * 2),
        incorrect: Math.round(Math.random() * 2),
        deviceType: 'touch'
      });
      if (Math.random() > 0.3) {
        events.push({
          id: `demo_${i}_d`,
          type: 'gift_released',
          timestamp: timestamp + 2000 + durationMs + 1000,
          eventName,
          appVersion,
          sessionId,
          activityId,
          deviceType: 'touch'
        });
      }
    } else {
      events.push({
        id: `demo_${i}_c`,
        type: 'activity_abandon',
        timestamp: timestamp + 20000,
        eventName,
        appVersion,
        sessionId,
        activityId,
        deviceType: 'touch'
      });
    }
  }

  storage.set(STORAGE_KEYS.metricsEvents, events);
}

export function exportEventsAsCSV(): string {
  const events = getEvents();
  if (events.length === 0) return 'sem dados';
  const headers = Object.keys(events[0]);
  const rows = events.map((e) =>
    headers.map((h) => JSON.stringify((e as unknown as Record<string, unknown>)[h] ?? '')).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}
