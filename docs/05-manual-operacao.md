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

Na seção **Brindes**: por padrão, o sistema de brindes vem **desativado** em todas as atividades (nenhum código é gerado, nenhuma tela de brinde aparece — o visitante vai direto do resultado pro encerramento). Se o evento for distribuir brindes, ative "Brindes habilitados" e confira "Total de brindes do evento" e "Estoque atual disponível", ajustando para a quantidade real que vocês têm na mesa.

Na seção **Comportamento**: se o ambiente for muito barulhento ou tiver fila grande, considere reduzir o "Voltar para a tela inicial após" para algo entre 30–45s.

## Durante o evento — entregando brindes

1. O visitante, ao concluir o desafio, verá um **código de 5 caracteres** e um QR code na tela.
2. Peça para o visitante mostrar o código (ele fica visível por alguns minutos, com contagem regressiva na tela dele).
3. No painel admin → **Brindes** → campo "Confirmar entrega": digite o código e toque em "Confirmar".
4. Só depois de confirmar, entregue o brinde. Isso garante que o estoque no painel fica sempre correto.
5. Se o código não for encontrado ou já tiver sido usado, o sistema avisa na hora — nesse caso, não entregue um brinde novo.

## Quando os brindes acabarem

O totem detecta sozinho quando o estoque chega a zero e mostra uma mensagem alternativa para o visitante (sem brinde, mas com o aprendizado). Vocês podem repor o estoque a qualquer momento em **Brindes → Estoque atual disponível**.

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
- "Apagar todos os dados" é uma ação mais forte: some com métricas, brindes e configurações — pede confirmação em dois toques. Use apenas se for realmente recomeçar o painel do zero.

## Referência rápida — PIN e configurações sensíveis

- PIN administrativo padrão: `2025`. Recomenda-se trocá-lo diretamente com o time técnico antes de eventos com equipe rotativa (o PIN vive no código-fonte, não é editável pela própria tela de admin no MVP — ver [evoluções futuras](07-evolucoes-futuras.md)).
- Nenhum dado pessoal é coletado por padrão. O código do brinde é anônimo e não identifica o visitante.

## Lista completa de configurações disponíveis no admin

**Atividades** (por atividade): ativa/inativa · ordem de exibição · duração estimada · acerto mínimo para concluir (%) · etapas mínimas realizadas.

**Textos e mensagens:** nome do evento · título e chamada da tela de atração · curiosidades do banner da vitrine (uma por linha, revezam sozinhas) · título da seleção de atividade · título e mensagem de conclusão · instruções de retirada do brinde · mensagem de brindes esgotados · mensagem de encerramento.

**Comportamento:** modo de escolha da atividade (visitante escolhe / sorteio aleatório / ordem fixa) · quantidade de perguntas no Quiz Relâmpago · quantidade de situações na Casa Eficiente · tempo de inatividade até reiniciar · sons de interface (on/off) · animações mais intensas (on/off) · movimento reduzido (on/off).

**Brindes:** brindes habilitados (on/off) · total de brindes do evento · estoque atual disponível · validade do código (minutos) · intervalo mínimo entre brindes no mesmo aparelho · exigir confirmação da equipe (on/off) · ferramenta de confirmação manual de entrega · histórico dos últimos brindes liberados.

**Métricas:** sessões iniciadas · atividades iniciadas/concluídas/abandonadas · brindes liberados/entregues · reinícios por inatividade · desempenho por atividade (taxa de conclusão, tempo médio) · exportar em JSON/CSV · gerar dados de demonstração · limpar dados de teste.

**Modo evento e dados:** modo evento ativo (on/off) · dias de retenção de dados · reiniciar sessão atual · aplicar retenção agora · restaurar atividades padrão · restaurar textos e comportamento padrão · apagar todos os dados do dispositivo · versão do sistema.
