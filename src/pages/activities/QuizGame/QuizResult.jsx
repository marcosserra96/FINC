import { useState } from 'react'
import BigButton from '../../../components/common/BigButton'
import Confetti from '../../../components/common/Confetti'
import AlphaKeyboard from '../../../components/common/AlphaKeyboard'
import './QuizGame.css'

const MAX_NAME_LENGTH = 14

function getResultMessage(ratio) {
  if (ratio === 1) return 'Perfeito! Você é um especialista em energia! ⚡'
  if (ratio >= 0.7) return 'Muito bem! Você entende bem de consumo consciente! 🎉'
  if (ratio >= 0.4) return 'Bom começo! Continue aprendendo sobre economia de energia. 💡'
  return 'Vale a pena revisar as dicas de economia de energia! 🌱'
}

export default function QuizResult({ score, total, rankingEnabled, onSubmitScore, onRestart }) {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ratio = total > 0 ? score / total : 0

  const handleKeyPress = ({ type, value }) => {
    if (type === 'char') setName((n) => (n.length < MAX_NAME_LENGTH ? n + value : n))
    else if (type === 'space') setName((n) => (n.length < MAX_NAME_LENGTH ? `${n} ` : n))
    else if (type === 'back') setName((n) => n.slice(0, -1))
    else if (type === 'clear') setName('')
  }

  const handleSave = () => {
    if (!name.trim() || submitted) return
    onSubmitScore(name.trim())
    setSubmitted(true)
  }

  return (
    <div className="quiz-result">
      {ratio >= 0.7 && <Confetti />}
      <div className="quiz-result__score">
        {score} / {total}
      </div>
      <p className="quiz-result__message">{getResultMessage(ratio)}</p>

      {rankingEnabled && !submitted && (
        <div className="quiz-result__form">
          <p className="quiz-result__label">Quer entrar no ranking? Digite um apelido:</p>
          <div className="quiz-result__name-display">{name || 'Seu apelido'}</div>
          <AlphaKeyboard value={name} maxLength={MAX_NAME_LENGTH} onKeyPress={handleKeyPress} />
          <BigButton variant="orange" onClick={handleSave} disabled={!name.trim()}>
            Salvar no ranking
          </BigButton>
        </div>
      )}

      {submitted && <p className="quiz-result__saved">Apelido salvo no ranking! 🏆</p>}

      <div className="quiz-result__actions">
        <BigButton variant="primary" onClick={onRestart}>
          Jogar novamente
        </BigButton>
      </div>
    </div>
  )
}
