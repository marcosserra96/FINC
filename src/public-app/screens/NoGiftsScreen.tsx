import { ScreenShell } from '../components/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './NoGiftsScreen.css';

export function NoGiftsScreen() {
  const { state, goToClosing } = useApp();
  return (
    <ScreenShell>
      <div className="no-gifts">
        <Icon name="bulb" size={48} />
        <h1 className="no-gifts__title">Você concluiu o desafio!</h1>
        <p className="no-gifts__text">{state.config.texts.noGiftsMessage}</p>
        <Button onPress={goToClosing} icon={<Icon name="check" size={22} />}>
          Concluir
        </Button>
      </div>
    </ScreenShell>
  );
}
