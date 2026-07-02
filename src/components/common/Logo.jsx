import { useSecretTap } from '../../hooks/useSecretTap'
import { useConfig } from '../../context/ConfigContext'
import './Logo.css'

const PLACEHOLDER_LOGO = `${import.meta.env.BASE_URL}logo-energisa-placeholder.svg`

export default function Logo({ onSecretUnlock, size = 'lg' }) {
  const { config } = useConfig()
  const registerTap = useSecretTap({
    requiredTaps: 5,
    windowMs: 2500,
    onTrigger: () => onSecretUnlock?.(),
  })

  return (
    <div
      className={`logo logo--${size}`}
      onClick={onSecretUnlock ? registerTap : undefined}
      role={onSecretUnlock ? 'button' : undefined}
      aria-label="Energisa"
    >
      <img src={config.logoDataUrl || PLACEHOLDER_LOGO} alt="Energisa" draggable={false} />
    </div>
  )
}
