import { useNavigate } from 'react-router-dom'
import './HomeButton.css'

export default function HomeButton() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="home-button"
      onClick={() => navigate('/')}
      aria-label="Voltar ao início"
    >
      <span className="home-button__icon">⌂</span>
      <span className="home-button__label">Início</span>
    </button>
  )
}
