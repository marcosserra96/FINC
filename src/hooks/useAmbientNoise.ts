import { useEffect } from 'react';

const VOLUME = 0.05;
const FADE_MS = 600;

/**
 * Ruído rosa suave (mais agradável ao ouvido que ruído branco puro — menos
 * agudo, mais "abafado") gerado em tempo real via Web Audio API, sem
 * depender de nenhum arquivo de áudio externo — funciona 100% offline,
 * igual ao resto do totem. Toca só enquanto `enabled` for true (atividade
 * aberta e som ligado no admin).
 *
 * Algoritmo de Paul Kellet (aproximação de -3dB/oitava amplamente usada
 * pra gerar ruído rosa a partir de ruído branco com poucas linhas de código).
 */
export function useAmbientNoise(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();

    const bufferSize = 4096;
    const node = ctx.createScriptProcessor(bufferSize, 1, 1);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    node.onaudioprocess = (event) => {
      const output = event.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        output[i] = pink * 0.08;
      }
    };

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + FADE_MS / 1000);
    node.connect(gain).connect(ctx.destination);

    // Alguns navegadores criam o AudioContext suspenso até uma interação —
    // como esse hook só roda depois de vários toques (atração → faixa
    // etária → atividade), resume() deve funcionar sem bloqueio.
    ctx.resume().catch(() => {});

    return () => {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + FADE_MS / 1000);
      window.setTimeout(() => {
        node.disconnect();
        gain.disconnect();
        ctx.close().catch(() => {});
      }, FADE_MS);
    };
  }, [enabled]);
}
