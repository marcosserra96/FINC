import type { CSSProperties, ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  selected?: boolean;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, onPress, selected, accentColor, className = '', style }: CardProps) {
  const Tag = onPress ? 'button' : 'div';
  return (
    <Tag
      type={onPress ? 'button' : undefined}
      className={`card${onPress ? ' card--pressable' : ''}${selected ? ' card--selected' : ''} ${className}`}
      onClick={onPress}
      style={{ ...(accentColor ? { ['--card-accent' as string]: accentColor } : {}), ...style }}
    >
      {children}
    </Tag>
  );
}
