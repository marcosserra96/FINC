import { storage, STORAGE_KEYS } from './storage';
import type { AppConfig } from '@/types';
import { DEFAULT_APP_VERSION } from '@/types';

export const DEFAULT_CONFIG: AppConfig = {
  eventName: 'Energisa nos Eventos',
  appVersion: DEFAULT_APP_VERSION,
  texts: {
    attractTitle: 'Vamos falar de\nenergia?',
    attractSubtitle: 'Toque na tela para começar',
    startCta: 'Toque para começar',
    activitySelectTitle: 'Escolha um desafio',
    completionTitle: 'Muito bem!',
    completionMessage: 'Você concluiu o desafio e aprendeu algo novo sobre consumo consciente.',
    giftInstructions: 'Mostre este código para a nossa equipe e retire seu brinde.',
    noGiftsMessage: 'Os brindes de hoje acabaram, mas o aprendizado fica com você. Obrigado por participar!',
    closingMessage: 'Obrigado por participar! Até a próxima.'
  },
  idleTimeoutSeconds: 45,
  activitySelectionMode: 'visitorChoice',
  soundEnabled: true,
  reducedMotion: false,
  intenseAnimationsEnabled: true,
  quizQuestionCount: 10,
  scenarioCaseCount: 10,
  attractCuriosities: [
    // Eficiência energética no dia a dia
    'Você sabia? Trocar lâmpadas antigas por modelos LED costuma reduzir bastante o consumo para a mesma iluminação.',
    'Curiosidade: aparelhos em modo de espera costumam consumir menos que o uso normal, mas raramente é zero.',
    'Dica rápida: deixar um espaço livre atrás da geladeira ajuda o motor a trabalhar de forma mais tranquila.',
    'Você sabia? Aproveitar a luz natural durante o dia é uma das formas mais simples de economizar energia.',
    'Curiosidade: o Selo Procel ajuda a comparar a eficiência energética entre aparelhos parecidos na hora da compra.',
    'Dica: juntar as roupas para passar de uma vez costuma ser mais eficiente do que ligar o ferro várias vezes ao dia.',
    'Você sabia? Pequenos hábitos repetidos todos os dias fazem mais diferença no consumo do que uma mudança isolada.',
    'Curiosidade: manter portas e janelas fechadas com o ar-condicionado ligado ajuda o ambiente a esfriar mais rápido.',
    'Dica: ventiladores costumam consumir bem menos energia do que o ar-condicionado para o mesmo conforto térmico.',
    'Curiosidade: tirar o aparelho da tomada, e não só desligar no botão, evita o consumo do modo de espera.',

    // Energia elétrica, curiosidades gerais
    'Curiosidade: o Brasil é um dos poucos países do mundo com uma matriz elétrica majoritariamente renovável, com forte presença de hidrelétricas.',
    'Você sabia? A energia elétrica é gerada praticamente no mesmo instante em que é consumida — armazená-la em grande escala ainda é um desafio.',
    'Curiosidade: "kWh" (quilowatt-hora) é a unidade usada para medir o consumo de energia na sua conta de luz.',
    'Você sabia? Antes de chegar até sua casa, a energia percorre um caminho que passa pela geração, transmissão e distribuição.',

    // História da Energisa
    'Curiosidade: a história da Energisa começou em 1905, em Cataguases (MG), com o nome de Companhia Força e Luz Cataguases-Leopoldina.',
    'Você sabia? Em 1908, a empresa que deu origem à Energisa inaugurou a Usina Maurício, uma das primeiras hidrelétricas do Brasil.',
    'Curiosidade: o nome "Energisa" só passou a existir em 2008, quando o antigo Grupo Cataguases-Leopoldina ganhou uma nova marca.',
    'Você sabia? Com mais de 120 anos de história, a Energisa é uma das empresas mais antigas do setor elétrico brasileiro.',
    'Curiosidade: hoje a Energisa leva energia a mais de 11 estados brasileiros, de Norte a Sudeste.',
    'Você sabia? A Energisa é um dos maiores grupos de distribuição de energia do Brasil, com capital 100% nacional.'
  ],
  giftConfig: {
    enabled: false,
    totalAvailable: 200,
    remaining: 200,
    codeExpiryMinutes: 10,
    cooldownMinutes: 15,
    requireStaffConfirmation: true
  },
  eventModeActive: true,
  dataRetentionDays: 30
};

export function loadConfig(): AppConfig {
  const stored = storage.get<Partial<AppConfig> | null>(STORAGE_KEYS.appConfig, null);
  if (!stored) return DEFAULT_CONFIG;
  // merge raso garante que novas chaves de versões futuras não quebrem configs antigas salvas
  return {
    ...DEFAULT_CONFIG,
    ...stored,
    texts: { ...DEFAULT_CONFIG.texts, ...stored.texts },
    giftConfig: { ...DEFAULT_CONFIG.giftConfig, ...stored.giftConfig }
  };
}

export function saveConfig(config: AppConfig): void {
  storage.set(STORAGE_KEYS.appConfig, config);
}

export function resetConfig(): AppConfig {
  storage.remove(STORAGE_KEYS.appConfig);
  return DEFAULT_CONFIG;
}
