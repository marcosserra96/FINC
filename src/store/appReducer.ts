import type { ActivityConfig, ActivityId, ActivityRunResult, AgeRangeId, AppConfig, SessionState } from '@/types';
import { createEmptySession } from '@/types';
import { generateSessionId } from '@/services/idGenerator';

export interface AppState {
  config: AppConfig;
  activities: ActivityConfig[];
  session: SessionState;
  configLoaded: boolean;
}

export type AppAction =
  | { type: 'CONFIG_LOADED'; config: AppConfig; activities: ActivityConfig[] }
  | { type: 'CONFIG_UPDATED'; config: AppConfig }
  | { type: 'ACTIVITIES_UPDATED'; activities: ActivityConfig[] }
  | { type: 'TOUCH' }
  | { type: 'GO_TO_AGE_SELECT' }
  | { type: 'SELECT_AGE_RANGE'; ageRange: AgeRangeId }
  | { type: 'GO_TO_ACTIVITY_SELECT' }
  | { type: 'SELECT_ACTIVITY'; activityId: ActivityId }
  | { type: 'BEGIN_ACTIVITY' }
  | { type: 'FINISH_ACTIVITY'; result: ActivityRunResult }
  | { type: 'ACTIVITY_TIME_UP' }
  | { type: 'GO_TO_COMPLETION'; giftCode: string; expiresAt: number }
  | { type: 'GO_TO_NO_GIFTS' }
  | { type: 'GO_TO_GIFT_INSTRUCTIONS' }
  | { type: 'GO_TO_CLOSING' }
  | { type: 'RESET_TO_ATTRACT' }
  | { type: 'ERROR'; message: string };

export function initialState(): AppState {
  return {
    config: null as unknown as AppConfig,
    activities: [],
    session: createEmptySession(generateSessionId()),
    configLoaded: false
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CONFIG_LOADED':
      return { ...state, config: action.config, activities: action.activities, configLoaded: true };

    case 'CONFIG_UPDATED':
      return { ...state, config: action.config };

    case 'ACTIVITIES_UPDATED':
      return { ...state, activities: action.activities };

    case 'TOUCH':
      return { ...state, session: { ...state.session, lastInteractionAt: Date.now() } };

    case 'GO_TO_AGE_SELECT':
      return { ...state, session: { ...state.session, screen: 'ageSelect', lastInteractionAt: Date.now() } };

    case 'SELECT_AGE_RANGE':
      return { ...state, session: { ...state.session, ageRange: action.ageRange, lastInteractionAt: Date.now() } };

    case 'GO_TO_ACTIVITY_SELECT':
      return { ...state, session: { ...state.session, screen: 'activitySelect', lastInteractionAt: Date.now() } };

    case 'SELECT_ACTIVITY':
      // Escolher a atividade leva direto pro "prepare-se", que avança
      // sozinho pro jogo — nenhum toque extra é exigido.
      return {
        ...state,
        session: {
          ...state.session,
          screen: 'activityPrepare',
          activityId: action.activityId,
          lastInteractionAt: Date.now()
        }
      };

    case 'BEGIN_ACTIVITY':
      return {
        ...state,
        session: {
          ...state.session,
          screen: 'activityRunning',
          activityStartedAt: Date.now(),
          lastInteractionAt: Date.now()
        }
      };

    case 'FINISH_ACTIVITY': {
      const activity = state.activities.find((a) => a.id === state.session.activityId);
      const { result } = action;
      const ratio = result.correct / Math.max(1, result.correct + result.incorrect);
      const passed = Boolean(
        activity &&
          result.stepsCompleted >= activity.completionCriteria.minStepsCompleted &&
          ratio >= activity.completionCriteria.minCorrectRatio
      );
      return {
        ...state,
        session: {
          ...state.session,
          screen: 'result',
          result,
          passed,
          lastInteractionAt: Date.now()
        }
      };
    }

    case 'ACTIVITY_TIME_UP':
      return { ...state, session: { ...state.session, screen: 'timeUp', lastInteractionAt: Date.now() } };

    case 'GO_TO_COMPLETION':
      return {
        ...state,
        session: {
          ...state.session,
          screen: 'completion',
          giftCode: action.giftCode,
          giftCodeExpiresAt: action.expiresAt,
          lastInteractionAt: Date.now()
        }
      };

    case 'GO_TO_GIFT_INSTRUCTIONS':
      return { ...state, session: { ...state.session, screen: 'giftInstructions', lastInteractionAt: Date.now() } };

    case 'GO_TO_NO_GIFTS':
      return { ...state, session: { ...state.session, screen: 'noGifts', lastInteractionAt: Date.now() } };

    case 'GO_TO_CLOSING':
      return { ...state, session: { ...state.session, screen: 'closing', lastInteractionAt: Date.now() } };

    case 'RESET_TO_ATTRACT':
      return { ...state, session: createEmptySession(generateSessionId()) };

    case 'ERROR':
      return {
        ...state,
        session: { ...state.session, screen: 'error', errorMessage: action.message, lastInteractionAt: Date.now() }
      };

    default:
      return state;
  }
}
