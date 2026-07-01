import './QuizGame.css'

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

export default function QuizQuestionCard({ question, index, total, selected, answered, onSelect }) {
  return (
    <div className="quiz-card">
      <div className="quiz-card__progress">
        Pergunta {index + 1} de {total}
      </div>
      <h2 className="quiz-card__question">{question.question}</h2>

      <div className="quiz-card__options">
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.correctIndex
          const isSelected = idx === selected
          let stateClass = ''
          if (answered) {
            if (isCorrect) stateClass = 'quiz-option--correct'
            else if (isSelected) stateClass = 'quiz-option--wrong'
          }
          return (
            <button
              key={idx}
              type="button"
              className={`quiz-option ${stateClass}`}
              onClick={() => onSelect(idx)}
              disabled={answered}
            >
              <span className="quiz-option__letter">{OPTION_LETTERS[idx]}</span>
              <span className="quiz-option__text">{option}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`quiz-card__explanation ${selected === question.correctIndex ? 'is-correct' : 'is-wrong'}`}>
          <strong>{selected === question.correctIndex ? 'Certinho! 🎉' : 'Quase!'}</strong> {question.explanation}
        </div>
      )}
    </div>
  )
}
