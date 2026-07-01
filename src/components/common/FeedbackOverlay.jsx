import BigButton from './BigButton'
import './FeedbackOverlay.css'

const ICONS = {
  correct: '✅',
  wrong: '❌',
  info: '💡',
  success: '🎉',
}

export default function FeedbackOverlay({
  status = 'info',
  title,
  message,
  onContinue,
  continueLabel = 'Continuar',
}) {
  return (
    <div className="feedback-overlay" role="alert">
      <div className={`feedback-card feedback-card--${status}`}>
        <div className="feedback-card__icon">{ICONS[status] || ICONS.info}</div>
        {title && <h3 className="feedback-card__title">{title}</h3>}
        {message && <p className="feedback-card__message">{message}</p>}
        {onContinue && (
          <BigButton variant={status === 'wrong' ? 'secondary' : 'primary'} onClick={onContinue}>
            {continueLabel}
          </BigButton>
        )}
      </div>
    </div>
  )
}
