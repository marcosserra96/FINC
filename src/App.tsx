import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicApp } from '@/public-app/PublicApp';
import { AdminApp } from '@/admin/AdminApp';
import { useKioskGuards } from '@/hooks/useKioskGuards';
import { useApp } from '@/store/AppContext';

export default function App() {
  useKioskGuards();
  const { state } = useApp();

  // `body` define `color`/`background` a partir dos tokens de tema, mas
  // `body` é ANCESTRAL de `.app-shell` (não descendente) — um atributo só
  // em `.app-shell` nunca alcançaria a variável usada lá em cima. Aplicar
  // em `<html>`, o ancestral de tudo, resolve pra valer.
  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);

  if (!state.configLoaded) {
    return <div className="app-shell" style={{ background: 'var(--surface-bg-bottom)' }} />;
  }

  return (
    <div
      className="app-shell"
      data-reduced-motion={state.config.reducedMotion ? 'true' : 'false'}
      data-theme={state.theme}
    >
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </div>
  );
}
