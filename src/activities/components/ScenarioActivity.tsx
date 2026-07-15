import { useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useApp } from '@/store/AppContext';
import { shuffle } from '@/utils/shuffle';
import { colorForKey } from '@/utils/paletteColor';
import type { ActivityRunResult, ScenarioActivityConfig, ScenarioCase } from '@/types';
import './ScenarioActivity.css';

interface ScenarioActivityProps {
  activity: ScenarioActivityConfig;
  onComplete: (result: ActivityRunResult) => void;
}

/**
 * Situação curta do dia a dia + duas atitudes possíveis — o visitante toca
 * na que considera mais consciente. Mecânica de decisão simples (sem
 * arrastar, sem cálculo), pensada pra ser resolvida "de lógica".
 */
export function ScenarioActivity({ activity, onComplete }: ScenarioActivityProps) {
  const { state } = useApp();
  const startedAtRef = useRef(Date.now());

  const cases = useMemo<ScenarioCase[]>(() => {
    const count = Math.min(state.config.scenarioCaseCount, activity.cases.length);
    return shuffle(activity.cases).slice(0, count);
  }, [activity.cases, state.config.scenarioCaseCount]);

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [chosenId, setChosenId] = useState<'a' | 'b' | null>(null);

  const scenario = cases[index];
  const isLast = index === cases.length - 1;

  const handleChoose = (optionId: 'a' | 'b', isCorrect: boolean) => {
    if (chosenId !== null) return;
    setChosenId(optionId);
    if (isCorrect) setCorrect((c) => c + 1);
    else setIncorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete({
        correct,
        incorrect,
        stepsCompleted: index + 1,
        totalSteps: cases.length,
        durationMs: Date.now() - startedAtRef.current
      });
      return;
    }
    setIndex((i) => i + 1);
    setChosenId(null);
  };

  if (!scenario) return null;

  const chosenOption = chosenId ? scenario.options.find((o) => o.id === chosenId) : null;
  const wasCorrect = chosenOption?.correct ?? false;

  return (
    <div className="scenario-activity">
      <ProgressBar value={index + 1} total={cases.length} label={`Situação ${index + 1} de ${cases.length}`} />

      <div className="scenario-activity__card">
        <div className="scenario-activity__icon" style={{ background: colorForKey(scenario.situationIcon) }}>
          <Icon name={scenario.situationIcon as IconName} size={40} strokeWidth={1.6} color="#fff" />
        </div>
        <p className="scenario-activity__prompt">{scenario.situation}</p>
        <span className="scenario-activity__question">O que fazer?</span>
      </div>

      {chosenId === null ? (
        <div className="scenario-activity__options">
          {scenario.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className="scenario-activity__option"
              onClick={() => handleChoose(option.id, option.correct)}
            >
              <span className="scenario-activity__option-icon" style={{ background: colorForKey(option.icon) }}>
                <Icon name={option.icon as IconName} size={26} strokeWidth={1.8} color="#fff" />
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={`scenario-activity__feedback ${wasCorrect ? 'scenario-activity__feedback--correct' : 'scenario-activity__feedback--gentle'}`}>
          <div className="scenario-activity__feedback-header">
            <Icon name={wasCorrect ? 'check' : 'bulb'} size={24} />
            <span>{wasCorrect ? 'Boa escolha!' : 'Quase — olha só:'}</span>
          </div>
          <p>{scenario.explanation}</p>
          <Button onPress={handleNext} size="md" icon={<Icon name="chevronRight" size={20} />}>
            {isLast ? 'Ver resultado' : 'Próxima situação'}
          </Button>
        </div>
      )}
    </div>
  );
}
