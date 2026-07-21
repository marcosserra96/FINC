import type {
  ActivityConfig,
  QuizActivityConfig,
  MemoryActivityConfig,
  SortActivityConfig,
  ScenarioActivityConfig
} from '@/types';

// Conteúdo educativo revisado: nenhuma afirmação numérica ou técnica absoluta.
// Sempre que o efeito depende do aparelho/uso, o texto fica no campo do
// "costuma" / "pode ajudar", nunca de uma regra fechada.

const quizRelampago: QuizActivityConfig = {
  id: 'quiz-relampago',
  type: 'quiz',
  name: 'Quiz Relâmpago',
  shortDescription: 'Verdadeiro ou falso sobre o dia a dia com energia',
  instructions: 'Toque em Verdadeiro ou Falso para cada frase.',
  icon: 'bolt',
  themeColor: '#009FC2',
  active: true,
  order: 1,
  estimatedDurationSeconds: 150,
  difficulty: 'facil',
  completionCriteria: { minCorrectRatio: 0.7, minStepsCompleted: 4 },
  resultMessages: {
    perfect: 'Você acertou todas! Esses hábitos já fazem parte do seu dia a dia.',
    good: 'Pequenos hábitos, repetidos todos os dias, fazem diferença no consumo de energia da casa.',
    needsWork: 'Cada acerto é um hábito a mais pra guardar — vale tentar de novo e ver quanto você lembra.'
  },
  giftEligible: true,
  questions: [
    {
      id: 'q1',
      prompt: 'Carregador conectado à tomada, mesmo sem o celular, pode continuar consumindo energia.',
      answer: true,
      explanation: 'Por isso vale o hábito de retirá-lo da tomada quando não estiver carregando nada.',
      icon: 'charger'
    },
    {
      id: 'q2',
      prompt: 'O Selo Procel ajuda a identificar os aparelhos mais eficientes de cada categoria.',
      answer: true,
      explanation: 'Ele é uma referência para comparar o consumo entre modelos parecidos na hora da compra.',
      icon: 'star'
    },
    {
      id: 'q3',
      prompt: 'Deixar espaço livre atrás da geladeira não faz diferença nenhuma para o aparelho.',
      answer: false,
      explanation: 'Um espaço para ventilar costuma ajudar o motor a trabalhar de forma mais tranquila.',
      icon: 'fridge'
    },
    {
      id: 'q4',
      prompt: 'Colocar o ar-condicionado na temperatura mais baixa possível esfria o ambiente "mais rápido", sem gastar mais.',
      answer: false,
      explanation: 'Quanto mais baixa a temperatura escolhida, mais tempo o aparelho tende a trabalhar.',
      icon: 'ac'
    },
    {
      id: 'q5',
      prompt: 'Aproveitar a luz do dia é uma forma simples de economizar energia elétrica.',
      answer: true,
      explanation: 'Abrir cortinas e persianas durante o dia reduz a necessidade de luz artificial.',
      icon: 'window'
    },
    {
      id: 'q6',
      prompt: 'Aparelhos em modo de espera (aquela luzinha acesa) nunca consomem energia.',
      answer: false,
      explanation: 'O modo de espera costuma consumir menos que o uso normal, mas raramente é zero.',
      icon: 'tv'
    },
    {
      id: 'q7',
      prompt: 'Rodar a máquina de lavar com a carga cheia (dentro do limite indicado) costuma aproveitar melhor cada ciclo do que várias cargas pela metade.',
      answer: true,
      explanation: 'Cada ciclo gasta uma quantidade parecida de água e energia, então poucas cargas cheias tendem a valer mais a pena.',
      icon: 'washer'
    },
    {
      id: 'q8',
      prompt: 'O tempo que a pessoa passa no chuveiro elétrico não tem nenhuma relação com o consumo de energia.',
      answer: false,
      explanation: 'Quanto mais tempo o chuveiro elétrico fica ligado, mais energia ele tende a consumir.',
      icon: 'shower'
    },
    {
      id: 'q9',
      prompt: 'Ficar com a porta da geladeira aberta enquanto decide o que pegar não influencia o consumo do aparelho.',
      answer: false,
      explanation: 'Toda vez que a porta fica aberta, o ar frio escapa e o motor tende a trabalhar mais para recuperar a temperatura.',
      icon: 'fridge'
    },
    {
      id: 'q10',
      prompt: 'Aparelhos eletrônicos mais antigos tendem, em geral, a consumir mais energia do que modelos atuais equivalentes.',
      answer: true,
      explanation: 'A eficiência dos aparelhos costuma evoluir com o tempo, por isso vale considerar o consumo na hora de trocar um equipamento antigo.',
      icon: 'tv'
    }
  ]
};

