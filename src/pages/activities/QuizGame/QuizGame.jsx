import { useState } from 'react'
import ScreenShell from '../../../components/common/ScreenShell'
import { useConfig } from '../../../context/ConfigContext'
import { shuffleArray } from '../../../utils/shuffle'
import QuizQuestionCard from './QuizQuestionCard'
import QuizResult from './QuizResult'
import './QuizGame.css'

export default function QuizGame() {
  const { quizQuestions, config, addRankingEntry } = useConfig()

  const [sessionQuestions, setSessionQuestions] = useState(() => shuffleArray(quizQuestions))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = sessionQuestions.length
  const currentQuestion = sessionQuestions[currentIndex]

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === currentQuestion.correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      setFinished(true)
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelected(null)
    setAnswered(false)
  }

  const handleRestart = () => {
    setSessionQuestions(shuffleArray(quizQuestions))
    setCurrentIndex(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
  }

  return (
    <ScreenShell className="quiz-screen">
      {!finished && currentQuestion && (
        <div className="quiz-screen__body">
          <QuizQuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={total}
            selected={selected}
            answered={answered}
            onSelect={handleSelect}
          />
          {answered && (
            <button type="button" className="quiz-next-button" onClick={handleNext}>
              {currentIndex + 1 >= total ? 'Ver resultado' : 'Próxima pergunta'}
            </button>
          )}
        </div>
      )}

      {finished && (
        <div className="quiz-screen__body">
          <QuizResult
            score={score}
            total={total}
            rankingEnabled={config.rankingEnabled}
            onSubmitScore={(name) => addRankingEntry(name, score, total)}
            onRestart={handleRestart}
          />
        </div>
      )}
    </ScreenShell>
  )
}
