import { useState } from 'react'
import ScreenShell from '../../../components/common/ScreenShell'
import FeedbackOverlay from '../../../components/common/FeedbackOverlay'
import Confetti from '../../../components/common/Confetti'
import BigButton from '../../../components/common/BigButton'
import EfficiencyGauge from '../../../components/common/EfficiencyGauge'
import Icon from '../../../components/common/Icon'
import { HOUSE_CHOICES } from '../../../data/houseChoicesData'
import { shuffleArray } from '../../../utils/shuffle'
import './EfficientHouse.css'

function buildRounds() {
  return shuffleArray(HOUSE_CHOICES).map((round) => ({
    ...round,
    options: shuffleArray(round.options),
  }))
}

export default function EfficientHouse() {
  const [rounds, setRounds] = useState(buildRounds)
  const [roundIndex, setRoundIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [finished, setFinished] = useState(false)

  const round = rounds[roundIndex]
  const ratio = rounds.length ? correctCount / rounds.length : 0

  const handleChoice = (chosen) => {
    if (feedback) return
    if (chosen.efficient) setCorrectCount((c) => c + 1)
    setFeedback({
      isCorrect: chosen.efficient,
      title: chosen.efficient ? 'Boa escolha!' : 'Não foi dessa vez',
      message: (chosen.efficient ? chosen : round.options.find((o) => o.efficient)).tip,
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
    setRounds(buildRounds())
    setRoundIndex(0)
    setCorrectCount(0)
    setFeedback(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <ScreenShell className="house-screen house-screen--result">
        {ratio >= 0.7 && <Confetti />}
        <h1 className="house-screen__title">Casa Eficiente</h1>
        <p className="house-screen__subtitle">
          Você fez {correctCount} de {rounds.length} escolhas eficientes. Veja o selo da sua casa:
        </p>
        <EfficiencyGauge ratio={ratio} label="Parabéns por deixar a casa mais eficiente!" />
        <BigButton variant="primary" onClick={handleRestart}>
          Jogar novamente
        </BigButton>
      </ScreenShell>
    )
  }

  return (
    <ScreenShell className="house-screen">
      <div className="house-screen__body">
        <h1 className="house-screen__title">Vamos montar uma casa eficiente?</h1>
        <p className="house-screen__subtitle">
          {round.question} · Etapa {roundIndex + 1} de {rounds.length}
        </p>

        <div className="house-choices">
          {round.options.map((option, idx) => (
            <button
              key={idx}
              type="button"
              className="house-choice-card"
              onClick={() => handleChoice(option)}
            >
              <span className="house-choice-card__icon">
                <Icon name={option.icon} size={56} />
              </span>
              <span className="house-choice-card__text">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

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
