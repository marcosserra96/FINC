import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfig } from '../../context/ConfigContext'
import NumericKeypad from '../../components/common/NumericKeypad'
import BigButton from '../../components/common/BigButton'
import AdminPanel from './AdminPanel'
import './AdminGate.css'

function PinScreen() {
  const navigate = useNavigate()
  const { loginAdmin } = useConfig()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleKeyPress = ({ type, value }) => {
    setError(false)
    if (type === 'clear') {
      setPin('')
      return
    }
    if (type === 'back') {
      setPin((p) => p.slice(0, -1))
      return
    }
    const next = pin + value
    setPin(next)
    if (next.length >= 4) {
      const ok = loginAdmin(next)
      if (!ok) {
        setError(true)
        setTimeout(() => setPin(''), 400)
      }
    }
  }

  return (
    <div className="admin-pin">
      <h1 className="admin-pin__title">Área da Equipe</h1>
      <p className="admin-pin__subtitle">Digite o PIN de acesso</p>
      <div className={`admin-pin__dots ${error ? 'admin-pin__dots--error' : ''}`}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <span key={idx} className={`admin-pin__dot ${idx < pin.length ? 'is-filled' : ''}`} />
        ))}
      </div>
      {error && <p className="admin-pin__error">PIN incorreto, tente novamente.</p>}
      <NumericKeypad value={pin} maxLength={4} onKeyPress={handleKeyPress} />
      <BigButton variant="secondary" onClick={() => navigate('/')}>
        Voltar ao início
      </BigButton>
    </div>
  )
}

export default function AdminGate() {
  const { isAdminAuthed } = useConfig()
  return isAdminAuthed ? <AdminPanel /> : <PinScreen />
}
