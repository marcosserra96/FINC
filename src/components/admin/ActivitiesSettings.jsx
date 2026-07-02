import { useConfig } from '../../context/ConfigContext'
import AdminSection from './AdminSection'

const ACTIVITIES = [
  { key: 'quiz', label: 'Quiz Rápido', hint: 'Perguntas sobre consumo consciente' },
  { key: 'memory', label: 'Jogo da Memória', hint: 'Encontrar os pares de ícones de energia' },
  { key: 'appliance', label: 'O Que Mais Consome?', hint: 'Comparar consumo de eletrodomésticos' },
]

export default function ActivitiesSettings() {
  const { config, updateConfig } = useConfig()

  const toggleActivity = (key) => {
    updateConfig({ activities: { ...config.activities, [key]: !config.activities[key] } })
  }

  return (
    <AdminSection title="Atividades" description="Ative ou desative cada atividade exibida na tela inicial.">
      {ACTIVITIES.map((activity) => (
        <div key={activity.key} className="admin-toggle-row">
          <div>
            <div className="admin-toggle-row__label">{activity.label}</div>
            <div className="admin-toggle-row__hint">{activity.hint}</div>
          </div>
          <button
            type="button"
            className={`admin-switch ${config.activities[activity.key] ? 'admin-switch--on' : ''}`}
            onClick={() => toggleActivity(activity.key)}
            aria-label={`Ativar ou desativar ${activity.label}`}
          />
        </div>
      ))}
    </AdminSection>
  )
}
