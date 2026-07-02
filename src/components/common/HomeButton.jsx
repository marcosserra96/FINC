import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
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
      <Icon name="house" size={18} className="home-button__icon" />
      <span className="home-button__label">Início</span>
    </button>
  )
}
