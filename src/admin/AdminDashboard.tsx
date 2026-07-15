import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { logoutAdmin } from '@/services/adminAuth';
import { useApp } from '@/store/AppContext';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { TextsSection } from './sections/TextsSection';
import { BehaviorSection } from './sections/BehaviorSection';
import { GiftsSection } from './sections/GiftsSection';
import { MetricsSection } from './sections/MetricsSection';
import { EventModeSection } from './sections/EventModeSection';
import './AdminDashboard.css';

type Tab = 'atividades' | 'textos' | 'comportamento' | 'brindes' | 'metricas' | 'evento';

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'atividades', label: 'Atividades', icon: 'sort' },
  { id: 'textos', label: 'Textos e mensagens', icon: 'edit' },
  { id: 'comportamento', label: 'Comportamento', icon: 'bolt' },
  { id: 'brindes', label: 'Brindes', icon: 'gift' },
  { id: 'metricas', label: 'Métricas', icon: 'users' },
  { id: 'evento', label: 'Modo evento e dados', icon: 'shield' }
];

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('atividades');
  const { state } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    onLogout();
  };

  return (
    <div className="admin-dashboard" data-allow-selection="true">
      <aside className="admin-dashboard__sidebar">
        <div className="admin-dashboard__brand">
          <Icon name="bolt" size={22} />
          <div>
            <strong>Painel Admin</strong>
            <span>{state.config.eventName}</span>
          </div>
        </div>

        <nav className="admin-dashboard__nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`admin-dashboard__nav-item${tab === t.id ? ' admin-dashboard__nav-item--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <Icon name={t.icon} size={20} />
              {t.label}
            </button>
          ))}
        </nav>

        <div className="admin-dashboard__footer">
          <button type="button" className="admin-dashboard__ghost-btn" onClick={() => navigate('/')}>
            <Icon name="chevronLeft" size={18} /> Ver painel público
          </button>
          <button type="button" className="admin-dashboard__ghost-btn" onClick={handleLogout}>
            <Icon name="lock" size={18} /> Sair
          </button>
          <span className="admin-dashboard__version">v{state.config.appVersion}</span>
        </div>
      </aside>

      <main className="admin-dashboard__content">
        {tab === 'atividades' && <ActivitiesSection />}
        {tab === 'textos' && <TextsSection />}
        {tab === 'comportamento' && <BehaviorSection />}
        {tab === 'brindes' && <GiftsSection />}
        {tab === 'metricas' && <MetricsSection />}
        {tab === 'evento' && <EventModeSection />}
      </main>
    </div>
  );
}
