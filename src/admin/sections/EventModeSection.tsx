import { useState } from 'react';
import { FormRow, Toggle, NumberInput } from '../components/FormControls';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import { resetConfig } from '@/services/configService';
import { resetActivityOverrides } from '@/services/activitiesService';
import { purgeOldEvents } from '@/services/metricsService';
import { storage } from '@/services/storage';
import './section.css';

export function EventModeSection() {
  const { state, updateConfig, reloadActivities, resetToAttract } = useApp();
  const [confirmWipe, setConfirmWipe] = useState(false);

  const patch = (changes: Partial<typeof state.config>) => updateConfig({ ...state.config, ...changes });

  const handleRestoreActivities = () => {
    resetActivityOverrides();
    reloadActivities();
  };

  const handleRestoreConfig = () => {
    const defaults = resetConfig();
    updateConfig(defaults);
  };

  const handlePurge = () => purgeOldEvents(state.config.dataRetentionDays);

  const handleWipeAll = () => {
    if (!confirmWipe) {
      setConfirmWipe(true);
      return;
    }
    storage.clearAll();
    window.location.reload();
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Modo evento e dados</h1>
        <p>Controles operacionais para quando o totem está em uso ao vivo.</p>
      </div>

      <div className="admin-card">
        <FormRow label="Modo evento ativo" hint="Desative fora de eventos para evitar liberação de brindes por engano">
          <Toggle checked={state.config.eventModeActive} onChange={(v) => patch({ eventModeActive: v })} />
        </FormRow>
        <FormRow label="Retenção de dados" hint="Métricas mais antigas que isso podem ser limpas">
          <NumberInput value={state.config.dataRetentionDays} min={1} max={365} suffix="dias" onChange={(v) => patch({ dataRetentionDays: v })} />
        </FormRow>
        <FormRow label="Versão do sistema">
          <span>{state.config.appVersion}</span>
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Ações rápidas</h2>
        <div className="admin-actions">
          <button className="admin-btn admin-btn--neutral" type="button" onClick={resetToAttract}>
            <Icon name="refresh" size={16} /> Reiniciar sessão atual
          </button>
          <button className="admin-btn admin-btn--neutral" type="button" onClick={handlePurge}>
            <Icon name="trash" size={16} /> Aplicar retenção agora
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2>Restaurar padrões</h2>
        <p style={{ color: 'var(--text-on-light-muted)', marginBottom: 12 }}>
          Desfaz customizações mantendo o histórico de métricas e brindes.
        </p>
        <div className="admin-actions">
          <button className="admin-btn admin-btn--neutral" type="button" onClick={handleRestoreActivities}>
            Restaurar atividades padrão
          </button>
          <button className="admin-btn admin-btn--neutral" type="button" onClick={handleRestoreConfig}>
            Restaurar textos e comportamento padrão
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2>Zona de risco</h2>
        <p style={{ color: 'var(--text-on-light-muted)', marginBottom: 12 }}>
          Apaga todos os dados salvos neste dispositivo (métricas, brindes e configurações). Use apenas ao encerrar um evento.
        </p>
        <div className="admin-actions">
          <button className="admin-btn admin-btn--danger" type="button" onClick={handleWipeAll}>
            <Icon name="trash" size={16} /> {confirmWipe ? 'Toque de novo para confirmar' : 'Apagar todos os dados'}
          </button>
        </div>
      </div>
    </div>
  );
}
