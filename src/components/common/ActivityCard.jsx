import Icon from './Icon'
import './ActivityCard.css'

export default function ActivityCard({ icon, title, description, accent = 'blue', onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`activity-card activity-card--${accent} ${className}`}
      onClick={onClick}
    >
      <span className="activity-card__icon">
        <Icon name={icon} size={30} />
      </span>
      <span className="activity-card__text">
        <span className="activity-card__title">{title}</span>
        {description && <span className="activity-card__description">{description}</span>}
      </span>
    </button>
  )
}
