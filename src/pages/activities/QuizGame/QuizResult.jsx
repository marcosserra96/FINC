import { useState } from 'react'
import BigButton from '../../../components/common/BigButton'
import Confetti from '../../../components/common/Confetti'
import './QuizGame.css'

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

  const handleSubmit = (event) => {
    event.preventDefault()
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
        <form className="quiz-result__form" onSubmit={handleSubmit}>
          <label htmlFor="nickname" className="quiz-result__label">
            Quer entrar no ranking? Digite um apelido:
          </label>
          <input
            id="nickname"
            className="quiz-result__input"
            type="text"
            maxLength={14}
            placeholder="Seu apelido"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <BigButton type="submit" variant="orange" disabled={!name.trim()}>
            Salvar no ranking
          </BigButton>
        </form>
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
