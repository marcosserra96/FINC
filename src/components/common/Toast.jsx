import { useEffect } from 'react'
import './Toast.css'

export default function Toast({ message, tone = 'good', onDone, duration = 2200 }) {
  useEffect(() => {
    const timer = setTimeout(onDone, duration)
    return () => clearTimeout(timer)
  }, [onDone, duration])

  return (
    <div className={`toast toast--${tone}`} role="status">
      <span className="toast__icon">{tone === 'good' ? '✅' : '💡'}</span>
      <span className="toast__message">{message}</span>
    </div>
  )
}
