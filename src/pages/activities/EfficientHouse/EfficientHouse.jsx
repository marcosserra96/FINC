import { useMemo, useState } from 'react'
import ScreenShell from '../../../components/common/ScreenShell'
import FeedbackOverlay from '../../../components/common/FeedbackOverlay'
import Confetti from '../../../components/common/Confetti'
import { ROOMS } from '../../../data/houseWasteData'
import './EfficientHouse.css'

function cloneRooms() {
  return ROOMS.map((room) => ({
    ...room,
    items: room.items.map((item) => ({ ...item, found: false })),
  }))
}

export default function EfficientHouse() {
  const [rooms, setRooms] = useState(cloneRooms)
  const [activeRoomId, setActiveRoomId] = useState(ROOMS[0].id)
  const [overlay, setOverlay] = useState(null)
  const [locked, setLocked] = useState(false)

  const totalWaste = useMemo(
    () => rooms.reduce((sum, room) => sum + room.items.filter((i) => i.isWaste).length, 0),
    [rooms]
  )
  const foundCount = useMemo(
    () => rooms.reduce((sum, room) => sum + room.items.filter((i) => i.isWaste && i.found).length, 0),
    [rooms]
  )
  const allFound = totalWaste > 0 && foundCount === totalWaste

  const activeRoom = rooms.find((r) => r.id === activeRoomId)

  const handleItemTap = (item) => {
    if (locked || allFound) return
    if (item.isWaste && item.found) return

    setLocked(true)

    if (item.isWaste) {
      setRooms((prev) =>
        prev.map((room) =>
          room.id !== activeRoomId
            ? room
            : { ...room, items: room.items.map((i) => (i.id === item.id ? { ...i, found: true } : i)) }
        )
      )
      setOverlay({ status: 'correct', title: 'Boa! Desperdício encontrado', message: item.tip })
    } else {
      setOverlay({ status: 'info', title: 'Isso está certo por aqui', message: item.tip })
    }
  }

  const closeOverlay = () => {
    setOverlay(null)
    setLocked(false)
  }

  const handleRestart = () => {
    setRooms(cloneRooms())
    setActiveRoomId(ROOMS[0].id)
    setOverlay(null)
    setLocked(false)
  }

  return (
    <ScreenShell className="house-screen">
      <div className="house-screen__header">
        <h1 className="house-screen__title">Casa Eficiente</h1>
        <p className="house-screen__subtitle">Toque nos pontos de desperdício de energia em cada cômodo</p>
        <div className="house-progress">
          <div className="house-progress__bar">
            <div
              className="house-progress__fill"
              style={{ width: totalWaste ? `${(foundCount / totalWaste) * 100}%` : '0%' }}
            />
          </div>
          <span className="house-progress__label">
            {foundCount} de {totalWaste} desperdícios encontrados
          </span>
        </div>
      </div>

      <div className="house-tabs">
        {rooms.map((room) => {
          const roomFound = room.items.filter((i) => i.isWaste && i.found).length
          const roomTotal = room.items.filter((i) => i.isWaste).length
          return (
            <button
              key={room.id}
              type="button"
              className={`house-tab ${room.id === activeRoomId ? 'house-tab--active' : ''}`}
              onClick={() => setActiveRoomId(room.id)}
            >
              <span className="house-tab__icon">{room.icon}</span>
              <span>{room.name}</span>
              <span className="house-tab__badge">
                {roomFound}/{roomTotal}
              </span>
            </button>
          )
        })}
      </div>

      <div className="house-grid">
        {activeRoom.items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`house-item ${item.isWaste && item.found ? 'house-item--found' : ''}`}
            onClick={() => handleItemTap(item)}
          >
            <span className="house-item__icon">{item.icon}</span>
            <span className="house-item__label">{item.label}</span>
            {item.isWaste && item.found && <span className="house-item__check">✓</span>}
          </button>
        ))}
      </div>

      {overlay && (
        <FeedbackOverlay
          status={overlay.status}
          title={overlay.title}
          message={overlay.message}
          onContinue={closeOverlay}
        />
      )}

      {allFound && (
        <FeedbackOverlay
          status="success"
          title="Parabéns!"
          message="Você encontrou todos os pontos de desperdício de energia da casa."
          continueLabel="Jogar novamente"
          onContinue={handleRestart}
        />
      )}
      {allFound && <Confetti />}
    </ScreenShell>
  )
}
