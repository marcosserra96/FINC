import { useEffect } from 'react'
import Icon from './Icon'
import './Toast.css'

export default function Toast({ message, tone = 'good', onDone, duration = 2200 }) {
  useEffect(() => {
    const timer = setTimeout(onDone, duration)
    return () => clearTimeout(timer)
  }, [onDone, duration])

  return (
    <div className={`toast toast--${tone}`} role="status">
      <span className="toast__icon">
        <Icon name={tone === 'good' ? 'check' : 'bulb'} size={30} />
      </span>
      <span className="toast__message">{message}</span>
    </div>
  )
}
