import { storage, STORAGE_KEYS } from './storage';
import { generateGiftCode } from './idGenerator';
import type { ActivityId, GiftConfig, GiftRecord } from '@/types';

export function getGiftRecords(): GiftRecord[] {
  return storage.get<GiftRecord[]>(STORAGE_KEYS.giftRecords, []);
}

function saveGiftRecords(records: GiftRecord[]): void {
  storage.set(STORAGE_KEYS.giftRecords, records);
}

export interface EligibilityResult {
  eligible: boolean;
  reason?: 'no-gifts-left' | 'cooldown-active' | 'disabled';
  cooldownRemainingMs?: number;
}

/**
 * Checa se este dispositivo pode liberar um novo brinde agora. O cooldown é
 * por aparelho (não por pessoa, já que não coletamos identificação) — é a
 * barreira prática contra alguém repetir a atividade em sequência para
 * acumular brindes, combinada com a confirmação manual da equipe do estande.
 */
export function checkEligibility(config: GiftConfig): EligibilityResult {
  if (!config.enabled) return { eligible: false, reason: 'disabled' };
  if (config.remaining <= 0) return { eligible: false, reason: 'no-gifts-left' };

  const lastGiftAt = storage.get<number | null>(STORAGE_KEYS.lastGiftDeviceTimestamp, null);
  if (lastGiftAt) {
    const cooldownMs = config.cooldownMinutes * 60 * 1000;
    const elapsed = Date.now() - lastGiftAt;
    if (elapsed < cooldownMs) {
      return { eligible: false, reason: 'cooldown-active', cooldownRemainingMs: cooldownMs - elapsed };
    }
  }

  return { eligible: true };
}

export function releaseGift(
  sessionId: string,
  activityId: ActivityId,
  config: GiftConfig
): GiftRecord {
  const code = generateGiftCode();
  const record: GiftRecord = {
    code,
    sessionId,
    activityId,
    releasedAt: Date.now(),
    expiresAt: Date.now() + config.codeExpiryMinutes * 60 * 1000,
    deliveredAt: null
  };
  const records = getGiftRecords();
  records.push(record);
  saveGiftRecords(records);
  storage.set(STORAGE_KEYS.lastGiftDeviceTimestamp, Date.now());
  return record;
}

export function confirmDelivery(code: string): GiftRecord | null {
  const records = getGiftRecords();
  const record = records.find((r) => r.code === code.toUpperCase());
  if (!record) return null;
  record.deliveredAt = Date.now();
  saveGiftRecords(records);
  return record;
}

export function findGiftByCode(code: string): GiftRecord | null {
  return getGiftRecords().find((r) => r.code === code.toUpperCase()) ?? null;
}
