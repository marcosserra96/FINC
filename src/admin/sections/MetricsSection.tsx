import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { getSummary, exportEventsAsJSON, exportEventsAsCSV, clearAllMetrics, seedDemoData } from '@/services/metricsService';
import { useApp } from '@/store/AppContext';
import './section.css';

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function MetricsSection() {
  const { state } = useApp();
  const [, refresh] = useState(0);
  const summary = getSummary();

  const handleClear = () => {
    clearAllMetrics();
    refresh((n) => n + 1);
  };

  const handleSeed = () => {
    seedDemoData(state.config.eventName, state.config.appVersion);
    refresh((n) => n + 1);
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Métricas</h1>
        <p>Visão geral do uso do totem neste dispositivo.</p>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat"><strong>{summary.totalSessions}</strong><span>sessões iniciadas</span></div>
        <div className="admin-stat"><strong>{summary.activitiesStarted}</strong><span>atividades iniciadas</span></div>
        <div className="admin-stat"><strong>{summary.activitiesCompleted}</strong><span>atividades concluídas</span></div>
        <div className="admin-stat"><strong>{summary.abandoned}</strong><span>atividades abandonadas</span></div>
        <div className="admin-stat"><strong>{summary.giftsReleased}</strong><span>brindes liberados</span></div>
        <div className="admin-stat"><strong>{summary.giftsDelivered}</strong><span>brindes entregues</span></div>
        <div className="admin-stat"><strong>{summary.idleResets}</strong><span>reinícios por inatividade</span></div>
      </div>

      <div className="admin-card">
        <h2>Desempenho por atividade</h2>
        {state.activities.map((a) => {
          const c = summary.completionByActivity[a.id];
          const avg = summary.avgDurationMsByActivity[a.id];
          const rate = c && c.started > 0 ? Math.round((c.completed / c.started) * 100) : 0;
          return (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eef3f4', fontSize: 'var(--fs-small)' }}>
              <span style={{ fontWeight: 700 }}>{a.name}</span>
              <span>{c?.started ?? 0} iniciadas</span>
              <span>{c?.completed ?? 0} concluídas ({rate}%)</span>
              <span>{avg ? `${Math.round(avg / 1000)}s média` : '—'}</span>
            </div>
          );
        })}
      </div>

      <div className="admin-card">
        <h2>Exportar e limpar</h2>
        <p style={{ color: 'var(--text-on-light-muted)', marginBottom: 12 }}>
          Retenção configurada: {state.config.dataRetentionDays} dias. Exporte antes de limpar dados de teste.
        </p>
        <div className="admin-actions">
          <button className="admin-btn admin-btn--neutral" type="button" onClick={() => download('metricas.json', exportEventsAsJSON(), 'application/json')}>
            <Icon name="download" size={16} /> Exportar JSON
          </button>
          <button className="admin-btn admin-btn--neutral" type="button" onClick={() => download('metricas.csv', exportEventsAsCSV(), 'text/csv')}>
            <Icon name="download" size={16} /> Exportar CSV
          </button>
          <button className="admin-btn admin-btn--danger" type="button" onClick={handleClear}>
            <Icon name="trash" size={16} /> Limpar dados de teste
          </button>
        </div>
        <div className="admin-actions" style={{ marginTop: 8 }}>
          <button className="admin-btn admin-btn--neutral" type="button" onClick={handleSeed}>
            <Icon name="users" size={16} /> Gerar dados de demonstração
          </button>
        </div>
      </div>
    </div>
  );
}