const memoriaEnergia: MemoryActivityConfig = {
  id: 'memoria-energia',
  type: 'memory',
  name: 'Memória da Energia',
  shortDescription: 'Encontre os pares e descubra dicas de consumo consciente',
  instructions: 'Toque em duas cartas para tentar formar um par.',
  icon: 'cards',
  themeColor: '#F37021',
  active: true,
  order: 2,
  estimatedDurationSeconds: 75,
  difficulty: 'facil',
  completionCriteria: { minCorrectRatio: 0.4, minStepsCompleted: 4 },
  resultMessages: {
    perfect: 'Memória afiada! Você lembrou de todos os pares — e das dicas junto.',
    good: 'Cada aparelho tem um jeito simples de economizar — o segredo é lembrar deles no dia a dia.',
    needsWork: 'Nem todo par precisa vir de primeira — o importante é ir se familiarizando com as dicas.'
  },
  giftEligible: false,
  pairs: [
    { id: 'p1', icon: 'bulb', label: 'Lâmpada LED', tip: 'LED costuma consumir menos energia para o mesmo brilho.', image: 'images/memory/bulb.png' },
    { id: 'p2', icon: 'shower', label: 'Chuveiro', tip: 'Um banho mais rápido é uma das formas mais simples de economizar energia.', image: 'images/memory/shower.png' },
    { id: 'p3', icon: 'fan', label: 'Ventilador', tip: 'O ventilador costuma consumir bem menos energia do que o ar-condicionado para o mesmo conforto.', image: 'images/memory/fan.png' },
    { id: 'p4', icon: 'fridge', label: 'Geladeira', tip: 'Um espaço livre atrás ajuda o motor a trabalhar de forma mais tranquila.', image: 'images/memory/fridge.png' },
    { id: 'p5', icon: 'tv', label: 'Televisão', tip: 'Desligar de vez, e não só deixar em espera, evita desperdício.', image: 'images/memory/tv.png' },
    { id: 'p6', icon: 'window', label: 'Luz natural', tip: 'Abrir as cortinas de dia reduz a necessidade de luz artificial.', image: 'images/memory/window.png' }
  ]
};

