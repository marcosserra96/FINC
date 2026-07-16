import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import './AttractTicker.css';

const ROTATE_MS = 10000;

/**
 * Banner de curiosidades da tela de atração — a vitrine do totem precisa
 * ter movimento e mensagens curtas mesmo sem ninguém interagindo. Troca de
 * frase sozinho; o conteúdo vem do admin (Textos e mensagens), então dá
 * pra editar/adicionar curiosidades sem mexer em código.
 */
export function AttractTicker() {
  const { state } = useApp();
  const items = state.config.attractCuriosities;
  const [index, setIndex] = useState(0);
  const reducedMotion = state.config.reducedMotion;

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="attract-ticker">
      <span className="attract-ticker__icon">
        <Icon name="bulb" size={16} />
      </span>
      <div className="attract-ticker__viewport">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="attract-ticker__text"
            initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
