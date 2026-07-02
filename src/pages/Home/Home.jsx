import { useNavigate } from 'react-router-dom'
import { useConfig } from '../../context/ConfigContext'
import Logo from '../../components/common/Logo'
import BigButton from '../../components/common/BigButton'
import Icon from '../../components/common/Icon'
import './Home.css'

const ACTIVITY_LINKS = [
  { key: 'quiz', to: '/quiz', label: 'Quiz Rápido', icon: 'question', variant: 'primary' },
  { key: 'house', to: '/casa-eficiente', label: 'Casa Eficiente', icon: 'house', variant: 'orange' },
  { key: 'appliance', to: '/consumo', label: 'O Que Mais Consome?', icon: 'bolt', variant: 'secondary' },
]

export default function Home() {
  const navigate = useNavigate()
  const { config } = useConfig()

  const activeLinks = ACTIVITY_LINKS.filter((link) => config.activities[link.key])

  return (
    <div className="kiosk-screen home-screen">
      <div className="home-screen__sparkles" aria-hidden="true">
        <Icon name="party" size={34} className="home-screen__sparkle home-screen__sparkle--1" />
        <Icon name="party" size={26} className="home-screen__sparkle home-screen__sparkle--2" />
        <Icon name="party" size={30} className="home-screen__sparkle home-screen__sparkle--3" />
      </div>

      <div className="home-screen__top">
        <Logo size="lg" onSecretUnlock={() => navigate('/admin')} />
      </div>

      <div className="home-screen__hero">
        <h1 className="home-screen__title">{config.homeMessage.title}</h1>
        <p className="home-screen__subtitle">{config.homeMessage.subtitle}</p>
      </div>

      <div className="home-screen__activities-wrap">
        <span className="home-screen__tap-hint" aria-hidden="true" />
        <div className="home-screen__activities">
          {activeLinks.map((link) => (
            <BigButton
              key={link.key}
              icon={<Icon name={link.icon} size={34} />}
              variant={link.variant}
              onClick={() => navigate(link.to)}
              className="home-screen__activity-button"
            >
              {link.label}
            </BigButton>
          ))}
          {config.rankingEnabled && (
            <BigButton
              icon={<Icon name="trophy" size={34} />}
              variant="ghost"
              onClick={() => navigate('/ranking')}
              className="home-screen__activity-button"
            >
              Ranking
            </BigButton>
          )}
        </div>
      </div>

      <div className="home-screen__footer">Grupo Energisa · Consumo Consciente</div>
    </div>
  )
}
