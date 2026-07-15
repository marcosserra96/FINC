import { useEffect } from 'react';
import { ScreenShell } from '../components/ScreenShell';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './ClosingScreen.css';

const AUTO_RETURN_MS = 4000;

export function ClosingScreen() {
  const { state, resetToAttract } = useApp();

  useEffect(() => {
    const id = window.setTimeout(resetToAttract, AUTO_RETURN_MS);
    return () => window.clearTimeout(id);
  }, [resetToAttract]);

  return (
    <ScreenShell>
      <div className="closing-screen">
        <Icon name="bolt" size={44} />
        <h1 className="closing-screen__title">{state.config.texts.closingMessage}</h1>
      </div>
    </ScreenShell>
  );
}
