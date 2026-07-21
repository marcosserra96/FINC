import { ScreenShell } from '../components/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './ResultScreen.css';

const TITLES = { perfect: 'Perfeito!', good: 'Muito bem!', needsWork: 'Bom começo!' } as const;
const BADGE_ICONS = { perfect: 'star', good: 'check', needsWork: 'bolt' } as const;

export function ResultScreen() {
  const { state, proceedAfterResult } = useApp();
  const { result, passed, activityId } = state.session;
  const activity = state.activities.find((a) => a.id === activityId);

  if (!result || !activity) return null;

  // 3 níveis de mensagem por atividade (não só uma frase fixa igual pra
  // todo mundo): perfeito (100%), bom (passou, mas não perfeito) e "pode
  // melhorar" (não atingiu o critério) — cada um com um texto próprio.
  const ratio = result.totalSteps > 0 ? result.correct / result.totalSteps : 0;
  const tier = ratio >= 1 ? 'perfect' : passed ? 'good' : 'needsWork';
  const message = activity.resultMessages[tier];

  return (
    <ScreenShell>
      <div className="result-screen">
        <div className={`result-screen__badge ${passed ? 'result-screen__badge--good' : 'result-screen__badge--soft'} anim-slide-up`}>
          <Icon name={BADGE_ICONS[tier]} size={40} />
        </div>

        <h1 className="result-screen__title anim-slide-up">
          {TITLES[tier]}
        </h1>

        <p className="result-screen__score anim-slide-up">
          Você acertou {result.correct} de {result.totalSteps}
        </p>

        <div className="result-screen__learning anim-slide-up">
          <span className="result-screen__learning-label">
            <Icon name="bulb" size={20} /> O que você aprendeu
          </span>
          <p>{message}</p>
        </div>

        <Button onPress={proceedAfterResult} icon={<Icon name="chevronRight" size={22} />}>
          Continuar
        </Button>
      </div>
    </ScreenShell>
  );
}
