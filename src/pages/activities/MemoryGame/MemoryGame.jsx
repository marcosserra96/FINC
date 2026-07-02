import { useState } from 'react'
import ScreenShell from '../../../components/common/ScreenShell'
import Confetti from '../../../components/common/Confetti'
import BigButton from '../../../components/common/BigButton'
import EfficiencyGauge from '../../../components/common/EfficiencyGauge'
import Icon from '../../../components/common/Icon'
import { useConfig } from '../../../context/ConfigContext'
import { MEMORY_PAIRS } from '../../../data/memoryCardsData'
import { shuffleArray } from '../../../utils/shuffle'
import './MemoryGame.css'

const FLIP_BACK_DELAY_MS = 700

function buildDeck() {
  const doubled = MEMORY_PAIRS.flatMap((pair, pairIndex) => [
    { uid: `${pairIndex}-a`, pairIndex, icon: pair.icon, label: pair.label },
    { uid: `${pairIndex}-b`, pairIndex, icon: pair.icon, label: pair.label },
  ])
  return shuffleArray(doubled)
}

export default function MemoryGame() {
  const { config } = useConfig()
  const cardImages = config.memoryCardImages || {}
  const [deck, setDeck] = useState(buildDeck)
  const [flipped, setFlipped] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const [finished, setFinished] = useState(false)

  const totalPairs = MEMORY_PAIRS.length
  const ratio = moves > 0 ? Math.min(1, totalPairs / moves) : 1

  const handleFlip = (card) => {
    if (locked) return
    if (flipped.includes(card.uid) || matchedPairs.includes(card.pairIndex)) return

    const nextFlipped = [...flipped, card.uid]
    setFlipped(nextFlipped)

    if (nextFlipped.length < 2) return

    setLocked(true)
    setMoves((m) => m + 1)

    const [firstUid, secondUid] = nextFlipped
    const first = deck.find((c) => c.uid === firstUid)
    const second = deck.find((c) => c.uid === secondUid)

    if (first.pairIndex === second.pairIndex) {
      const nextMatched = [...matchedPairs, first.pairIndex]
      setMatchedPairs(nextMatched)
      setFlipped([])
      setLocked(false)
      if (nextMatched.length === totalPairs) setFinished(true)
      return
    }

    setTimeout(() => {
      setFlipped([])
      setLocked(false)
    }, FLIP_BACK_DELAY_MS)
  }

  const handleRestart = () => {
    setDeck(buildDeck())
    setFlipped([])
    setMatchedPairs([])
    setMoves(0)
    setLocked(false)
    setFinished(false)
  }

  if (finished) {
    return (
      <ScreenShell className="memory-screen memory-screen--result">
        {ratio >= 0.7 && <Confetti />}
        <h1 className="memory-screen__title">Jogo da Memória</h1>
        <p className="memory-screen__subtitle">
          Você encontrou todos os pares em {moves} tentativa{moves === 1 ? '' : 's'}. Veja seu selo:
        </p>
        <EfficiencyGauge ratio={ratio} label="Parabéns por treinar a memória com energia consciente!" />
        <BigButton variant="primary" onClick={handleRestart}>
          Jogar novamente
        </BigButton>
      </ScreenShell>
    )
  }

  return (
    <ScreenShell className="memory-screen">
      <div className="memory-screen__body">
        <h1 className="memory-screen__title">Jogo da Memória</h1>
        <p className="memory-screen__subtitle">
          Toque em duas cartas para encontrar os pares · {matchedPairs.length} de {totalPairs} pares
        </p>

        <div className="memory-grid">
          {deck.map((card) => {
            const isFlipped = flipped.includes(card.uid)
            const isMatched = matchedPairs.includes(card.pairIndex)
            const isRevealed = isFlipped || isMatched
            return (
              <button
                key={card.uid}
                type="button"
                className={`memory-card ${isRevealed ? 'is-revealed' : ''} ${isMatched ? 'is-matched' : ''}`}
                onClick={() => handleFlip(card)}
                disabled={isMatched}
                aria-label={isRevealed ? card.label : 'Carta virada para baixo'}
              >
                <span className="memory-card__inner">
                  <span className="memory-card__face memory-card__face--back">
                    <Icon name="bolt" size={26} />
                  </span>
                  <span className="memory-card__face memory-card__face--front">
                    {cardImages[card.icon] ? (
                      <img className="memory-card__image" src={cardImages[card.icon]} alt="" />
                    ) : (
                      <Icon name={card.icon} size={30} />
                    )}
                    <span className="memory-card__label">{card.label}</span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </ScreenShell>
  )
}
