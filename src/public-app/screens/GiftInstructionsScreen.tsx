import { useEffect, useState } from 'react';
import { ScreenShell } from '../components/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { CountdownRing } from '@/components/ui/CountdownRing';
import { useApp } from '@/store/AppContext';
import './GiftInstructionsScreen.css';

export function GiftInstructionsScreen() {
  const { state, goToClosing } = useApp();
  const { texts } = state.config;
  const { giftCode, giftCodeExpiresAt } = state.session;
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!giftCodeExpiresAt) return;
    const tick = () => setSecondsLeft(Math.max(0, Math.round((giftCodeExpiresAt - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [giftCodeExpiresAt]);

  const totalSeconds = state.config.giftConfig.codeExpiryMinutes * 60;

  return (
    <ScreenShell>
      <div className="gift-instructions">
        <Icon name="gift" size={48} />
        <h1 className="gift-instructions__title">Quase lá!</h1>
        <p className="gift-instructions__text">{texts.giftInstructions}</p>

        <div className="gift-instructions__panel">
          <div className="gift-instructions__code">{giftCode}</div>
          <div className="gift-instructions__ring">
            <CountdownRing secondsLeft={secondsLeft} totalSeconds={totalSeconds} size={80} />
            <span className="gift-instructions__ring-label">válido por mais</span>
          </div>
        </div>

        <Button onPress={goToClosing} icon={<Icon name="check" size={22} />}>
          Concluir
        </Button>
      </div>
    </ScreenShell>
  );
}
