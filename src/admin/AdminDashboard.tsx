import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { logoutAdmin } from '@/services/adminAuth';
import { useApp } from '@/store/AppContext';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { TextsSection } from './sections/TextsSection';
import { ParticipationSection } from './sections/ParticipationSection';
import './AdminDashboard.css';

type Tab = 'atividades' | 'textos' | 'participacao';

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'atividades', label: 'Atividades', icon: 'sort' },
  { id: 'textos', label: 'Textos e mensagens', icon: 'edit' },
  { id: 'participacao', label: 'Participação', icon: 'users' }
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
          <span className="admin-dashboard__brand-icon">
            <Icon name="bolt" size={18} />
          </span>
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
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-dashboard__footer">
          <button type="button" className="admin-dashboard__ghost-btn" onClick={() => navigate('/')}>
            <Icon name="chevronLeft" size={18} /> <span>Ver painel público</span>
          </button>
          <button type="button" className="admin-dashboard__ghost-btn" onClick={handleLogout}>
            <Icon name="lock" size={18} /> <span>Sair</span>
          </button>
          <span className="admin-dashboard__version">v{state.config.appVersion}</span>
        </div>
      </aside>

      <main className="admin-dashboard__content">
        {tab === 'atividades' && <ActivitiesSection />}
        {tab === 'textos' && <TextsSection />}
        {tab === 'participacao' && <ParticipationSection />}
      </main>
    </div>
  );
}
