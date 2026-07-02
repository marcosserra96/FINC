import BigButton from './BigButton'
import Icon from './Icon'
import './FeedbackOverlay.css'

const ICONS = {
  correct: 'check',
  wrong: 'cross',
  info: 'bulb',
  success: 'party',
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
        <div className="feedback-card__icon">
          <Icon name={ICONS[status] || ICONS.info} size={56} />
        </div>
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
