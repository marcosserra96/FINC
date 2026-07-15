export type ActivityDifficulty = 'facil' | 'medio';

export type ActivityId =
  | 'quiz-relampago'
  | 'memoria-energia'
  | 'organize-habitos'
  | 'casa-eficiente';

export interface ActivityCompletionCriteria {
  /** Proporção mínima de acertos (0 a 1) para considerar a atividade concluída de forma válida. */
  minCorrectRatio: number;
  /** Mínimo de etapas que precisam ser realizadas (evita concluir só abrindo a tela). */
  minStepsCompleted: number;
}

export interface ActivityConfigBase {
  id: ActivityId;
  name: string;
  shortDescription: string;
  instructions: string;
  icon: ActivityIconKey;
  themeColor: string;
  active: boolean;
  order: number;
  estimatedDurationSeconds: number;
  difficulty: ActivityDifficulty;
  completionCriteria: ActivityCompletionCriteria;
  learningMessage: string;
  giftEligible: boolean;
}

export type ActivityIconKey =
  | 'bolt'
  | 'house'
  | 'cards'
  | 'sort';

export interface QuizQuestion {
  id: string;
  prompt: string;
  answer: boolean;
  explanation: string;
  icon: string;
}

export interface QuizActivityConfig extends ActivityConfigBase {
  type: 'quiz';
  questions: QuizQuestion[];
}

export interface MemoryCardPair {
  id: string;
  icon: string;
  label: string;
  tip: string;
}

export interface MemoryActivityConfig extends ActivityConfigBase {
  type: 'memory';
  pairs: MemoryCardPair[];
}

export interface SortItem {
  id: string;
  label: string;
  icon: string;
  category: 'eficiente' | 'desperdicio';
}

export interface SortActivityConfig extends ActivityConfigBase {
  type: 'sort';
  items: SortItem[];
  categoryLabels: { eficiente: string; desperdicio: string };
}

export interface ScenarioOption {
  id: 'a' | 'b';
  label: string;
  icon: string;
  correct: boolean;
}

export interface ScenarioCase {
  id: string;
  situation: string;
  situationIcon: string;
  options: [ScenarioOption, ScenarioOption];
  explanation: string;
}

export interface ScenarioActivityConfig extends ActivityConfigBase {
  type: 'scenario';
  cases: ScenarioCase[];
}

export type ActivityConfig =
  | QuizActivityConfig
  | MemoryActivityConfig
  | SortActivityConfig
  | ScenarioActivityConfig;

export interface ActivityRunResult {
  correct: number;
  incorrect: number;
  stepsCompleted: number;
  totalSteps: number;
  durationMs: number;
}
