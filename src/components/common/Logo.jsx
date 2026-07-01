import { useSecretTap } from '../../hooks/useSecretTap'
import './Logo.css'

/**
 * Área reservada para o logo oficial do Grupo Energisa.
 * Para usar a logo real, substitua o arquivo em public/logo-energisa-placeholder.svg
 * (ou aponte o "src" abaixo para o novo arquivo).
 */
export default function Logo({ onSecretUnlock, size = 'lg' }) {
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
      <img src={`${import.meta.env.BASE_URL}logo-energisa-placeholder.svg`} alt="Energisa" draggable={false} />
    </div>
  )
}
