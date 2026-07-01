import { useConfig } from '../../context/ConfigContext'
import AdminSection from './AdminSection'

const TIMEOUT_STEP = 10
const TIMEOUT_MIN = 20
const TIMEOUT_MAX = 300

export default function GeneralSettings() {
  const { config, updateConfig } = useConfig()

  const changeTimeout = (delta) => {
    const next = Math.min(TIMEOUT_MAX, Math.max(TIMEOUT_MIN, config.inactivityTimeoutSeconds + delta))
    updateConfig({ inactivityTimeoutSeconds: next })
  }

  return (
    <>
      <AdminSection
        title="Mensagem da tela inicial"
        description="Texto exibido para o público na tela de abertura do totem."
      >
        <div className="admin-field">
          <label className="admin-field__label" htmlFor="home-title">
            Chamada principal
          </label>
          <input
            id="home-title"
            className="admin-field__input"
            type="text"
            maxLength={80}
            value={config.homeMessage.title}
            onChange={(e) => updateConfig({ homeMessage: { ...config.homeMessage, title: e.target.value } })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-field__label" htmlFor="home-subtitle">
            Subtítulo
          </label>
          <input
            id="home-subtitle"
            className="admin-field__input"
            type="text"
            maxLength={100}
            value={config.homeMessage.subtitle}
            onChange={(e) => updateConfig({ homeMessage: { ...config.homeMessage, subtitle: e.target.value } })}
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Tempo de inatividade"
        description="Tempo sem interação até voltar automaticamente para a tela inicial."
      >
        <div className="admin-stepper">
          <button
            type="button"
            className="admin-stepper__button"
            onClick={() => changeTimeout(-TIMEOUT_STEP)}
            aria-label="Diminuir tempo"
          >
            −
          </button>
          <span className="admin-stepper__value">{config.inactivityTimeoutSeconds}s</span>
          <button
            type="button"
            className="admin-stepper__button"
            onClick={() => changeTimeout(TIMEOUT_STEP)}
            aria-label="Aumentar tempo"
          >
            +
          </button>
        </div>
      </AdminSection>

      <AdminSection title="PIN de acesso" description="Usado para entrar nesta área da equipe.">
        <div className="admin-field">
          <label className="admin-field__label" htmlFor="admin-pin">
            PIN (4 dígitos)
          </label>
          <input
            id="admin-pin"
            className="admin-field__input"
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={config.adminPin}
            onChange={(e) => updateConfig({ adminPin: e.target.value.replace(/\D/g, '').slice(0, 4) })}
          />
        </div>
      </AdminSection>
    </>
  )
}
