import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DEFAULT_CONFIG, mergeWithDefaultConfig } from '../data/defaultConfig';
import { DEFAULT_QUIZ_QUESTIONS } from '../data/quizQuestions';
import {
  STORAGE_KEYS,
  loadJSON,
  loadSessionFlag,
  removeKey,
  saveJSON,
  saveSessionFlag,
} from '../utils/storage';

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
  const [config, setConfigState] = useState(() =>
    mergeWithDefaultConfig(loadJSON(STORAGE_KEYS.CONFIG, DEFAULT_CONFIG))
  );
  const [quizQuestions, setQuizQuestionsState] = useState(() =>
    loadJSON(STORAGE_KEYS.QUIZ, DEFAULT_QUIZ_QUESTIONS)
  );
  const [ranking, setRankingState] = useState(() => loadJSON(STORAGE_KEYS.RANKING, []));
  const [isAdminAuthed, setIsAdminAuthed] = useState(() =>
    loadSessionFlag(STORAGE_KEYS.ADMIN_AUTHED)
  );

  const updateConfig = useCallback((partial) => {
    setConfigState((prev) => {
      const next = mergeWithDefaultConfig({ ...prev, ...partial });
      saveJSON(STORAGE_KEYS.CONFIG, next);
      return next;
    });
  }, []);

  const updateQuizQuestions = useCallback((questions) => {
    setQuizQuestionsState(questions);
    saveJSON(STORAGE_KEYS.QUIZ, questions);
  }, []);

  const addRankingEntry = useCallback((name, score, total) => {
    setRankingState((prev) => {
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: name.trim().slice(0, 14) || 'Visitante',
        score,
        total,
        date: new Date().toISOString(),
      };
      const next = [...prev, entry]
        .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
        .slice(0, 50);
      saveJSON(STORAGE_KEYS.RANKING, next);
      return next;
    });
  }, []);

  const clearRanking = useCallback(() => {
    setRankingState([]);
    saveJSON(STORAGE_KEYS.RANKING, []);
  }, []);

  const resetConfigAndQuiz = useCallback(() => {
    setConfigState({ ...DEFAULT_CONFIG });
    setQuizQuestionsState(DEFAULT_QUIZ_QUESTIONS);
    saveJSON(STORAGE_KEYS.CONFIG, DEFAULT_CONFIG);
    saveJSON(STORAGE_KEYS.QUIZ, DEFAULT_QUIZ_QUESTIONS);
  }, []);

  const loginAdmin = useCallback(
    (pin) => {
      const ok = pin === config.adminPin;
      if (ok) {
        setIsAdminAuthed(true);
        saveSessionFlag(STORAGE_KEYS.ADMIN_AUTHED, true);
      }
      return ok;
    },
    [config.adminPin]
  );

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthed(false);
    removeKey(STORAGE_KEYS.ADMIN_AUTHED);
  }, []);

  const value = useMemo(
    () => ({
      config,
      updateConfig,
      quizQuestions,
      updateQuizQuestions,
      ranking,
      addRankingEntry,
      clearRanking,
      resetConfigAndQuiz,
      isAdminAuthed,
      loginAdmin,
      logoutAdmin,
    }),
    [
      config,
      updateConfig,
      quizQuestions,
      updateQuizQuestions,
      ranking,
      addRankingEntry,
      clearRanking,
      resetConfigAndQuiz,
      isAdminAuthed,
      loginAdmin,
      logoutAdmin,
    ]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig deve ser usado dentro de um ConfigProvider');
  return ctx;
}
