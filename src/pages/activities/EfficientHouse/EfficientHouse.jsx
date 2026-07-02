import { useMemo, useState } from 'react'
import ScreenShell from '../../../components/common/ScreenShell'
import Toast from '../../../components/common/Toast'
import Confetti from '../../../components/common/Confetti'
import BigButton from '../../../components/common/BigButton'
import EfficiencyGauge from '../../../components/common/EfficiencyGauge'
import Icon from '../../../components/common/Icon'
import { HOUSE_ROOMS } from '../../../data/houseSceneData'
import './EfficientHouse.css'

function cloneRooms() {
  return HOUSE_ROOMS.map((room) => ({
    ...room,
    items: room.items.map((item) => ({ ...item, checked: false })),
  }))
}

export default function EfficientHouse() {
  const [rooms, setRooms] = useState(cloneRooms)
  const [activeRoomIndex, setActiveRoomIndex] = useState(0)
  const [toast, setToast] = useState(null)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)

  const activeRoom = rooms[activeRoomIndex]

  const totalWaste = useMemo(
    () => rooms.reduce((sum, r) => sum + r.items.filter((i) => i.isWaste).length, 0),
    [rooms]
  )
  const foundWaste = useMemo(
    () => rooms.reduce((sum, r) => sum + r.items.filter((i) => i.isWaste && i.checked).length, 0),
    [rooms]
  )
  const ratio = totalWaste ? foundWaste / totalWaste : 0

  const handleItemTap = (item) => {
    if (item.checked || toast || finished) return
    setStarted(true)
    setRooms((prev) =>
      prev.map((room, idx) =>
        idx !== activeRoomIndex
          ? room
          : { ...room, items: room.items.map((i) => (i.id === item.id ? { ...i, checked: true } : i)) }
      )
    )
    setToast(
      item.isWaste
        ? { message: item.tip, tone: 'good' }
        : { message: `Tudo certo aqui! ${item.tip}`, tone: 'info' }
    )
  }

  const handleToastDone = () => {
    setToast(null)
    const roomDone = activeRoom.items.filter((i) => i.isWaste).every((i) => i.checked)
    if (roomDone) {
      if (activeRoomIndex + 1 < rooms.length) {
        setActiveRoomIndex(activeRoomIndex + 1)
      } else {
        setFinished(true)
      }
    }
  }

  const handleRestart = () => {
    setRooms(cloneRooms())
    setActiveRoomIndex(0)
    setToast(null)
    setFinished(false)
    setStarted(false)
  }

  if (finished) {
    return (
      <ScreenShell className="house-screen house-screen--result">
        <Confetti />
        <h1 className="house-screen__title">Casa Eficiente</h1>
        <p className="house-screen__subtitle">Veja o selo de eficiência da sua casa:</p>
        <EfficiencyGauge ratio={ratio} label="Parabéns por deixar a casa mais eficiente!" />
        <BigButton variant="primary" onClick={handleRestart}>
          Jogar novamente
        </BigButton>
      </ScreenShell>
    )
  }

  return (
    <ScreenShell className="house-screen">
      <div className="house-screen__header">
        <h1 className="house-screen__title">Casa Eficiente</h1>
        <p className="house-screen__subtitle">
          Toque nos itens deste cômodo que estão desperdiçando energia
        </p>
      </div>

      <div className="house-rooms-nav">
        {rooms.map((room, idx) => (
          <button
            key={room.id}
            type="button"
            className={`house-rooms-nav__item ${idx === activeRoomIndex ? 'is-active' : ''} ${
              room.items.filter((i) => i.isWaste).every((i) => i.checked) ? 'is-done' : ''
            }`}
            onClick={() => setActiveRoomIndex(idx)}
            aria-label={room.name}
          >
            <Icon name={room.icon} size={28} />
          </button>
        ))}
        {started && (
          <div className="house-rooms-nav__gauge">
            <EfficiencyGauge ratio={ratio} compact label={`${foundWaste}/${totalWaste}`} />
          </div>
        )}
      </div>

      <div className="house-room-title">
        <Icon name={activeRoom.icon} size={24} />
        <span>{activeRoom.name}</span>
      </div>

      <div key={activeRoom.id} className="house-grid">
        {activeRoom.items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`house-item ${item.checked ? (item.isWaste ? 'is-fixed' : 'is-ok') : ''}`}
            onClick={() => handleItemTap(item)}
            disabled={item.checked}
          >
            <span className="house-item__icon">
              <Icon name={item.icon} size={36} />
            </span>
            <span className="house-item__label">{item.label}</span>
            {item.checked && <span className="house-item__check">✓</span>}
          </button>
        ))}
      </div>

      {toast && <Toast message={toast.message} tone={toast.tone} onDone={handleToastDone} />}
    </ScreenShell>
  )
}
