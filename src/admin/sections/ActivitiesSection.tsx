import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { Toggle, NumberInput } from '../components/FormControls';
import { useApp } from '@/store/AppContext';
import { updateActivityOverride } from '@/services/activitiesService';
import type { ActivityId } from '@/types';
import './section.css';

export function ActivitiesSection() {
  const { state, reloadActivities } = useApp();
  const activities = [...state.activities].sort((a, b) => a.order - b.order);

  const patch = (id: ActivityId, changes: Parameters<typeof updateActivityOverride>[1]) => {
    updateActivityOverride(id, changes);
    reloadActivities();
  };

  const move = (id: ActivityId, dir: -1 | 1) => {
    const index = activities.findIndex((a) => a.id === id);
    const swapIndex = index + dir;
    if (swapIndex < 0 || swapIndex >= activities.length) return;
    const a = activities[index];
    const b = activities[swapIndex];
    patch(a.id, { order: b.order });
    patch(b.id, { order: a.order });
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Atividades</h1>
        <p>Ative, ordene e ajuste os critérios de conclusão de cada atividade.</p>
      </div>

      {activities.map((activity, i) => (
        <div className="admin-card" key={activity.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: activity.themeColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={activity.icon as IconName} size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>{activity.name}</h2>
              <span style={{ color: 'var(--text-on-light-muted)', fontSize: 'var(--fs-small)' }}>{activity.shortDescription}</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="admin-btn admin-btn--neutral" type="button" onClick={() => move(activity.id, -1)} disabled={i === 0}>
                <Icon name="chevronLeft" size={16} />
              </button>
              <button className="admin-btn admin-btn--neutral" type="button" onClick={() => move(activity.id, 1)} disabled={i === activities.length - 1}>
                <Icon name="chevronRight" size={16} />
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-row__label"><span>Ativa</span></div>
            <div className="form-row__control">
              <Toggle checked={activity.active} onChange={(v) => patch(activity.id, { active: v })} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-row__label"><span>Duração estimada</span></div>
            <div className="form-row__control">
              <NumberInput
                value={activity.estimatedDurationSeconds}
                min={20}
                max={240}
                step={5}
                suffix="segundos"
                onChange={(v) => patch(activity.id, { estimatedDurationSeconds: v })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-row__label"><span>Acerto mínimo para concluir</span></div>
            <div className="form-row__control">
              <NumberInput
                value={Math.round(activity.completionCriteria.minCorrectRatio * 100)}
                min={0}
                max={100}
                step={5}
                suffix="%"
                onChange={(v) =>
                  patch(activity.id, {
                    completionCriteria: { ...activity.completionCriteria, minCorrectRatio: v / 100 }
                  })
                }
              />
            </div>
          </div>

          <div className="form-row" style={{ borderBottom: 'none' }}>
            <div className="form-row__label"><span>Etapas mínimas realizadas</span></div>
            <div className="form-row__control">
              <NumberInput
                value={activity.completionCriteria.minStepsCompleted}
                min={1}
                max={20}
                onChange={(v) =>
                  patch(activity.id, {
                    completionCriteria: { ...activity.completionCriteria, minStepsCompleted: v }
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
