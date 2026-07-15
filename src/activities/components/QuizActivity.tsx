import { useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useApp } from '@/store/AppContext';
import { shuffle } from '@/utils/shuffle';
import { colorForKey } from '@/utils/paletteColor';
import type { ActivityRunResult, QuizActivityConfig, QuizQuestion } from '@/types';
import './QuizActivity.css';

interface QuizActivityProps {
  activity: QuizActivityConfig;
  onComplete: (result: ActivityRunResult) => void;
}

export function QuizActivity({ activity, onComplete }: QuizActivityProps) {
  const { state } = useApp();
  const startedAtRef = useRef(Date.now());

  const questions = useMemo<QuizQuestion[]>(() => {
    const count = Math.min(state.config.quizQuestionCount, activity.questions.length);
    return shuffle(activity.questions).slice(0, count);
  }, [activity.questions, state.config.quizQuestionCount]);

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  const handleAnswer = (choice: boolean) => {
    if (answered !== null) return;
    const isCorrect = choice === question.answer;
    setAnswered(isCorrect);
    if (isCorrect) setCorrect((c) => c + 1);
    else setIncorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete({
        correct,
        incorrect,
        stepsCompleted: index + 1,
        totalSteps: questions.length,
        durationMs: Date.now() - startedAtRef.current
      });
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(null);
  };

  if (!question) return null;

  return (
    <div className="quiz-activity">
      <ProgressBar value={index + 1} total={questions.length} label={`Pergunta ${index + 1} de ${questions.length}`} />

      <div className="quiz-activity__card">
        <div className="quiz-activity__icon" style={{ background: colorForKey(question.icon) }}>
          <Icon name={question.icon as IconName} size={40} strokeWidth={1.6} color="#fff" />
        </div>
        <p className="quiz-activity__prompt">{question.prompt}</p>
      </div>

      {answered === null ? (
        <div className="quiz-activity__choices">
          <button type="button" className="quiz-activity__choice quiz-activity__choice--true" onClick={() => handleAnswer(true)}>
            <Icon name="check" size={28} />
            Verdadeiro
          </button>
          <button type="button" className="quiz-activity__choice quiz-activity__choice--false" onClick={() => handleAnswer(false)}>
            <Icon name="close" size={28} />
            Falso
          </button>
        </div>
      ) : (
        <div className={`quiz-activity__feedback ${answered ? 'quiz-activity__feedback--correct' : 'quiz-activity__feedback--gentle'}`}>
          <div className="quiz-activity__feedback-header">
            <Icon name={answered ? 'check' : 'bulb'} size={24} />
            <span>{answered ? 'Isso mesmo!' : 'Quase — olha só:'}</span>
          </div>
          <p>{question.explanation}</p>
          <Button onPress={handleNext} size="md" icon={<Icon name="chevronRight" size={20} />}>
            {isLast ? 'Ver resultado' : 'Próxima'}
          </Button>
        </div>
      )}
    </div>
  );
}
