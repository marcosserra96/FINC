import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/store/AppContext';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { AttractScreen } from './screens/AttractScreen';
import { AgeSelectScreen } from './screens/AgeSelectScreen';
import { ActivitySelectScreen } from './screens/ActivitySelectScreen';
import { ActivityPrepareScreen } from './screens/ActivityPrepareScreen';
import { ActivityRunnerScreen } from './screens/ActivityRunnerScreen';
import { TimeUpScreen } from './screens/TimeUpScreen';
import { ResultScreen } from './screens/ResultScreen';
import { ClosingScreen } from './screens/ClosingScreen';
import { ErrorScreen } from './screens/ErrorScreen';

export function PublicApp() {
  useIdleTimer();
  const { state } = useApp();
  const { screen } = state.session;

  return (
    <AnimatePresence mode="wait">
      {screen === 'attract' && <AttractScreen key="attract" />}
      {screen === 'ageSelect' && <AgeSelectScreen key="age" />}
      {screen === 'activitySelect' && <ActivitySelectScreen key="select" />}
      {screen === 'activityPrepare' && <ActivityPrepareScreen key="prepare" />}
      {screen === 'activityRunning' && <ActivityRunnerScreen key="running" />}
      {screen === 'timeUp' && <TimeUpScreen key="timeup" />}
      {screen === 'result' && <ResultScreen key="result" />}
      {screen === 'closing' && <ClosingScreen key="closing" />}
      {screen === 'error' && <ErrorScreen key="error" />}
    </AnimatePresence>
  );
}
