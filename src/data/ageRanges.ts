import type { AgeRangeId } from '@/types';

export interface AgeRangeOption {
  id: AgeRangeId;
  label: string;
  range: string;
  accentColor: string;
}

// Faixas amplas pensadas pra caber em botões grandes de toque: Criança e
// Adolescente seguem o ECA (Lei 8.069/90); Idoso segue o Estatuto do Idoso
// (Lei 10.741/03). Não existe uma classificação oficial única combinando
// rótulo + faixa nesse formato — essa é a composição prática adotada aqui.
export const AGE_RANGES: AgeRangeOption[] = [
  { id: 'child', label: 'Criança', range: 'até 12 anos', accentColor: 'var(--color-blue)' },
  { id: 'teen', label: 'Adolescente', range: '13 a 17 anos', accentColor: 'var(--color-orange)' },
  { id: 'adult', label: 'Adulto', range: '18 a 59 anos', accentColor: 'var(--color-blue)' },
  { id: 'senior', label: 'Idoso', range: '60 anos ou mais', accentColor: 'var(--color-orange)' }
];
