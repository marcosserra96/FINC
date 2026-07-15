import { ScreenShell } from '../components/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './ErrorScreen.css';

export function ErrorScreen() {
  const { resetToAttract } = useApp();
  return (
    <ScreenShell>
      <div className="error-screen">
        <Icon name="refresh" size={44} />
        <h1 className="error-screen__title">Ops, algo não saiu como esperado</h1>
        <p className="error-screen__text">Vamos recomeçar — isso não afeta o brinde que você já ganhou.</p>
        <Button onPress={resetToAttract} icon={<Icon name="chevronRight" size={22} />}>
          Recomeçar
        </Button>
      </div>
    </ScreenShell>
  );
}
