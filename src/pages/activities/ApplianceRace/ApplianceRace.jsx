import { useMemo, useState } from 'react'
import ScreenShell from '../../../components/common/ScreenShell'
import FeedbackOverlay from '../../../components/common/FeedbackOverlay'
import BigButton from '../../../components/common/BigButton'
import { APPLIANCES } from '../../../data/applianceData'
import { shuffleArray } from '../../../utils/shuffle'
import './ApplianceRace.css'

const ROUND_COUNT = 6

function generateRounds() {
  const rounds = []
  const usedPairs = new Set()
  let guard = 0
  while (rounds.length < ROUND_COUNT && guard < 200) {
    guard += 1
    const [a, b] = shuffleArray(APPLIANCES)
    const key = [a.id, b.id].sort().join('-')
    if (a.id !== b.id && !usedPairs.has(key)) {
      usedPairs.add(key)
      rounds.push({ a, b })
    }
  }
  return rounds
}

export default function ApplianceRace() {
  const [rounds, setRounds] = useState(generateRounds)
  const [roundIndex, setRoundIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [finished, setFinished] = useState(false)

  const ranking = useMemo(() => [...APPLIANCES].sort((x, y) => y.kwhMonth - x.kwhMonth), [])

  const round = rounds[roundIndex]

  const handleChoice = (chosen, other) => {
    if (feedback) return
    const isCorrect = chosen.kwhMonth > other.kwhMonth
    if (isCorrect) setCorrectCount((c) => c + 1)
    setFeedback({
      isCorrect,
      title: isCorrect ? 'Isso mesmo!' : 'Não foi dessa vez',
      message: `${chosen.name}: ${chosen.kwhMonth} kWh/mês · ${other.name}: ${other.kwhMonth} kWh/mês. ${
        (chosen.kwhMonth > other.kwhMonth ? chosen : other).tip
      }`,
    })
  }

  const handleContinue = () => {
    setFeedback(null)
    if (roundIndex + 1 >= rounds.length) {
      setFinished(true)
      return
    }
    setRoundIndex((i) => i + 1)
  }

  const handleRestart = () => {
    setRounds(generateRounds())
    setRoundIndex(0)
    setCorrectCount(0)
    setFeedback(null)
    setFinished(false)
  }

  return (
    <ScreenShell className="appliance-screen">
      {!finished && round && (
        <div className="appliance-screen__body">
          <h1 className="appliance-screen__title">O Que Mais Consome Energia?</h1>
          <p className="appliance-screen__subtitle">
            Toque no aparelho que você acha que gasta mais energia por mês · Rodada {roundIndex + 1} de{' '}
            {rounds.length}
          </p>

          <div className="appliance-duel">
            <button type="button" className="appliance-card" onClick={() => handleChoice(round.a, round.b)}>
              <span className="appliance-card__icon">{round.a.icon}</span>
              <span className="appliance-card__name">{round.a.name}</span>
            </button>
            <span className="appliance-duel__vs">VS</span>
            <button type="button" className="appliance-card" onClick={() => handleChoice(round.b, round.a)}>
              <span className="appliance-card__icon">{round.b.icon}</span>
              <span className="appliance-card__name">{round.b.name}</span>
            </button>
          </div>
        </div>
      )}

      {finished && (
        <div className="appliance-screen__body">
          <h1 className="appliance-screen__title">Resultado</h1>
          <p className="appliance-screen__subtitle">
            Você acertou {correctCount} de {rounds.length} comparações!
          </p>

          <div className="appliance-ranking">
            {ranking.map((item, idx) => (
              <div key={item.id} className="appliance-ranking__row">
                <span className="appliance-ranking__position">{idx + 1}º</span>
                <span className="appliance-ranking__icon">{item.icon}</span>
                <span className="appliance-ranking__name">{item.name}</span>
                <span className="appliance-ranking__value">{item.kwhMonth} kWh/mês</span>
              </div>
            ))}
          </div>
          <p className="appliance-screen__note">Valores médios ilustrativos, apenas para fins educativos.</p>

          <BigButton variant="primary" onClick={handleRestart}>
            Jogar novamente
          </BigButton>
        </div>
      )}

      {feedback && (
        <FeedbackOverlay
          status={feedback.isCorrect ? 'correct' : 'wrong'}
          title={feedback.title}
          message={feedback.message}
          onContinue={handleContinue}
        />
      )}
    </ScreenShell>
  )
}
