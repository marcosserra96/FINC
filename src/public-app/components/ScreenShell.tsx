import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { useApp } from '@/store/AppContext';
import './ScreenShell.css';

interface ScreenShellProps {
  children: ReactNode;
  padded?: boolean;
}

export function ScreenShell({ children, padded = true }: ScreenShellProps) {
  const { state } = useApp();
  const duration = state.config.reducedMotion ? 0.05 : 0.32;
  const distance = state.config.reducedMotion ? 0 : 16;

  return (
    <div className="screen-shell">
      <ScreenBackground />
      <motion.div
        className={`screen-shell__content${padded ? ' screen-shell__content--padded' : ''}`}
        initial={{ opacity: 0, y: distance }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -distance }}
        transition={{ duration, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
