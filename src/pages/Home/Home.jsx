import { useNavigate } from 'react-router-dom'
import { useConfig } from '../../context/ConfigContext'
import Logo from '../../components/common/Logo'
import BigButton from '../../components/common/BigButton'
import './Home.css'

const ACTIVITY_LINKS = [
  { key: 'quiz', to: '/quiz', label: 'Quiz Rápido', icon: '❓', variant: 'primary' },
  { key: 'house', to: '/casa-eficiente', label: 'Casa Eficiente', icon: '🏠', variant: 'orange' },
  { key: 'appliance', to: '/consumo', label: 'O Que Mais Consome?', icon: '⚡', variant: 'secondary' },
]

export default function Home() {
  const navigate = useNavigate()
  const { config } = useConfig()

  const activeLinks = ACTIVITY_LINKS.filter((link) => config.activities[link.key])

  return (
    <div className="kiosk-screen home-screen">
      <div className="home-screen__top">
        <Logo size="lg" onSecretUnlock={() => navigate('/admin')} />
      </div>

      <div className="home-screen__hero">
        <h1 className="home-screen__title">{config.homeMessage.title}</h1>
        <p className="home-screen__subtitle">{config.homeMessage.subtitle}</p>
      </div>

      <div className="home-screen__activities">
        {activeLinks.map((link) => (
          <BigButton
            key={link.key}
            icon={link.icon}
            variant={link.variant}
            onClick={() => navigate(link.to)}
            className="home-screen__activity-button"
          >
            {link.label}
          </BigButton>
        ))}
        {config.rankingEnabled && (
          <BigButton
            icon="🏆"
            variant="ghost"
            onClick={() => navigate('/ranking')}
            className="home-screen__activity-button"
          >
            Ranking
          </BigButton>
        )}
      </div>

      <div className="home-screen__footer">Grupo Energisa · Consumo Consciente</div>
    </div>
  )
}
