import { storage, STORAGE_KEYS } from './storage';
import { DEFAULT_ACTIVITIES } from '@/data/activitiesData';
import type { ActivityConfig, ActivityId, ActivityCompletionCriteria } from '@/types';

export interface ActivityOverride {
  id: ActivityId;
  active: boolean;
  order: number;
  estimatedDurationSeconds: number;
  completionCriteria: ActivityCompletionCriteria;
}

function defaultOverrides(): ActivityOverride[] {
  return DEFAULT_ACTIVITIES.map((a) => ({
    id: a.id,
    active: a.active,
    order: a.order,
    estimatedDurationSeconds: a.estimatedDurationSeconds,
    completionCriteria: a.completionCriteria
  }));
}

function getOverrides(): ActivityOverride[] {
  const stored = storage.get<ActivityOverride[] | null>(STORAGE_KEYS.activities, null);
  if (!stored || stored.length === 0) return defaultOverrides();
  // garante que atividades novas (adicionadas em versões futuras) apareçam mesmo com overrides antigos salvos
  const knownIds = new Set(stored.map((o) => o.id));
  const missing = defaultOverrides().filter((o) => !knownIds.has(o.id));
  return [...stored, ...missing];
}

export function saveOverrides(overrides: ActivityOverride[]): void {
  storage.set(STORAGE_KEYS.activities, overrides);
}

export function getAllActivities(): ActivityConfig[] {
  const overrides = getOverrides();
  const overrideMap = new Map(overrides.map((o) => [o.id, o]));
  return DEFAULT_ACTIVITIES.map((activity) => {
    const override = overrideMap.get(activity.id);
    if (!override) return activity;
    return {
      ...activity,
      active: override.active,
      order: override.order,
      estimatedDurationSeconds: override.estimatedDurationSeconds,
      completionCriteria: override.completionCriteria
    };
  }).sort((a, b) => a.order - b.order);
}

export function getActiveActivities(): ActivityConfig[] {
  return getAllActivities().filter((a) => a.active);
}

export function getActivityById(id: ActivityId): ActivityConfig | undefined {
  return getAllActivities().find((a) => a.id === id);
}

export function updateActivityOverride(id: ActivityId, patch: Partial<Omit<ActivityOverride, 'id'>>): void {
  const overrides = getOverrides();
  const index = overrides.findIndex((o) => o.id === id);
  if (index === -1) return;
  overrides[index] = { ...overrides[index], ...patch };
  saveOverrides(overrides);
}

export function resetActivityOverrides(): void {
  storage.remove(STORAGE_KEYS.activities);
}
