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
    hotspots: room.hotspots.map((h) => ({ ...h, fixed: false })),
  }))
}

export default function EfficientHouse() {
  const [rooms, setRooms] = useState(cloneRooms)
  const [activeRoomIndex, setActiveRoomIndex] = useState(0)
  const [toast, setToast] = useState(null)
  const [finished, setFinished] = useState(false)

  const activeRoom = rooms[activeRoomIndex]

  const totalHotspots = useMemo(() => rooms.reduce((sum, r) => sum + r.hotspots.length, 0), [rooms])
  const fixedCount = useMemo(
    () => rooms.reduce((sum, r) => sum + r.hotspots.filter((h) => h.fixed).length, 0),
    [rooms]
  )
  const ratio = totalHotspots ? fixedCount / totalHotspots : 0

  const handleHotspotTap = (hotspot) => {
    if (hotspot.fixed || toast || finished) return
    setRooms((prev) =>
      prev.map((room, idx) =>
        idx !== activeRoomIndex
          ? room
          : { ...room, hotspots: room.hotspots.map((h) => (h.id === hotspot.id ? { ...h, fixed: true } : h)) }
      )
    )
    setToast({ message: hotspot.tip })
  }

  const handleToastDone = () => {
    setToast(null)
    const roomDone = activeRoom.hotspots.every((h) => h.fixed)
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
        <p className="house-screen__subtitle">Toque nos pontos que estão brilhando para corrigir o desperdício</p>
      </div>

      <div className="house-rooms-nav">
        {rooms.map((room, idx) => (
          <button
            key={room.id}
            type="button"
            className={`house-rooms-nav__item ${idx === activeRoomIndex ? 'is-active' : ''} ${
              room.hotspots.every((h) => h.fixed) ? 'is-done' : ''
            }`}
            onClick={() => setActiveRoomIndex(idx)}
            aria-label={room.name}
          >
            <Icon name={room.icon} size={28} />
          </button>
        ))}
        <div className="house-rooms-nav__gauge">
          <EfficiencyGauge ratio={ratio} compact label={`${fixedCount}/${totalHotspots}`} />
        </div>
      </div>

      <div
        key={activeRoom.id}
        className="house-scene"
        style={{
          background: `linear-gradient(180deg, ${activeRoom.wallColor} 0%, ${activeRoom.wallColor} 62%, ${activeRoom.floorColor} 62%, ${activeRoom.floorColor} 100%)`,
        }}
      >
        <span className="house-scene__room-label">
          <Icon name={activeRoom.icon} size={22} /> {activeRoom.name}
        </span>

        {activeRoom.decorations.map((deco) => (
          <span
            key={deco.id}
            className="house-scene__decoration"
            style={{ left: `${deco.x}%`, top: `${deco.y}%`, fontSize: `${deco.size}rem` }}
          >
            {deco.icon}
          </span>
        ))}

        {activeRoom.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className={`house-scene__hotspot ${hotspot.fixed ? 'is-fixed' : 'is-glowing'}`}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            onClick={() => handleHotspotTap(hotspot)}
            disabled={hotspot.fixed}
          >
            <Icon name={hotspot.icon} size={38} />
            {hotspot.fixed && <span className="house-scene__hotspot-check">✓</span>}
          </button>
        ))}
      </div>

      {toast && <Toast message={toast.message} tone="good" onDone={handleToastDone} />}
    </ScreenShell>
  )
}
