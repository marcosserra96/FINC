import './EfficiencyGauge.css'

const GRADES = [
  { letter: 'A', color: '#2fa66a', width: '58%' },
  { letter: 'B', color: '#8bc34a', width: '70%' },
  { letter: 'C', color: '#f4c430', width: '82%' },
  { letter: 'D', color: '#f37021', width: '94%' },
  { letter: 'E', color: '#e0453c', width: '100%' },
]

export function getGrade(ratio) {
  if (ratio >= 0.85) return GRADES[0]
  if (ratio >= 0.65) return GRADES[1]
  if (ratio >= 0.45) return GRADES[2]
  if (ratio >= 0.25) return GRADES[3]
  return GRADES[4]
}

export default function EfficiencyGauge({ ratio, label, compact = false }) {
  const grade = getGrade(ratio)

  if (compact) {
    return (
      <div className="efficiency-gauge efficiency-gauge--compact">
        <div className="efficiency-gauge__badge efficiency-gauge__badge--sm" style={{ background: grade.color }}>
          {grade.letter}
        </div>
        {label && <p className="efficiency-gauge__label">{label}</p>}
      </div>
    )
  }

  return (
    <div className="efficiency-gauge">
      <div className="efficiency-gauge__bars">
        {GRADES.map((g) => (
          <div
            key={g.letter}
            className={`efficiency-gauge__bar ${g.letter === grade.letter ? 'is-active' : ''}`}
            style={{ width: g.width, background: g.color }}
          >
            <span className="efficiency-gauge__bar-letter">{g.letter}</span>
          </div>
        ))}
      </div>
      <div className="efficiency-gauge__badge" style={{ background: grade.color }}>
        {grade.letter}
      </div>
      {label && <p className="efficiency-gauge__label">{label}</p>}
    </div>
  )
}
