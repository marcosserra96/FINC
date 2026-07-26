# 5. Manual rápido — equipe do estande

Guia para quem vai operar o totem no dia do evento, sem precisar entender de programação.

## Antes de ligar o totem

1. Confirme que o equipamento está carregado / na tomada.
2. Abra o totem na tela cheia (peça para o time técnico deixar isso pronto antes do evento).
3. Se possível, deixe instalado como aplicativo (PWA) — assim ele abre direto, sem barra de navegador.
4. Toque na tela de atração uma vez para confirmar que está tudo respondendo.

## Acessando o painel administrativo

- Vá até `SEU-LINK/#/admin`, **ou** toque 5 vezes seguidas no canto superior direito da tela de atração (é uma área invisível, do tamanho de um quadrado de uns 3cm).
- Digite o PIN administrativo (padrão de fábrica: **2025** — confirme com o time técnico se foi trocado para o evento).
- Para sair, use o botão "Sair" no menu lateral, ou simplesmente toque em "Ver painel público".

## O que configurar antes do evento

O painel foi simplificado a pedido do usuário para só as três coisas usadas no dia a dia: **Atividades**, **Textos e mensagens** e **Participação**. Tudo o mais (som ambiente, tempo de inatividade, brindes, retenção de dados...) continua funcionando normalmente, só que com valores fixos definidos no código em vez de uma tela própria — se precisar ajustar algo disso pra um evento específico, peça pro time técnico mudar direto no código (`src/services/configService.ts`) ou pra reincluir a seção correspondente no painel.

Na seção **Textos e mensagens**: coloque o nome do evento.

Na seção **Atividades**: os brindes vêm **ativados** por padrão para as quatro atividades (o toggle de habilitar/desabilitar brindes no geral foi removido do painel — hoje é sempre `true` no código). Em Quiz Relâmpago, Organize os Hábitos e Casa Eficiente o critério pra ganhar é acertar pelo menos 70% (ajustável por atividade em **Acerto mínimo para concluir**); na Memória da Energia o critério é diferente — como o jogo só termina quando todos os pares são encontrados, não existe um "70%" que faça sentido, então só ganha quem lembra de todos os pares sem nenhuma tentativa errada (ver docs/02-atividades.md). Quem não atinge o critério da sua atividade vê a tela "Bom começo!", não-punitiva, convidando a tentar de novo.

O tempo de inatividade até reiniciar (padrão 45s), o limite de tempo por atividade (padrão 2x o tempo estimado de cada uma) e o som ambiente ficaram com valores fixos, sem tela própria — se o ambiente for muito barulhento ou tiver fila grande e isso precisar mudar pontualmente, é um ajuste rápido pro time técnico fazer no código antes do evento.

## Durante o evento — entregando brindes

1. A pessoa da equipe acompanha o jogo ao vivo, do lado do visitante (ou olhando a tela).
2. Se o visitante atingir o critério mínimo numa atividade elegível a brinde, a própria tela de resultado já mostra confete e o aviso "Você ganhou um brinde! Chame nossa equipe pra retirar" — sem código, sem QR, sem tela extra.
3. Entregue o brinde na hora. Não existe confirmação nem registro de código no painel — a equipe decide na prática (ex: não repetir brinde pra quem já jogou na sua frente).

## Se algo travar ou parecer estranho

- Toque no botão "Recomeçar" (canto superior esquerdo, em qualquer tela) — isso reinicia a sessão sem precisar mexer no equipamento.
- Se a tela mostrar uma mensagem de erro, ela sempre vem com um botão único de recomeçar — toque nele.
- Sem internet no local? Sem problema, o totem funciona offline depois do primeiro carregamento.
- Se nada resolver, feche e abra o navegador/aplicativo novamente — nenhuma configuração é perdida.
- Depois de uma atualização publicada pela equipe técnica, se o totem parecer estar mostrando a versão antiga: recarregue a página (ou feche e abra de novo). O app funciona offline guardando uma cópia local, então uma aba que já estava aberta antes da atualização só pega a versão nova depois de recarregada pelo menos uma vez.

## Ao final do evento

No painel admin → **Participação**:
- Toque em **Exportar CSV** antes de encerrar, se quiser guardar os números do dia (uma linha por visitante, com data, hora e faixa etária).
- **Limpar dados de teste** some com o histórico de participação (útil ao começar um novo evento do zero, ou pra tirar sessões de teste da equipe antes de exportar os números reais).
- Não existe mais, direto no painel, um botão de "apagar todos os dados" (config + métricas) — se um dia for realmente necessário zerar tudo (ex: trocar de evento com configurações bem diferentes), o time técnico consegue fazer isso limpando o `localStorage` do navegador, ou a seção pode ser reincluída no painel a pedido.

## Referência rápida — PIN e configurações sensíveis

- PIN administrativo padrão: `2025`. Recomenda-se trocá-lo diretamente com o time técnico antes de eventos com equipe rotativa (o PIN vive no código-fonte, não é editável pela própria tela de admin no MVP — ver [evoluções futuras](07-evolucoes-futuras.md)).
- Nenhum dado pessoal é coletado por padrão. Brindes não têm código nem identificam o visitante — a entrega é acompanhada pela equipe ao vivo, não pelo sistema.

## Lista completa de configurações disponíveis no admin

**Atividades** (por atividade): ativa/inativa · ordem de exibição · duração estimada · acerto mínimo para concluir (%) · etapas mínimas realizadas.

**Textos e mensagens:** nome do evento · título e chamada da tela de atração · curiosidades do banner da vitrine (uma por linha, revezam sozinhas) · título da seleção de faixa etária · título da seleção de atividade · título e mensagem de tempo esgotado · mensagem ao ganhar um brinde · mensagem de encerramento.

**Participação:** total de participações registradas neste dispositivo · exportar CSV (data, hora, faixa etária) · limpar dados de teste.

O painel já teve seções de Comportamento, Brindes, Métricas (visão detalhada) e Modo evento e dados — removidas a pedido do usuário pra simplificar o dia a dia (ver docs/06-plano-testes.md para o histórico). As configurações que elas controlavam continuam existindo no código com valores fixos, só não têm mais tela própria: modo de escolha da atividade, quantidade de perguntas/situações, tempo de inatividade, limite de tempo por atividade, som ambiente, animações, brindes habilitados, retenção de dados, restaurar padrões, apagar tudo.
