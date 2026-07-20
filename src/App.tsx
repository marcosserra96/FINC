import { Routes, Route } from 'react-router-dom';
import { PublicApp } from '@/public-app/PublicApp';
import { AdminApp } from '@/admin/AdminApp';
import { useKioskGuards } from '@/hooks/useKioskGuards';
import { useApp } from '@/store/AppContext';

export default function App() {
  useKioskGuards();
  const { state } = useApp();

  if (!state.configLoaded) {
    return <div className="app-shell" style={{ background: 'var(--surface-bg-mid)' }} />;
  }

  return (
    <div className="app-shell" data-reduced-motion={state.config.reducedMotion ? 'true' : 'false'}>
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </div>
  );
}
