import { ScreenShell } from '../components/ScreenShell';
import { RestartCorner } from '../components/RestartCorner';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './ActivitySelectScreen.css';

// Abaixo de 90s continua em segundos (mesmo padrão já usado, ex: "~75s"),
// pois é o que dá pra estimar; a partir daí vira minutos — "~150s" pra 10
// perguntas do Quiz seria mais difícil de "sentir" de relance do que "~3min".
function formatDuration(seconds: number): string {
  const rounded = Math.round(seconds / 15) * 15;
  if (rounded < 90) return `~${rounded}s`;
  return `~${Math.round(rounded / 60)}min`;
}

export function ActivitySelectScreen() {
  const { state, selectActivity } = useApp();
  const activities = state.activities.filter((a) => a.active).sort((a, b) => a.order - b.order);

  return (
    <ScreenShell>
      <RestartCorner />
      <div className="activity-select">
        <h1 className="activity-select__title anim-slide-up">{state.config.texts.activitySelectTitle}</h1>
        <div className="activity-select__grid">
          {activities.map((activity, i) => (
            <Card
              key={activity.id}
              onPress={() => selectActivity(activity.id)}
              accentColor={activity.themeColor}
              className="activity-select__card anim-slide-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="activity-select__icon" style={{ background: activity.themeColor }}>
                <Icon name={activity.icon as IconName} size={34} />
              </div>
              <h2 className="activity-select__name">{activity.name}</h2>
              <p className="activity-select__desc">{activity.shortDescription}</p>
              <div className="activity-select__meta">
                <Icon name="clock" size={16} />
                <span>{formatDuration(activity.estimatedDurationSeconds)}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
