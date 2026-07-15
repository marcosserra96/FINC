import { ScreenShell } from '../components/ScreenShell';
import { RestartCorner } from '../components/RestartCorner';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import { QuizActivity } from '@/activities/components/QuizActivity';
import { MemoryActivity } from '@/activities/components/MemoryActivity';
import { SortActivity } from '@/activities/components/SortActivity';
import { ScenarioActivity } from '@/activities/components/ScenarioActivity';
import type { ActivityRunResult } from '@/types';
import './ActivityRunnerScreen.css';

export function ActivityRunnerScreen() {
  const { state, finishActivity } = useApp();
  const activity = state.activities.find((a) => a.id === state.session.activityId);

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
          <div>
            <strong>{activity.name}</strong>
            <span>{activity.instructions}</span>
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
