import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { shuffle } from '@/utils/shuffle';
import { colorForKey } from '@/utils/paletteColor';
import type { ActivityRunResult, MemoryActivityConfig, MemoryCardPair } from '@/types';
import './MemoryActivity.css';

interface MemoryActivityProps {
  activity: MemoryActivityConfig;
  onComplete: (result: ActivityRunResult) => void;
}

interface Card {
  cardId: string;
  pairId: string;
  icon: string;
  label: string;
}

function buildDeck(pairs: MemoryCardPair[]): Card[] {
  const cards: Card[] = pairs.flatMap((pair) => [
    { cardId: `${pair.id}-a`, pairId: pair.id, icon: pair.icon, label: pair.label },
    { cardId: `${pair.id}-b`, pairId: pair.id, icon: pair.icon, label: pair.label }
  ]);
  return shuffle(cards);
}

const MIN_CARD_WIDTH = 92;
const CARD_GAP = 8;

/**
 * Maior divisor de `count` que caiba em `maxCols` — a grade sai sempre
 * "cheia" (mesma quantidade de cartas em toda linha), nunca com uma
 * última linha sobrando sozinha (ex: 10 numa linha e 2 na outra).
 */
function pickColumns(count: number, maxCols: number): number {
  const limit = Math.max(1, Math.min(maxCols, count));
  for (let cols = limit; cols >= 1; cols--) {
    if (count % cols === 0) return cols;
  }
  return limit;
}

/**
 * Jogo da memória clássico: vira duas cartas por vez, formando pares.
 * Cada acerto revela uma dica de consumo consciente por alguns segundos.
 * Mecânica só de toque simples — ótima para crianças e para quem tem
 * pouca familiaridade com telas touch.
 */
export function MemoryActivity({ activity, onComplete }: MemoryActivityProps) {
  const startedAtRef = useRef(Date.now());
  const deck = useMemo(() => buildDeck(activity.pairs), [activity.pairs]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeTip, setActiveTip] = useState<string | null>(null);

  // Contadores em ref: o resultado final é lido no mesmo tick em que o
  // último par é resolvido, então depender de state aqui reabriria a
  // corrida clássica de closure obsoleta dentro de setTimeout.
  const attemptsRef = useRef({ correct: 0, incorrect: 0 });
  const matchedRef = useRef<Set<string>>(new Set());

  const totalPairs = activity.pairs.length;

  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const updateColumns = () => {
      const maxCols = Math.max(1, Math.floor((el.clientWidth + CARD_GAP) / (MIN_CARD_WIDTH + CARD_GAP)));
      setColumns(pickColumns(deck.length, maxCols));
    };
    updateColumns();
    const observer = new ResizeObserver(updateColumns);
    observer.observe(el);
    return () => observer.disconnect();
  }, [deck.length]);

  const finish = () => {
    if (finished) return;
    setFinished(true);
    onComplete({
      correct: attemptsRef.current.correct,
      incorrect: attemptsRef.current.incorrect,
      stepsCompleted: attemptsRef.current.correct + attemptsRef.current.incorrect,
      totalSteps: totalPairs,
      durationMs: Date.now() - startedAtRef.current
    });
  };

  const handleFlip = (card: Card) => {
    if (locked || finished) return;
    if (flipped.includes(card.cardId) || matched.has(card.pairId)) return;

    const nextFlipped = [...flipped, card.cardId];
    setFlipped(nextFlipped);

    if (nextFlipped.length < 2) return;

    const [firstId, secondId] = nextFlipped;
    const first = deck.find((c) => c.cardId === firstId)!;
    const second = deck.find((c) => c.cardId === secondId)!;
    setLocked(true);

    if (first.pairId === second.pairId) {
      const pairInfo = activity.pairs.find((p) => p.id === first.pairId);
      window.setTimeout(() => {
        matchedRef.current = new Set(matchedRef.current).add(first.pairId);
        attemptsRef.current = { ...attemptsRef.current, correct: attemptsRef.current.correct + 1 };
        setMatched(matchedRef.current);
        setFlipped([]);
        setLocked(false);
        setActiveTip(pairInfo?.tip ?? null);
        window.setTimeout(() => setActiveTip(null), 2600);

        if (matchedRef.current.size >= totalPairs) {
          window.setTimeout(finish, 900);
        }
      }, 500);
    } else {
      setWrongPair(nextFlipped);
      window.setTimeout(() => {
        attemptsRef.current = { ...attemptsRef.current, incorrect: attemptsRef.current.incorrect + 1 };
        setFlipped([]);
        setWrongPair([]);
        setLocked(false);
      }, 900);
    }
  };

  return (
    <div className="memory-activity">
      <div className="memory-activity__hud">
        <Icon name="cards" size={18} />
        <span>{matched.size} de {totalPairs} pares encontrados</span>
      </div>

      <div className="memory-activity__grid" ref={gridRef} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {deck.map((card) => {
          const isMatched = matched.has(card.pairId);
          const isFlipped = flipped.includes(card.cardId) || isMatched;
          const isWrong = wrongPair.includes(card.cardId);
          return (
            <button
              key={card.cardId}
              type="button"
              className={`memory-activity__card${isFlipped ? ' memory-activity__card--flipped' : ''}${isMatched ? ' memory-activity__card--matched' : ''}${isWrong ? ' memory-activity__card--wrong' : ''}`}
              onClick={() => handleFlip(card)}
              disabled={isFlipped}
              aria-label={isFlipped ? card.label : 'Carta virada para baixo'}
            >
              <div className="memory-activity__card-inner">
                <div className="memory-activity__card-face memory-activity__card-face--back">
                  <Icon name="bolt" size={22} />
                </div>
                <div className="memory-activity__card-face memory-activity__card-face--front">
                  <span className="memory-activity__card-icon" style={{ background: colorForKey(card.icon) }}>
                    <Icon name={card.icon as IconName} size={26} strokeWidth={1.8} color="#fff" />
                  </span>
                  <span className="memory-activity__card-label">{card.label}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeTip && (
          <motion.div
            className="memory-activity__tip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <Icon name="check" size={18} />
            <span>{activeTip}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
