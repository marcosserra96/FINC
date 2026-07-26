import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { countParticipations, exportParticipationCSV, clearAllMetrics } from '@/services/metricsService';
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

export function ParticipationSection() {
  const [, refresh] = useState(0);
  const total = countParticipations();

  const handleClear = () => {
    clearAllMetrics();
    refresh((n) => n + 1);
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Participação</h1>
        <p>Quantas pessoas passaram pelo totem, por faixa etária e data.</p>
      </div>

      <div className="admin-card admin-highlight">
        <span className="admin-highlight__icon">
          <Icon name="users" size={24} />
        </span>
        <div className="admin-highlight__text">
          <strong>{total}</strong>
          <span>{total === 1 ? 'participação registrada neste dispositivo' : 'participações registradas neste dispositivo'}</span>
        </div>
      </div>

      <div className="admin-card">
        <h2>Exportar e limpar</h2>
        <p className="admin-card__note">
          O arquivo traz uma linha por participação, com data, hora e faixa etária — pronto para abrir no Excel ou Google Sheets.
        </p>
        <div className="admin-actions">
          <button
            className="admin-btn admin-btn--primary"
            type="button"
            onClick={() => download('participacao.csv', exportParticipationCSV(), 'text/csv')}
          >
            <Icon name="download" size={16} /> Exportar CSV
          </button>
          <button className="admin-btn admin-btn--danger" type="button" onClick={handleClear}>
            <Icon name="trash" size={16} /> Limpar dados de teste
          </button>
        </div>
      </div>
    </div>
  );
}
