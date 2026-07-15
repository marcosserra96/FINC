import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'success';
type Size = 'lg' | 'md';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}

const TAP_GUARD_MS = 400;

/**
 * Botão único para toda a experiência pública: já resolve a área tocável
 * mínima, o feedback de toque e o bloqueio contra duplo toque acidental
 * (comum quando alguém toca duas vezes rápido tentando "confirmar").
 */
export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon,
  disabled = false,
  fullWidth = false,
  ariaLabel
}: ButtonProps) {
  const lastPress = useRef(0);

  const handleClick = () => {
    const now = Date.now();
    if (disabled || now - lastPress.current < TAP_GUARD_MS) return;
    lastPress.current = now;
    onPress();
  };

  return (
    <motion.button
      type="button"
      className={`btn btn--${variant} btn--${size}${fullWidth ? ' btn--full' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ duration: 0.12 }}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
