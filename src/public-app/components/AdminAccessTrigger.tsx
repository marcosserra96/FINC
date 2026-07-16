import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TAPS_REQUIRED = 5;
const TAP_WINDOW_MS = 2500;

/**
 * Zona invisível no canto da tela de atração: 5 toques em sequência abrem
 * o acesso administrativo. Não aparece para o visitante comum e não
 * interfere em nenhum fluxo público.
 */
export function AdminAccessTrigger() {
  const navigate = useNavigate();
  const tapsRef = useRef<number[]>([]);

  const handleTap = () => {
    const now = Date.now();
    tapsRef.current = [...tapsRef.current, now].filter((t) => now - t < TAP_WINDOW_MS);
    if (tapsRef.current.length >= TAPS_REQUIRED) {
      tapsRef.current = [];
      navigate('/admin');
    }
  };

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-hidden="true"
      tabIndex={-1}
      style={{
        // position: fixed (não absolute) — o pai (.screen-shell__content)
        // pode ficar preso numa faixa mais baixa da tela no modo altura
        // baixa, e um "absolute" aqui acompanharia esse deslocamento,
        // saindo do canto de verdade da tela.
        position: 'fixed',
        top: 0,
        right: 0,
        width: 90,
        height: 90,
        background: 'transparent',
        border: 'none',
        zIndex: 10,
        cursor: 'default'
      }}
    />
  );
}
