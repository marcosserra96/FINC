import { useConfig } from '../../context/ConfigContext'
import { useIdleRedirect } from '../../hooks/useIdleRedirect'
import HomeButton from './HomeButton'
import './ScreenShell.css'

export default function ScreenShell({ children, showHomeButton = true, idleEnabled = true, className = '' }) {
  const { config } = useConfig()
  useIdleRedirect(idleEnabled, config.inactivityTimeoutSeconds)

  return (
    <div className={`kiosk-screen screen-shell ${className}`}>
      {showHomeButton && <HomeButton />}
      {children}
    </div>
  )
}
