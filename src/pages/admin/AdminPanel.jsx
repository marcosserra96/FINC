import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfig } from '../../context/ConfigContext'
import GeneralSettings from '../../components/admin/GeneralSettings'
import ActivitiesSettings from '../../components/admin/ActivitiesSettings'
import QuizEditor from '../../components/admin/QuizEditor'
import RankingSettings from '../../components/admin/RankingSettings'
import DangerZone from '../../components/admin/DangerZone'
import './AdminPanel.css'

const TABS = [
  { key: 'geral', label: 'Geral' },
  { key: 'atividades', label: 'Atividades' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'ranking', label: 'Ranking' },
  { key: 'avancado', label: 'Avançado' },
]

export default function AdminPanel() {
  const navigate = useNavigate()
  const { logoutAdmin } = useConfig()
  const [activeTab, setActiveTab] = useState('geral')

  const handleExit = () => {
    logoutAdmin()
    navigate('/')
  }

  return (
    <div className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Painel da Equipe</h1>
          <p className="admin-panel__subtitle">Configurações do totem — alterações são salvas automaticamente</p>
        </div>
        <button type="button" className="admin-panel__exit" onClick={handleExit}>
          Voltar para o modo público
        </button>
      </header>

      <nav className="admin-panel__tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`admin-panel__tab ${activeTab === tab.key ? 'admin-panel__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="admin-panel__content">
        {activeTab === 'geral' && <GeneralSettings />}
        {activeTab === 'atividades' && <ActivitiesSettings />}
        {activeTab === 'quiz' && <QuizEditor />}
        {activeTab === 'ranking' && <RankingSettings />}
        {activeTab === 'avancado' && <DangerZone />}
      </main>
    </div>
  )
}
