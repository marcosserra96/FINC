import { useNavigate } from 'react-router-dom'
import { useConfig } from '../../context/ConfigContext'
import Logo from '../../components/common/Logo'
import ActivityCard from '../../components/common/ActivityCard'
import './Home.css'

const ACTIVITY_LINKS = [
  {
    key: 'quiz',
    to: '/quiz',
    label: 'Quiz Rápido',
    description: 'Teste o que você sabe',
    icon: 'question',
    accent: 'blue',
  },
  {
    key: 'house',
    to: '/casa-eficiente',
    label: 'Casa Eficiente',
    description: 'Monte uma casa mais eficiente',
    icon: 'house',
    accent: 'orange',
  },
  {
    key: 'appliance',
    to: '/consumo',
    label: 'O Que Mais Consome?',
    description: 'Descubra os maiores consumidores',
    icon: 'bolt',
    accent: 'blue',
  },
]

function SkylineDecoration() {
  return (
    <svg
      className="home-screen__skyline"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="rgba(255,255,255,0.07)">
        <rect x="0" y="130" width="90" height="90" />
        <rect x="90" y="90" width="60" height="130" />
        <rect x="150" y="150" width="100" height="70" />
        <rect x="250" y="70" width="70" height="150" />
        <rect x="320" y="120" width="110" height="100" />
        <rect x="430" y="50" width="60" height="170" />
        <rect x="490" y="140" width="90" height="80" />
        <rect x="580" y="100" width="130" height="120" />
        <rect x="710" y="160" width="70" height="60" />
        <rect x="780" y="80" width="100" height="140" />
        <rect x="880" y="130" width="80" height="90" />
        <rect x="960" y="110" width="120" height="110" />
        <rect x="1080" y="60" width="70" height="160" />
        <rect x="1150" y="150" width="90" height="70" />
        <rect x="1240" y="90" width="100" height="130" />
        <rect x="1340" y="130" width="100" height="90" />
      </g>
      <g fill="rgba(255,255,255,0.16)">
        <rect x="112" y="115" width="6" height="6" />
        <rect x="112" y="135" width="6" height="6" />
        <rect x="270" y="100" width="6" height="6" />
        <rect x="800" y="105" width="6" height="6" />
        <rect x="800" y="125" width="6" height="6" />
        <rect x="1000" y="140" width="6" height="6" />
        <rect x="1260" y="115" width="6" height="6" className="home-screen__skyline-pulse" />
      </g>
      <line x1="460" y1="50" x2="460" y2="30" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <circle cx="460" cy="27" r="3.5" fill="var(--energisa-orange)" className="home-screen__skyline-pulse" />
    </svg>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { config } = useConfig()

  const activeLinks = ACTIVITY_LINKS.filter((link) => config.activities[link.key])

  return (
    <div className="kiosk-screen home-screen">
      <SkylineDecoration />

      <div className="home-screen__content">
        <div className="home-screen__top">
          <Logo size="lg" onSecretUnlock={() => navigate('/admin')} />
        </div>

        <div className="home-screen__hero">
          <span className="home-screen__eyebrow">Grupo Energisa · Experiência interativa</span>
          <h1 className="home-screen__title">{config.homeMessage.title}</h1>
          <p className="home-screen__subtitle">{config.homeMessage.subtitle}</p>
        </div>

        <div className="home-screen__activities-wrap">
          <span className="home-screen__tap-hint" aria-hidden="true" />
          <div className="home-screen__activities">
            {activeLinks.map((link) => (
              <ActivityCard
                key={link.key}
                icon={link.icon}
                title={link.label}
                description={link.description}
                accent={link.accent}
                onClick={() => navigate(link.to)}
              />
            ))}
            {config.rankingEnabled && (
              <ActivityCard
                icon="trophy"
                title="Ranking"
                description="Veja quem mais pontuou"
                accent="neutral"
                onClick={() => navigate('/ranking')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
