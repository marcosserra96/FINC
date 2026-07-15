import { useState } from 'react';
import { FormRow, Toggle, NumberInput } from '../components/FormControls';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import { confirmDelivery, findGiftByCode, getGiftRecords } from '@/services/prizeService';
import './section.css';

export function GiftsSection() {
  const { state, updateConfig } = useApp();
  const { giftConfig } = state.config;
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [, forceRefresh] = useState(0);

  const patchGift = (changes: Partial<typeof giftConfig>) =>
    updateConfig({ ...state.config, giftConfig: { ...giftConfig, ...changes } });

  const handleConfirm = () => {
    if (!code.trim()) return;
    const existing = findGiftByCode(code.trim());
    if (!existing) {
      setFeedback('Código não encontrado. Confira e tente novamente.');
    } else if (existing.deliveredAt) {
      setFeedback(`Brinde ${existing.code} já havia sido entregue.`);
    } else {
      confirmDelivery(code.trim());
      setFeedback(`Entrega do brinde ${existing.code} confirmada!`);
    }
    setCode('');
    forceRefresh((n) => n + 1);
  };

  const records = getGiftRecords().slice(-10).reverse();

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Brindes</h1>
        <p>Controle da liberação e entrega dos brindes do estande.</p>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat">
          <strong>{giftConfig.remaining}</strong>
          <span>brindes disponíveis</span>
        </div>
        <div className="admin-stat">
          <strong>{giftConfig.totalAvailable}</strong>
          <span>total do evento</span>
        </div>
        <div className="admin-stat">
          <strong>{records.filter((r) => r.deliveredAt).length}</strong>
          <span>entregas confirmadas (últimas 10)</span>
        </div>
      </div>

      <div className="admin-card">
        <h2>Confirmar entrega</h2>
        <p style={{ color: 'var(--text-on-light-muted)', marginBottom: 12 }}>
          Digite o código mostrado na tela do visitante para dar baixa manualmente.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="text-input"
            style={{ textTransform: 'uppercase', maxWidth: 160 }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex: A3F9K"
          />
          <button className="admin-btn admin-btn--primary" type="button" onClick={handleConfirm}>
            <Icon name="check" size={16} /> Confirmar
          </button>
        </div>
        {feedback && <p className="admin-confirm" style={{ marginTop: 8 }}>{feedback}</p>}
      </div>

      <div className="admin-card">
        <h2>Configuração</h2>
        <FormRow label="Brindes habilitados">
          <Toggle checked={giftConfig.enabled} onChange={(v) => patchGift({ enabled: v })} />
        </FormRow>
        <FormRow label="Total de brindes do evento">
          <NumberInput value={giftConfig.totalAvailable} min={0} onChange={(v) => patchGift({ totalAvailable: v })} />
        </FormRow>
        <FormRow label="Estoque atual disponível">
          <NumberInput value={giftConfig.remaining} min={0} onChange={(v) => patchGift({ remaining: v })} />
        </FormRow>
        <FormRow label="Validade do código" hint="Tempo para o visitante mostrar o código na equipe">
          <NumberInput value={giftConfig.codeExpiryMinutes} min={2} max={60} suffix="min" onChange={(v) => patchGift({ codeExpiryMinutes: v })} />
        </FormRow>
        <FormRow label="Intervalo entre brindes no mesmo aparelho" hint="Reduz repetição rápida da mesma pessoa">
          <NumberInput value={giftConfig.cooldownMinutes} min={0} max={120} suffix="min" onChange={(v) => patchGift({ cooldownMinutes: v })} />
        </FormRow>
        <FormRow label="Exigir confirmação da equipe" hint="Baixa manual do brinde nesta tela">
          <Toggle checked={giftConfig.requireStaffConfirmation} onChange={(v) => patchGift({ requireStaffConfirmation: v })} />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Últimos brindes liberados</h2>
        {records.length === 0 && <p style={{ color: 'var(--text-on-light-muted)' }}>Nenhum brinde liberado ainda.</p>}
        {records.map((r) => (
          <div key={r.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eef3f4', fontSize: 'var(--fs-small)' }}>
            <span style={{ fontWeight: 700 }}>{r.code}</span>
            <span>{r.activityId}</span>
            <span>{new Date(r.releasedAt).toLocaleTimeString('pt-BR')}</span>
            <span style={{ color: r.deliveredAt ? 'var(--color-success)' : 'var(--text-on-light-muted)' }}>
              {r.deliveredAt ? 'Entregue' : 'Aguardando'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
