import { useEffect, useState } from 'react';
import { ScreenShell } from '../components/ScreenShell';
import { RestartCorner } from '../components/RestartCorner';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { CountdownRing } from '@/components/ui/CountdownRing';
import { useApp } from '@/store/AppContext';
import { QuizActivity } from '@/activities/components/QuizActivity';
import { MemoryActivity } from '@/activities/components/MemoryActivity';
import { SortActivity } from '@/activities/components/SortActivity';
import { ScenarioActivity } from '@/activities/components/ScenarioActivity';
import type { ActivityRunResult } from '@/types';
import './ActivityRunnerScreen.css';

export function ActivityRunnerScreen() {
  const { state, finishActivity, activityTimeUp } = useApp();
  const activity = state.activities.find((a) => a.id === state.session.activityId);
  const limitSeconds = state.config.activityTimeLimitSeconds;
  const startedAt = state.session.activityStartedAt;
  const [secondsLeft, setSecondsLeft] = useState(limitSeconds);

  useEffect(() => {
    if (!startedAt) return;
    const tick = () => Math.max(0, limitSeconds - Math.floor((Date.now() - startedAt) / 1000));
    setSecondsLeft(tick());
    const id = window.setInterval(() => {
      const left = tick();
      setSecondsLeft(left);
      if (left <= 0) {
        window.clearInterval(id);
        activityTimeUp();
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [startedAt, limitSeconds, activityTimeUp]);

  if (!activity) return null;

  const handleComplete = (result: ActivityRunResult) => finishActivity(result);

  return (
    <ScreenShell>
      <RestartCorner />
      <div className="activity-runner">
        <div className="activity-runner__header">
          <span className="activity-runner__header-icon" style={{ background: activity.themeColor }}>
            <Icon name={activity.icon as IconName} size={18} />
          </span>
          <div className="activity-runner__info">
            <strong>{activity.name}</strong>
            <span>{activity.instructions}</span>
          </div>
          <div className="activity-runner__timer" aria-hidden="true">
            <CountdownRing secondsLeft={secondsLeft} totalSeconds={limitSeconds} size={40} />
          </div>
        </div>

        {activity.type === 'quiz' && <QuizActivity activity={activity} onComplete={handleComplete} />}
        {activity.type === 'memory' && <MemoryActivity activity={activity} onComplete={handleComplete} />}
        {activity.type === 'sort' && <SortActivity activity={activity} onComplete={handleComplete} />}
        {activity.type === 'scenario' && <ScenarioActivity activity={activity} onComplete={handleComplete} />}
      </div>
    </ScreenShell>
  );
}
