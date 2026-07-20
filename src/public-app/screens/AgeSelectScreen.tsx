import { ScreenShell } from '../components/ScreenShell';
import { RestartCorner } from '../components/RestartCorner';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { AGE_RANGES } from '@/data/ageRanges';
import { useApp } from '@/store/AppContext';
import './AgeSelectScreen.css';

export function AgeSelectScreen() {
  const { state, selectAgeRange } = useApp();

  return (
    <ScreenShell>
      <RestartCorner />
      <div className="age-select">
        <h1 className="age-select__title anim-slide-up">{state.config.texts.ageSelectTitle}</h1>
        <div className="age-select__grid">
          {AGE_RANGES.map((option, i) => (
            <Card
              key={option.id}
              onPress={() => selectAgeRange(option.id)}
              accentColor={option.accentColor}
              className="age-select__card anim-slide-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="age-select__icon" style={{ background: option.accentColor }}>
                <Icon name="person" size={30} />
              </div>
              <h2 className="age-select__label">{option.label}</h2>
              <p className="age-select__range">{option.range}</p>
            </Card>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