const organizeHabitos: SortActivityConfig = {
  id: 'organize-habitos',
  type: 'sort',
  name: 'Organize os Hábitos',
  shortDescription: 'Separe atitudes eficientes de desperdícios',
  instructions: 'Arraste o hábito até a coluna certa (ou toque nele e depois na coluna).',
  icon: 'sort',
  themeColor: '#F37021',
  active: true,
  order: 3,
  estimatedDurationSeconds: 60,
  difficulty: 'facil',
  completionCriteria: { minCorrectRatio: 0.7, minStepsCompleted: 8 },
  resultMessages: {
    perfect: 'Você separou tudo certinho! Já sabe identificar hábito eficiente de desperdício de cara.',
    good: 'Consumo consciente é feito de hábitos simples repetidos no dia a dia.',
    needsWork: 'Alguns hábitos confundem mesmo — a explicação de cada um ficou logo ali na revisão.'
  },
  giftEligible: true,
  categoryLabels: { eficiente: 'Hábito eficiente', desperdicio: 'Desperdício' },
  items: [
    {
      id: 'h1',
      label: 'Desligar as luzes ao sair do ambiente',
      icon: 'bulb',
      category: 'eficiente',
      explanation: 'Uma lâmpada acesa num cômodo vazio é energia consumida à toa — desligar ao sair é simples e economiza de verdade.'
    },
    {
      id: 'h2',
      label: 'Aproveitar a luz natural durante o dia',
      icon: 'window',
      category: 'eficiente',
      explanation: 'Usar a luz do sol durante o dia evita ligar lâmpadas sem necessidade.'
    },
    {
      id: 'h3',
      label: 'Retirar o carregador da tomada quando não usar',
      icon: 'charger',
      category: 'eficiente',
      explanation: 'Carregadores ligados na tomada, mesmo sem o aparelho conectado, ainda consomem uma pequena quantidade de energia.'
    },
    {
      id: 'h4',
      label: 'Regular o ar-condicionado em temperatura moderada',
      icon: 'ac',
      category: 'eficiente',
      explanation: 'Temperaturas muito baixas fazem o aparelho trabalhar mais para manter o ambiente frio, consumindo mais energia.'
    },
    {
      id: 'h5',
      label: 'Deixar a TV ligada sem ninguém assistindo',
      icon: 'tv',
      category: 'desperdicio',
      explanation: 'Um aparelho ligado sem uso é energia consumida sem necessidade nenhuma.'
    },
    {
      id: 'h6',
      label: 'Ficar com a geladeira aberta enquanto decide o que pegar',
      icon: 'fridge',
      category: 'desperdicio',
      explanation: 'Cada segundo com a porta aberta faz o motor trabalhar mais para manter a temperatura interna.'
    },
    {
      id: 'h7',
      label: 'Usar o ferro elétrico várias vezes ao dia para poucas peças',
      icon: 'iron',
      category: 'desperdicio',
      explanation: 'O ferro gasta bastante energia para esquentar — juntar as roupas e passar de uma vez é bem mais eficiente.'
    },
    {
      id: 'h8',
      label: 'Deixar aparelhos em modo de espera o dia inteiro',
      icon: 'standby',
      category: 'desperdicio',
      explanation: 'O modo de espera consome menos que o uso normal, mas não é zero — ao longo do dia todo, isso soma.'
    }
  ]
};

