import { ScreenShell } from '../components/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './ResultScreen.css';

export function ResultScreen() {
  const { state, proceedAfterResult } = useApp();
  const { result, passed, activityId } = state.session;
  const activity = state.activities.find((a) => a.id === activityId);

  if (!result || !activity) return null;

  return (
    <ScreenShell>
      <div className="result-screen">
        <div className={`result-screen__badge ${passed ? 'result-screen__badge--good' : 'result-screen__badge--soft'} anim-slide-up`}>
          <Icon name={passed ? 'check' : 'bolt'} size={40} />
        </div>

        <h1 className="result-screen__title anim-slide-up">
          {passed ? 'Muito bem!' : 'Bom começo!'}
        </h1>

        <p className="result-screen__score anim-slide-up">
          Você acertou {result.correct} de {result.correct + result.incorrect}
        </p>

        <div className="result-screen__learning anim-slide-up">
          <span className="result-screen__learning-label">
            <Icon name="bulb" size={20} /> O que você aprendeu
          </span>
          <p>{activity.learningMessage}</p>
        </div>

        <Button onPress={proceedAfterResult} icon={<Icon name="chevronRight" size={22} />}>
          Continuar
        </Button>
      </div>
    </ScreenShell>
  );
}
