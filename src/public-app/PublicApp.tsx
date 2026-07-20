import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/store/AppContext';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { AttractScreen } from './screens/AttractScreen';
import { AgeSelectScreen } from './screens/AgeSelectScreen';
import { ActivitySelectScreen } from './screens/ActivitySelectScreen';
import { ActivityPrepareScreen } from './screens/ActivityPrepareScreen';
import { ActivityRunnerScreen } from './screens/ActivityRunnerScreen';
import { ResultScreen } from './screens/ResultScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { GiftInstructionsScreen } from './screens/GiftInstructionsScreen';
import { NoGiftsScreen } from './screens/NoGiftsScreen';
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
      {screen === 'result' && <ResultScreen key="result" />}
      {screen === 'completion' && <CompletionScreen key="completion" />}
      {screen === 'giftInstructions' && <GiftInstructionsScreen key="gift" />}
      {screen === 'noGifts' && <NoGiftsScreen key="nogifts" />}
      {screen === 'closing' && <ClosingScreen key="closing" />}
      {screen === 'error' && <ErrorScreen key="error" />}
    </AnimatePresence>
  );
}
