import { useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { shuffle } from '@/utils/shuffle';
import { colorForKey } from '@/utils/paletteColor';
import type { ActivityRunResult, SortActivityConfig, SortItem } from '@/types';
import './SortActivity.css';

interface SortActivityProps {
  activity: SortActivityConfig;
  onComplete: (result: ActivityRunResult) => void;
}

type Outcome = 'correct' | 'incorrect';
type Category = 'eficiente' | 'desperdicio';
const DRAG_THRESHOLD_PX = 8;
// O card fica visível acima do dedo em vez de escondido embaixo dele.
const FINGER_OFFSET_Y = 70;

function CardContent({ item }: { item: SortItem }) {
  return (
    <>
      <span className="sort-activity__item-icon" style={{ background: colorForKey(item.icon) }}>
        <Icon name={item.icon as IconName} size={26} strokeWidth={1.8} color="#fff" />
      </span>
      <span className="sort-activity__item-label">{item.label}</span>
    </>
  );
}

/**
 * Suporta arrastar o hábito até a coluna certa (Pointer Events — touch,
 * mouse e caneta) ou tocar no hábito e depois na coluna, para quem tem
 * dificuldade motora fina para um arrasto preciso. O card que se move é
 * literalmente uma cópia do próprio card (mesmo tamanho, mesma cor, mesmo
 * ícone) — o original some do lugar enquanto isso, para parecer que a
 * pessoa está de fato pegando e carregando aquele card, não um objeto à parte.
 */
export function SortActivity({ activity, onComplete }: SortActivityProps) {
  const startedAtRef = useRef(Date.now());
  const items = useMemo<SortItem[]>(() => shuffle(activity.items), [activity.items]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Só guarda os acertos — um erro não "consome" o hábito, ele volta pro
  // grupo pra pessoa tentar de novo (ver resolveItem).
  const [resolved, setResolved] = useState<Record<string, true>>({});
  const [finished, setFinished] = useState(false);
  const [drag, setDrag] = useState<{ itemId: string; x: number; y: number; picking: boolean } | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<Category | null>(null);
  const [dropFeedback, setDropFeedback] = useState<{ category: Category; outcome: Outcome } | null>(null);
  const [mistakeHint, setMistakeHint] = useState<string | null>(null);
  const dragMeta = useRef<{ itemId: string; startX: number; startY: number; moved: boolean } | null>(null);
  // Tentativas erradas contam pro resultado final (não-punitivo, mas real),
  // mesmo o hábito voltando pro grupo depois de errar.
  const incorrectAttemptsRef = useRef(0);

  const pending = items.filter((item) => !resolved[item.id]);
  const correctCount = Object.keys(resolved).length;

  const finish = () => {
    if (finished) return;
    setFinished(true);
    onComplete({
      correct: correctCount,
      incorrect: incorrectAttemptsRef.current,
      stepsCompleted: correctCount,
      totalSteps: items.length,
      durationMs: Date.now() - startedAtRef.current
    });
  };

  const resolveItem = (item: SortItem, category: Category) => {
    const outcome: Outcome = item.category === category ? 'correct' : 'incorrect';
    setDropFeedback({ category, outcome });
    window.setTimeout(() => setDropFeedback(null), 550);

    if (outcome === 'correct') {
      const next = { ...resolved, [item.id]: true as const };
      setResolved(next);
      if (Object.keys(next).length >= items.length) {
        window.setTimeout(finish, 500);
      }
      return;
    }

    // Errou: não sai do grupo — só orienta o que está errado, pra pessoa
    // arrastar de novo pro lugar certo, em vez de "resolver" por ela.
    incorrectAttemptsRef.current += 1;
    const correctLabel = item.category === 'eficiente' ? activity.categoryLabels.eficiente : activity.categoryLabels.desperdicio;
    setMistakeHint(`${item.explanation} Vai em "${correctLabel}" — tenta de novo!`);
    window.setTimeout(() => setMistakeHint(null), 4600);
  };

  const handlePickColumn = (category: Category) => {
    if (!selectedId) return;
    const item = items.find((i) => i.id === selectedId);
    if (!item) return;
    resolveItem(item, category);
    setSelectedId(null);
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLButtonElement>, itemId: string) => {
    // Sem isso, assim que o dedo sai da área do card os eventos de
    // pointermove/pointerup passam a ser entregues a quem estiver embaixo
    // dele (outro card, a coluna...), não mais a este botão — o arrasto
    // parece "preso" no lugar e trava ao soltar.
    e.currentTarget.setPointerCapture(e.pointerId);
    dragMeta.current = { itemId, startX: e.clientX, startY: e.clientY, moved: false };
    // feedback imediato de "pegar" o card, antes mesmo de mover
    setDrag({ itemId, x: e.clientX, y: e.clientY, picking: true });
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const meta = dragMeta.current;
    if (!meta) return;
    const dx = e.clientX - meta.startX;
    const dy = e.clientY - meta.startY;
    if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) meta.moved = true;
    setDrag({ itemId: meta.itemId, x: e.clientX, y: e.clientY, picking: !meta.moved });

    if (meta.moved) {
      const el = document.elementFromPoint(e.clientX, e.clientY - FINGER_OFFSET_Y);
      const zoneEl = el?.closest<HTMLElement>('[data-category]');
      setDragOverCategory((zoneEl?.dataset.category as Category) ?? null);
    }
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLButtonElement>, item: SortItem) => {
    const meta = dragMeta.current;
    dragMeta.current = null;
    setDrag(null);
    setDragOverCategory(null);
    if (!meta) return;

    if (meta.moved) {
      const el = document.elementFromPoint(e.clientX, e.clientY - FINGER_OFFSET_Y);
      const zoneEl = el?.closest<HTMLElement>('[data-category]');
      if (zoneEl) resolveItem(item, zoneEl.dataset.category as Category);
      return;
    }
    // toque simples (sem arrasto): seleciona para o fluxo alternativo tocar-e-tocar
    setSelectedId((current) => (current === item.id ? null : item.id));
  };

  // Rede de segurança: se o navegador cancelar o gesto no meio (ex: gesto de
  // sistema, mudança de orientação), o card não pode ficar preso "arrastando"
  // pra sempre — solta a captura e limpa o estado sem tentar resolver o drop.
  const handlePointerCancel = () => {
    dragMeta.current = null;
    setDrag(null);
    setDragOverCategory(null);
  };

  const draggingItem = drag ? items.find((i) => i.id === drag.itemId) : null;

  return (
    <div className="sort-activity">
      <p className="sort-activity__hint">
        {selectedId ? 'Agora toque na coluna certa' : 'Arraste (ou toque) um hábito para começar'}
      </p>

      <div className="sort-activity__pool">
        {pending.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sort-activity__item${selectedId === item.id ? ' sort-activity__item--selected' : ''}${drag?.itemId === item.id ? ' sort-activity__item--dragging' : ''}`}
            onPointerDown={(e) => handlePointerDown(e, item.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={(e) => handlePointerUp(e, item)}
            onPointerCancel={handlePointerCancel}
            style={{ touchAction: 'none' }}
          >
            <CardContent item={item} />
          </button>
        ))}
        {pending.length === 0 && <p className="sort-activity__done">Tudo organizado!</p>}
      </div>

      <div className="sort-activity__columns">
        <button
          type="button"
          data-category="eficiente"
          className={`sort-activity__column sort-activity__column--good${dragOverCategory === 'eficiente' ? ' sort-activity__column--over' : ''}${dropFeedback?.category === 'eficiente' ? ` sort-activity__column--${dropFeedback.outcome}` : ''}`}
          onClick={() => handlePickColumn('eficiente')}
          disabled={!selectedId}
        >
          <span className="sort-activity__column-icon">
            <Icon name="check" size={26} strokeWidth={2.4} color="#fff" />
          </span>
          <span className="sort-activity__column-label">{activity.categoryLabels.eficiente}</span>
          <span className="sort-activity__column-count">{items.filter((i) => resolved[i.id] && i.category === 'eficiente').length}</span>
        </button>
        <button
          type="button"
          data-category="desperdicio"
          className={`sort-activity__column sort-activity__column--bad${dragOverCategory === 'desperdicio' ? ' sort-activity__column--over' : ''}${dropFeedback?.category === 'desperdicio' ? ` sort-activity__column--${dropFeedback.outcome}` : ''}`}
          onClick={() => handlePickColumn('desperdicio')}
          disabled={!selectedId}
        >
          <span className="sort-activity__column-icon">
            <Icon name="close" size={26} strokeWidth={2.4} color="#fff" />
          </span>
          <span className="sort-activity__column-label">{activity.categoryLabels.desperdicio}</span>
          <span className="sort-activity__column-count">{items.filter((i) => resolved[i.id] && i.category === 'desperdicio').length}</span>
        </button>
      </div>

      {draggingItem && drag && (
        <motion.div
          className="sort-activity__item sort-activity__item--flying"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            left: drag.x,
            top: drag.y - FINGER_OFFSET_Y,
            scale: drag.picking ? 1.05 : 1.12,
            rotate: drag.picking ? 0 : -4
          }}
          // A posição segue o dedo em tempo real (sem mola) — uma mola,
          // mesmo "rígida", sempre corre atrás do valor mais novo a cada
          // pointermove, e isso lido junto com vários eventos por segundo
          // dá a sensação de o card se mover em câmera lenta / atrasado em
          // relação ao dedo. Só escala e rotação (feedback de "pegar" o
          // card) usam mola — não precisam acompanhar o dedo 1:1.
          transition={{ left: { duration: 0 }, top: { duration: 0 }, default: { type: 'spring', stiffness: 700, damping: 40 } }}
          aria-hidden="true"
        >
          <CardContent item={draggingItem} />
        </motion.div>
      )}

      <AnimatePresence>
        {mistakeHint && (
          <motion.div
            className="sort-activity__mistake"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <Icon name="bulb" size={18} />
            <span>{mistakeHint}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
