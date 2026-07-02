export const HOUSE_CHOICES = [
  {
    id: 'iluminacao',
    question: 'Qual lâmpada é melhor para sua casa?',
    options: [
      {
        text: 'Lâmpada de LED',
        icon: 'led',
        efficient: true,
        tip: 'A lâmpada de LED gasta bem menos energia para fazer a mesma luz.',
      },
      {
        text: 'Lâmpada incandescente antiga',
        icon: 'bulb',
        efficient: false,
        tip: 'A lâmpada incandescente gasta bem mais energia que a de LED.',
      },
    ],
  },
  {
    id: 'banho',
    question: 'Qual banho gasta menos energia?',
    options: [
      {
        text: 'Banho mais curto',
        icon: 'shower',
        efficient: true,
        tip: 'Banhos mais curtos reduzem bastante o consumo do chuveiro elétrico.',
      },
      {
        text: 'Banho bem demorado',
        icon: 'clock',
        efficient: false,
        tip: 'Quanto mais tempo o chuveiro elétrico fica ligado, mais energia ele gasta.',
      },
    ],
  },
  {
    id: 'ar-condicionado',
    question: 'Como usar o ar-condicionado do jeito certo?',
    options: [
      {
        text: 'Com a janela fechada',
        icon: 'curtain',
        efficient: true,
        tip: 'Com o ambiente fechado, o ar-condicionado esfria mais rápido e gasta menos.',
      },
      {
        text: 'Com a janela aberta',
        icon: 'window',
        efficient: false,
        tip: 'Com a janela aberta, o ar sai e o aparelho trabalha mais para esfriar.',
      },
    ],
  },
  {
    id: 'standby',
    question: 'O que fazer com o carregador sem uso?',
    options: [
      {
        text: 'Desligar da tomada',
        icon: 'plug',
        efficient: true,
        tip: 'Desligar da tomada evita o consumo invisível do modo stand-by.',
      },
      {
        text: 'Deixar ligado o dia todo',
        icon: 'charger',
        efficient: false,
        tip: 'Aparelhos ligados na tomada sem uso continuam gastando um pouco de energia.',
      },
    ],
  },
  {
    id: 'geladeira',
    question: 'Como usar a geladeira do jeito certo?',
    options: [
      {
        text: 'Abrir rápido e fechar em seguida',
        icon: 'fridge',
        efficient: true,
        tip: 'Fechar a geladeira rápido evita que ela gaste energia extra para esfriar de novo.',
      },
      {
        text: 'Ficar com a porta aberta pensando',
        icon: 'clock',
        efficient: false,
        tip: 'Porta aberta por muito tempo faz a geladeira gastar mais energia para se manter fria.',
      },
    ],
  },
  {
    id: 'luz-natural',
    question: 'Qual a melhor forma de iluminar de dia?',
    options: [
      {
        text: 'Aproveitar a luz do sol',
        icon: 'sun',
        efficient: true,
        tip: 'A luz do sol é de graça e substitui a lâmpada acesa durante o dia.',
      },
      {
        text: 'Cortina fechada com luz acesa',
        icon: 'curtain',
        efficient: false,
        tip: 'Fechar a cortina e acender a luz durante o dia é desperdício de energia.',
      },
    ],
  },
]
