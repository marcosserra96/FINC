import { ScreenShell } from '../components/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Celebration } from '@/components/ui/Celebration';
import { QrCode } from '@/components/ui/QrCode';
import { useApp } from '@/store/AppContext';
import './CompletionScreen.css';

export function CompletionScreen() {
  const { state, acknowledgeGiftInstructions } = useApp();
  const { texts } = state.config;
  const { giftCode } = state.session;

  return (
    <ScreenShell>
      <Celebration />
      <div className="completion-screen">
        <div className="completion-screen__icon anim-slide-up">
          <Icon name="star" size={48} />
        </div>
        <h1 className="completion-screen__title anim-slide-up">{texts.completionTitle}</h1>
        <p className="completion-screen__message anim-slide-up">{texts.completionMessage}</p>

        {giftCode && (
          <div className="completion-screen__code-card anim-slide-up">
            <QrCode value={giftCode} size={160} />
            <div className="completion-screen__code">{giftCode}</div>
          </div>
        )}

        <Button onPress={acknowledgeGiftInstructions} icon={<Icon name="gift" size={22} />}>
          Retirar meu brinde
        </Button>
      </div>
    </ScreenShell>
  );
}