const casaEficiente: ScenarioActivityConfig = {
  id: 'casa-eficiente',
  type: 'scenario',
  name: 'Casa Eficiente',
  shortDescription: 'Escolha a atitude mais consciente em cada situação',
  instructions: 'Leia a situação e toque na atitude mais consciente.',
  icon: 'house',
  themeColor: '#009FC2',
  active: true,
  order: 4,
  estimatedDurationSeconds: 150,
  difficulty: 'facil',
  completionCriteria: { minCorrectRatio: 0.7, minStepsCompleted: 4 },
  resultMessages: {
    perfect: 'Você acertou todas as situações! Sua intuição pra escolhas conscientes está afiada.',
    good: 'Em cada situação do dia a dia existe uma escolha mais consciente — o segredo é ir prestando atenção nelas.',
    needsWork: 'Situações do dia a dia nem sempre têm resposta óbvia — vale tentar de novo pra pegar o jeito.'
  },
  giftEligible: true,
  cases: [
    {
      id: 'c1',
      situation: 'Vou ligar o ar-condicionado.',
      situationIcon: 'ac',
      explanation: 'Com portas e janelas fechadas, o ambiente esfria mais rápido e o aparelho não fica compensando o ar quente de fora.',
      options: [
        { id: 'a', label: 'Fechar portas e janelas', icon: 'door', correct: true },
        { id: 'b', label: 'Deixar portas e janelas abertas', icon: 'window', correct: false }
      ]
    },
    {
      id: 'c2',
      situation: 'Vou sair do quarto por um tempo.',
      situationIcon: 'bulb',
      explanation: 'Luz acesa em ambiente vazio é um dos desperdícios mais simples de evitar.',
      options: [
        { id: 'a', label: 'Apagar a luz', icon: 'bulb', correct: true },
        { id: 'b', label: 'Deixar a luz acesa', icon: 'bulb', correct: false }
      ]
    },
    {
      id: 'c3',
      situation: 'Terminei de carregar o celular.',
      situationIcon: 'charger',
      explanation: 'Um carregador ligado à toa continua puxando uma pequena quantidade de energia da tomada.',
      options: [
        { id: 'a', label: 'Tirar o carregador da tomada', icon: 'charger', correct: true },
        { id: 'b', label: 'Deixar o carregador na tomada', icon: 'charger', correct: false }
      ]
    },
    {
      id: 'c4',
      situation: 'Preciso passar algumas roupas.',
      situationIcon: 'iron',
      explanation: 'Cada vez que o ferro esquenta do zero, ele costuma gastar mais do que continuar um uso já em andamento.',
      options: [
        { id: 'a', label: 'Juntar as peças e passar de uma vez', icon: 'iron', correct: true },
        { id: 'b', label: 'Ligar o ferro várias vezes ao dia para poucas peças', icon: 'iron', correct: false }
      ]
    },
    {
      id: 'c5',
      situation: 'É dia e o sol está entrando pela janela.',
      situationIcon: 'window',
      explanation: 'Aproveitar a luz do dia é uma das formas mais simples de economizar energia.',
      options: [
        { id: 'a', label: 'Aproveitar a luz natural, com as luzes apagadas', icon: 'window', correct: true },
        { id: 'b', label: 'Ligar as luzes mesmo com o sol entrando', icon: 'bulb', correct: false }
      ]
    },
    {
      id: 'c6',
      situation: 'Vou dormir e a TV do quarto ficou ligada.',
      situationIcon: 'tv',
      explanation: 'Além de gastar energia à toa, dormir com a TV ligada nem ajuda a descansar melhor.',
      options: [
        { id: 'a', label: 'Desligar a TV', icon: 'tv', correct: true },
        { id: 'b', label: 'Deixar ligada "de fundo"', icon: 'standby', correct: false }
      ]
    },
    {
      id: 'c7',
      situation: 'Vou lavar roupa e tenho poucas peças.',
      situationIcon: 'washer',
      explanation: 'Rodar a máquina com a carga cheia (dentro do limite) costuma aproveitar melhor cada ciclo do que várias cargas pela metade.',
      options: [
        { id: 'a', label: 'Esperar juntar mais roupa para uma carga cheia', icon: 'washer', correct: true },
        { id: 'b', label: 'Ligar a máquina assim mesmo, só com essas peças', icon: 'washer', correct: false }
      ]
    },
    {
      id: 'c8',
      situation: 'Estou escolhendo uma lâmpada nova para casa.',
      situationIcon: 'bulb',
      explanation: 'Lâmpadas LED costumam converter mais energia em luz e consumir menos para o mesmo brilho.',
      options: [
        { id: 'a', label: 'Escolher um modelo LED', icon: 'bulb', correct: true },
        { id: 'b', label: 'Escolher o mais barato, sem olhar o tipo', icon: 'bulb', correct: false }
      ]
    },
    {
      id: 'c9',
      situation: 'Estou decidindo o que pegar na geladeira.',
      situationIcon: 'fridge',
      explanation: 'Quanto mais tempo a porta fica aberta, mais ar frio escapa — e o motor trabalha mais para recuperar a temperatura.',
      options: [
        { id: 'a', label: 'Decidir antes de abrir a porta', icon: 'fridge', correct: true },
        { id: 'b', label: 'Abrir e ficar pensando com a porta aberta', icon: 'door', correct: false }
      ]
    },
    {
      id: 'c10',
      situation: 'Vou comprar um aparelho novo e tem dois modelos parecidos.',
      situationIcon: 'shield',
      explanation: 'O Selo Procel ajuda a comparar a eficiência entre modelos parecidos antes de decidir.',
      options: [
        { id: 'a', label: 'Comparar o Selo Procel dos dois modelos', icon: 'shield', correct: true },
        { id: 'b', label: 'Escolher sem olhar a etiqueta de eficiência', icon: 'shield', correct: false }
      ]
    }
  ]
};

export const DEFAULT_ACTIVITIES: ActivityConfig[] = [
  quizRelampago,
  memoriaEnergia,
  organizeHabitos,
  casaEficiente
];
