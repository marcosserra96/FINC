import { useEffect } from 'react';
import { ScreenShell } from '../components/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './TimeUpScreen.css';

const AUTO_RETURN_MS = 6000;

export function TimeUpScreen() {
  const { state, resetToAttract } = useApp();

  useEffect(() => {
    const id = window.setTimeout(resetToAttract, AUTO_RETURN_MS);
    return () => window.clearTimeout(id);
  }, [resetToAttract]);

  return (
    <ScreenShell>
      <div className="time-up-screen">
        <Icon name="clock" size={44} />
        <h1 className="time-up-screen__title">{state.config.texts.timeUpTitle}</h1>
        <p className="time-up-screen__text">{state.config.texts.timeUpMessage}</p>
        <Button onPress={resetToAttract} icon={<Icon name="chevronRight" size={22} />}>
          Voltar para o início
        </Button>
      </div>
    </ScreenShell>
  );
}
