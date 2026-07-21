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

No painel, seção **Textos e mensagens**: coloque o nome do evento.

Na seção **Brindes**: os brindes vêm **ativados** por padrão, valendo pra três das quatro atividades (Quiz Relâmpago, Organize os Hábitos, Casa Eficiente — a Memória da Energia fica de fora, ver docs/02-atividades.md). O critério pra ganhar é acertar pelo menos 70% em uma dessas atividades (ajustável por atividade em **Atividades → Acerto mínimo para concluir**); quem não atinge vê a tela "Bom começo!", não-punitiva, convidando a tentar de novo. Se não for pra distribuir brindes no evento, desative em "Brindes habilitados". **Não há código nem estoque digital pra gerenciar** — a equipe acompanha o jogo ao vivo e entrega o brinde na hora, então essa seção é só o interruptor de ligar/desligar.

Na seção **Comportamento**: se o ambiente for muito barulhento ou tiver fila grande, considere reduzir o "Voltar para a tela inicial após" para algo entre 30–45s. Também dá pra ajustar o "Limite de tempo, em múltiplos do tempo estimado" (padrão 2x) — cada atividade já tem seu próprio tempo estimado, então o limite real varia por atividade automaticamente; se a fila estiver grande, reduza o multiplicador para não deixar ninguém preso no totem por muito tempo. Um anel grande no canto superior direito da tela muda de cor conforme o tempo vai acabando (azul → laranja → vermelho pulsando), e ao zerar leva o visitante direto pra uma tela avisando pra voltar pra fila e tentar de novo.

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

No painel admin → **Modo evento e dados**:
- Você pode exportar as métricas em **Métricas → Exportar JSON/CSV** antes de encerrar, se quiser guardar os números do dia.
- "Limpar dados de teste" some com o histórico de métricas (útil ao começar um novo evento do zero).
- "Apagar todos os dados" é uma ação mais forte: some com métricas e configurações — pede confirmação em dois toques. Use apenas se for realmente recomeçar o painel do zero.

## Referência rápida — PIN e configurações sensíveis

- PIN administrativo padrão: `2025`. Recomenda-se trocá-lo diretamente com o time técnico antes de eventos com equipe rotativa (o PIN vive no código-fonte, não é editável pela própria tela de admin no MVP — ver [evoluções futuras](07-evolucoes-futuras.md)).
- Nenhum dado pessoal é coletado por padrão. Brindes não têm código nem identificam o visitante — a entrega é acompanhada pela equipe ao vivo, não pelo sistema.

## Lista completa de configurações disponíveis no admin

**Atividades** (por atividade): ativa/inativa · ordem de exibição · duração estimada · acerto mínimo para concluir (%) · etapas mínimas realizadas.

**Textos e mensagens:** nome do evento · título e chamada da tela de atração · curiosidades do banner da vitrine (uma por linha, revezam sozinhas) · título da seleção de faixa etária · título da seleção de atividade · título e mensagem de tempo esgotado · mensagem ao ganhar um brinde · mensagem de encerramento.

**Comportamento:** modo de escolha da atividade (visitante escolhe / sorteio aleatório / ordem fixa) · quantidade de perguntas no Quiz Relâmpago · quantidade de situações na Casa Eficiente · tempo de inatividade até reiniciar · limite de tempo por atividade (múltiplo do tempo estimado de cada uma) · som ambiente durante as atividades (on/off) · animações mais intensas (on/off) · movimento reduzido (on/off).

**Brindes:** brindes habilitados (on/off) — sem estoque nem código pra gerenciar.

**Métricas:** sessões iniciadas · atividades iniciadas/concluídas/abandonadas · brindes ganhos · reinícios por inatividade · tempo esgotado na atividade · desempenho por atividade (taxa de conclusão, tempo médio) · exportar em JSON/CSV · gerar dados de demonstração · limpar dados de teste.

**Modo evento e dados:** modo evento ativo (on/off) · dias de retenção de dados · reiniciar sessão atual · aplicar retenção agora · restaurar atividades padrão · restaurar textos e comportamento padrão · apagar todos os dados do dispositivo · versão do sistema.
