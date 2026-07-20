// Paleta derivada da marca Energisa — usada para dar cor aos crachás de
// ícone nas atividades, sem inventar tons fora da identidade visual.
// Só as duas cores puras da marca, sem variantes claras/escuras.
const BADGE_PALETTE = [
  'var(--color-blue)',
  'var(--color-orange)'
];

/**
 * Mesma chave sempre gera a mesma cor (importante no jogo da memória: as
 * duas cartas de um par usam o mesmo ícone, então saem com a mesma cor).
 */
export function colorForKey(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return BADGE_PALETTE[hash % BADGE_PALETTE.length];
}
