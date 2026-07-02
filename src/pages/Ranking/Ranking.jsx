import { useConfig } from '../../context/ConfigContext'
import ScreenShell from '../../components/common/ScreenShell'
import Icon from '../../components/common/Icon'
import './Ranking.css'

export default function Ranking() {
  const { config, ranking } = useConfig()
  const top = [...ranking].sort((a, b) => b.score - a.score || new Date(a.date) - new Date(b.date)).slice(0, 10)

  return (
    <ScreenShell className="ranking-screen">
      <h1 className="ranking-screen__title">
        <Icon name="trophy" size={40} /> Ranking do Quiz
      </h1>

      {!config.rankingEnabled && (
        <p className="ranking-screen__empty">O ranking está desativado no momento.</p>
      )}

      {config.rankingEnabled && top.length === 0 && (
        <p className="ranking-screen__empty">Ainda não há pontuações registradas. Jogue o quiz e seja o primeiro!</p>
      )}

      {config.rankingEnabled && top.length > 0 && (
        <div className="ranking-list">
          {top.map((entry, idx) => (
            <div key={entry.id} className={`ranking-list__row ${idx < 3 ? 'ranking-list__row--top' : ''}`}>
              <span className="ranking-list__position">{idx + 1}º</span>
              <span className="ranking-list__name">{entry.name}</span>
              <span className="ranking-list__score">
                {entry.score}/{entry.total}
              </span>
            </div>
          ))}
        </div>
      )}
    </ScreenShell>
  )
}
