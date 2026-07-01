import { useConfig } from '../../context/ConfigContext'
import AdminSection from './AdminSection'
import BigButton from '../common/BigButton'
import './QuizEditor.css'

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

export default function QuizEditor() {
  const { quizQuestions, updateQuizQuestions } = useConfig()

  const updateQuestion = (id, patch) => {
    updateQuizQuestions(quizQuestions.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  }

  const updateOption = (id, idx, value) => {
    updateQuizQuestions(
      quizQuestions.map((q) => (q.id === id ? { ...q, options: q.options.map((o, i) => (i === idx ? value : o)) } : q))
    )
  }

  const handleDelete = (id) => {
    if (quizQuestions.length <= 1) return
    if (window.confirm('Excluir esta pergunta do quiz?')) {
      updateQuizQuestions(quizQuestions.filter((q) => q.id !== id))
    }
  }

  const handleAdd = () => {
    const nextId = quizQuestions.reduce((max, q) => Math.max(max, q.id), 0) + 1
    updateQuizQuestions([
      ...quizQuestions,
      {
        id: nextId,
        question: 'Nova pergunta',
        options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
        correctIndex: 0,
        explanation: '',
      },
    ])
  }

  return (
    <AdminSection
      title="Perguntas do Quiz"
      description="Edite o texto, as alternativas, a resposta certa e a explicação de cada pergunta."
    >
      <div className="quiz-editor__list">
        {quizQuestions.map((q, qIndex) => (
          <div key={q.id} className="quiz-editor__card">
            <div className="quiz-editor__card-header">
              <span>Pergunta {qIndex + 1}</span>
              <button
                type="button"
                className="quiz-editor__delete"
                onClick={() => handleDelete(q.id)}
                disabled={quizQuestions.length <= 1}
              >
                Excluir
              </button>
            </div>

            <textarea
              className="admin-field__textarea"
              value={q.question}
              onChange={(e) => updateQuestion(q.id, { question: e.target.value })}
            />

            {q.options.map((option, idx) => (
              <label key={idx} className="quiz-editor__option">
                <input
                  type="radio"
                  name={`correct-${q.id}`}
                  checked={q.correctIndex === idx}
                  onChange={() => updateQuestion(q.id, { correctIndex: idx })}
                />
                <span className="quiz-editor__option-letter">{OPTION_LETTERS[idx]}</span>
                <input
                  type="text"
                  className="admin-field__input"
                  value={option}
                  onChange={(e) => updateOption(q.id, idx, e.target.value)}
                />
              </label>
            ))}

            <label className="admin-field__label" htmlFor={`explanation-${q.id}`}>
              Explicação (mostrada após responder)
            </label>
            <textarea
              id={`explanation-${q.id}`}
              className="admin-field__textarea"
              value={q.explanation}
              onChange={(e) => updateQuestion(q.id, { explanation: e.target.value })}
            />
          </div>
        ))}
      </div>

      <BigButton variant="secondary" onClick={handleAdd}>
        + Adicionar pergunta
      </BigButton>
    </AdminSection>
  )
}
