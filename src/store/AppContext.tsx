import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import { appReducer, initialState } from './appReducer';
import type { ActivityId, ActivityRunResult, AgeRangeId, AppConfig } from '@/types';
import { loadConfig, saveConfig } from '@/services/configService';
import { getAllActivities, getActivityById } from '@/services/activitiesService';
import { logEvent } from '@/services/metricsService';
import { checkEligibility, releaseGift } from '@/services/prizeService';

interface AppContextValue {
  state: ReturnType<typeof initialState>;
  touch: () => void;
  goToAgeSelect: () => void;
  selectAgeRange: (ageRange: AgeRangeId) => void;
  goToActivitySelect: () => void;
  pickRandomActivity: () => void;
  selectActivity: (id: ActivityId) => void;
  beginActivity: () => void;
  finishActivity: (result: ActivityRunResult) => void;
  proceedAfterResult: () => void;
  acknowledgeGiftInstructions: () => void;
  goToClosing: () => void;
  resetToAttract: () => void;
  reportError: (message: string) => void;
  updateConfig: (config: AppConfig) => void;
  reloadActivities: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, initialState);

  useEffect(() => {
    const config = loadConfig();
    const activities = getAllActivities();
    dispatch({ type: 'CONFIG_LOADED', config, activities });
  }, []);

  useEffect(() => {
    if (state.configLoaded) {
      logEvent({
        type: 'session_start',
        eventName: state.config.eventName,
        appVersion: state.config.appVersion,
        sessionId: state.session.sessionId
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [state.session.sessionId, state.configLoaded]);

  const touch = useCallback(() => dispatch({ type: 'TOUCH' }), []);
  const goToAgeSelect = useCallback(() => dispatch({ type: 'GO_TO_AGE_SELECT' }), []);
  const goToActivitySelect = useCallback(() => dispatch({ type: 'GO_TO_ACTIVITY_SELECT' }), []);

  const selectActivity = useCallback((id: ActivityId) => {
    dispatch({ type: 'SELECT_ACTIVITY', activityId: id });
  }, []);

  const pickRandomActivity = useCallback(() => {
    const active = state.activities.filter((a) => a.active);
    if (active.length === 0) return;
    const pick = active[Math.floor(Math.random() * active.length)];
    selectActivity(pick.id);
  }, [state.activities, selectActivity]);

  // Registra a faixa etária e então segue a mesma decisão que a Atração
  // fazia sozinha ao ser tocada: sorteia, pega a ordem fixa, ou mostra a
  // seleção — sem exigir nenhum toque extra além da escolha da faixa.
  const selectAgeRange = useCallback(
    (ageRange: AgeRangeId) => {
      dispatch({ type: 'SELECT_AGE_RANGE', ageRange });
      logEvent({
        type: 'age_selected',
        eventName: state.config.eventName,
        appVersion: state.config.appVersion,
        sessionId: state.session.sessionId,
        ageRange
      });

      const mode = state.config.activitySelectionMode;
      if (mode === 'random') {
        pickRandomActivity();
        return;
      }
      if (mode === 'fixedOrder') {
        const active = state.activities.filter((a) => a.active).sort((a, b) => a.order - b.order);
        if (active[0]) selectActivity(active[0].id);
        return;
      }
      goToActivitySelect();
    },
    [state.config, state.activities, state.session.sessionId, pickRandomActivity, selectActivity, goToActivitySelect]
  );

  // Chamado pela tela de "prepare-se" sozinha, depois de um instante — o
  // visitante não precisa tocar em nada pra isso acontecer.
  const beginActivity = useCallback(() => {
    dispatch({ type: 'BEGIN_ACTIVITY' });
    if (state.session.activityId) {
      logEvent({
        type: 'activity_start',
        eventName: state.config.eventName,
        appVersion: state.config.appVersion,
        sessionId: state.session.sessionId,
        activityId: state.session.activityId
      });
    }
  }, [state.session.activityId, state.session.sessionId, state.config]);

  const finishActivity = useCallback(
    (result: ActivityRunResult) => {
      dispatch({ type: 'FINISH_ACTIVITY', result });
      const activityId = state.session.activityId;
      if (!activityId) return;
      const activity = getActivityById(activityId);
      const passed =
        activity != null &&
        result.stepsCompleted >= activity.completionCriteria.minStepsCompleted &&
        (result.correct / Math.max(1, result.correct + result.incorrect)) >= activity.completionCriteria.minCorrectRatio;

      logEvent({
        type: passed ? 'activity_complete' : 'activity_abandon',
        eventName: state.config.eventName,
        appVersion: state.config.appVersion,
        sessionId: state.session.sessionId,
        activityId,
        durationMs: result.durationMs,
        correct: result.correct,
        incorrect: result.incorrect
      });
    },
    [state.session.activityId, state.session.sessionId, state.config]
  );

  const proceedAfterResult = useCallback(() => {
    const activityId = state.session.activityId;
    const { passed } = state.session;
    if (!activityId || passed === null) {
      dispatch({ type: 'GO_TO_CLOSING' });
      return;
    }
    const activity = getActivityById(activityId);

    if (!passed || !activity?.giftEligible || !state.config.giftConfig.enabled) {
      dispatch({ type: 'GO_TO_CLOSING' });
      return;
    }

    const eligibility = checkEligibility(state.config.giftConfig);
    if (!eligibility.eligible) {
      dispatch({ type: 'GO_TO_NO_GIFTS' });
      return;
    }

    const record = releaseGift(state.session.sessionId, activityId, state.config.giftConfig);
    logEvent({
      type: 'gift_released',
      eventName: state.config.eventName,
      appVersion: state.config.appVersion,
      sessionId: state.session.sessionId,
      activityId
    });

    const updatedConfig: AppConfig = {
      ...state.config,
      giftConfig: { ...state.config.giftConfig, remaining: Math.max(0, state.config.giftConfig.remaining - 1) }
    };
    saveConfig(updatedConfig);
    dispatch({ type: 'CONFIG_UPDATED', config: updatedConfig });

    dispatch({ type: 'GO_TO_COMPLETION', giftCode: record.code, expiresAt: record.expiresAt });
  }, [state.session, state.config]);

  const acknowledgeGiftInstructions = useCallback(() => {
    dispatch({ type: 'GO_TO_GIFT_INSTRUCTIONS' });
  }, []);

  const goToClosing = useCallback(() => {
    dispatch({ type: 'GO_TO_CLOSING' });
  }, []);

  const resetToAttract = useCallback(() => {
    dispatch({ type: 'RESET_TO_ATTRACT' });
  }, []);

  const reportError = useCallback((message: string) => {
    dispatch({ type: 'ERROR', message });
  }, []);

  const updateConfig = useCallback((config: AppConfig) => {
    saveConfig(config);
    dispatch({ type: 'CONFIG_UPDATED', config });
  }, []);

  const reloadActivities = useCallback(() => {
    dispatch({ type: 'ACTIVITIES_UPDATED', activities: getAllActivities() });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      touch,
      goToAgeSelect,
      selectAgeRange,
      goToActivitySelect,
      pickRandomActivity,
      selectActivity,
      beginActivity,
      finishActivity,
      proceedAfterResult,
      acknowledgeGiftInstructions,
      goToClosing,
      resetToAttract,
      reportError,
      updateConfig,
      reloadActivities
    }),
    [
      state,
      touch,
      goToAgeSelect,
      selectAgeRange,
      goToActivitySelect,
      pickRandomActivity,
      selectActivity,
      beginActivity,
      finishActivity,
      proceedAfterResult,
      acknowledgeGiftInstructions,
      goToClosing,
      resetToAttract,
      reportError,
      updateConfig,
      reloadActivities
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa ser usado dentro de <AppProvider>');
  return ctx;
}
