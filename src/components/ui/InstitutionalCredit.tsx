import './InstitutionalCredit.css';

/**
 * Créditos institucionais (Energisa + PEE + ANEEL), exigidos em materiais de
 * programas de eficiência energética regulados pela ANEEL — logo fornecida
 * pela Energisa (marca institucional, não deve ser redesenhada). O arquivo
 * em `public/institutional/energisa-pee-aneel.svg` foi vetorizado a partir
 * do original (public/institutional/energisa-pee-aneel-source.png) com
 * potrace, preservando o layout e as formas exatas — apenas convertendo
 * pixels em curvas vetoriais para ficar nítido em qualquer resolução.
 */
export function InstitutionalCredit() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}institutional/energisa-pee-aneel.svg`}
      alt="Energisa — PEE Programa de Eficiência Energética — ANEEL Agência Nacional de Energia Elétrica"
      className="institutional-credit"
    />
  );
}
