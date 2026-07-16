# 4. Arquitetura do sistema

## Decisões de tecnologia e por quê

| Decisão | Motivo |
|---|---|
| React + TypeScript + Vite | Pedido explícito; Vite dá build e dev server rápidos, essencial para iterar telas visuais |
| `HashRouter` (não `BrowserRouter`) | O totem precisa rodar em hospedagem estática (GitHub Pages, pasta local, qualquer host sem configurar rewrite de servidor) sem 404 ao recarregar |
| Context + `useReducer` (não Redux/Zustand) | O estado é uma máquina de estados de sessão relativamente simples; uma dependência de gerenciamento de estado externa seria peso desnecessário |
| `framer-motion` | Requisito explícito de "animações com propósito" (transições, celebração, microinterações) — implementar isso à mão em CSS puro seria mais frágil e mais código |
| `qrcode` | Necessário para gerar o QR de verdade do código de conclusão; biblioteca pequena e sem dependências pesadas |
| `vite-plugin-pwa` | PWA, cache offline e instalação no equipamento são requisitos explícitos |
| `lucide-react` | Biblioteca de ícones madura (MIT, usada em produção por milhares de projetos) — trocou um sistema de SVGs desenhados à mão que não atingia o acabamento visual esperado; tree-shaking mantém o bundle enxuto mesmo importando só os ~40 ícones usados |
| Fonte do sistema (não fonte customizada baixada) | O totem precisa funcionar 100% offline sem risco de "flash sem estilo" no meio de um evento; a stack de fontes do sistema (Segoe UI/-apple-system/Roboto conforme o SO) já é grande, legível e teoria zero de rede |
| `localStorage` como persistência (sem backend obrigatório) | Pedido explícito de rodar sem servidor; estrutura dos serviços já isola o acesso a dados (`src/services/`) para trocar por Firebase/Supabase/API própria depois sem tocar nas telas |

## Estrutura modular de atividades

Cada atividade é um objeto de configuração (`ActivityConfig`, em `src/types/activity.ts`) com um `type` discriminante (`quiz` | `memory` | `sort` | `scenario`) e um componente correspondente em `src/activities/components/`. O `ActivityRunnerScreen` apenas escolhe qual componente renderizar a partir do `type` — adicionar uma quinta atividade (ex: Missão Economia) significa:

1. Definir um novo `type` e sua interface em `src/types/activity.ts`.
2. Criar o conteúdo em `src/data/activitiesData.ts`.
3. Criar o componente de execução em `src/activities/components/`.
4. Registrar o `case` no `ActivityRunnerScreen`.

Nenhuma tela pública, nenhum serviço e nenhuma lógica de sessão precisa mudar.

Todo componente de atividade recebe `(activity, onComplete)` e devolve um `ActivityRunResult { correct, incorrect, stepsCompleted, totalSteps, durationMs }`. A decisão de "passou ou não" fica centralizada no reducer (`src/store/appReducer.ts`), comparando o resultado com `activity.completionCriteria` — nenhuma atividade decide sozinha se libera brinde.

## Máquina de estados da sessão

`src/store/appReducer.ts` modela a sessão como uma máquina de estados explícita (`SessionScreen`): `attract → start → activitySelect → activityIntro → activityRunning → result → completion|noGifts → giftInstructions → closing → attract`. Cada transição é uma ação do reducer; não existe navegação livre entre telas fora dessas transições, o que evita estados inconsistentes (ex: "resultado" sem atividade selecionada).

## Persistência e dados

Tudo fica em `localStorage`, namespaced (`energisa-painel:*`) via `src/services/storage.ts`, que nunca deixa um erro de armazenamento (quota, modo privado) derrubar a experiência — falha silenciosamente e a sessão segue em memória.

- `app-config`: configuração editável no admin (textos, tempos, regras de brinde).
- `activities`: overrides de atividade (ativo, ordem, duração, critério) — o conteúdo (perguntas, cenários) fica no código em `src/data/`, não em `localStorage`, para não exigir uma UI de edição de conteúdo completa no MVP.
- `metrics-events`: log de eventos (sessão, atividade, brinde, inatividade, erro) usado pelo painel de métricas.
- `gift-records`: cada código de brinde gerado, com validade e status de entrega.
- `admin-authenticated`: em `sessionStorage` (não `localStorage`) — a sessão administrativa termina ao fechar a aba/navegador, mais seguro para equipamentos compartilhados.

## Segurança do acesso administrativo

PIN fixo no MVP (`src/services/adminAuth.ts`), documentado no manual da equipe. **Evolução recomendada antes de uso prolongado em produção:** mover o PIN para uma variável de configuração fora do bundle JS (ex: definido no primeiro acesso, ou validado contra um backend), já que qualquer PIN embutido no código-fonte de um app cliente é, em princípio, extraível. Para o contexto de uso (equipamento físico, supervisionado, PIN trocável facilmente no código antes de cada evento), o risco é aceitável para o MVP.

## Modo offline e confiabilidade

- PWA com `vite-plugin-pwa`, estratégia `generateSW`: todo o app (HTML, JS, CSS, ícones) é pré-cacheado; imagens seguem `CacheFirst`.
- Nenhuma chamada de rede é necessária para o fluxo principal — o totem funciona com o Wi-Fi do evento caindo no meio de uma sessão.
- Reinício do navegador/equipamento: como o estado de sessão vive em memória (não em `localStorage`), qualquer recarregamento sempre volta para a tela de Atração — esse é o comportamento de recuperação por design, nunca deixa a tela presa num estado quebrado.
- Config e métricas persistem em `localStorage`, então um reinício não perde configuração do evento nem histórico de métricas/brindes.

## Acessibilidade implementada

- Contraste alto em todas as telas (paleta testada sobre fundo escuro e cards claros).
- Tipografia fluida (`clamp()`) com mínimo confortável de leitura.
- Ícone + texto em toda ação — nunca só cor ou só ícone.
- `:focus-visible` com contorno laranja de alto contraste para navegação por teclado (manutenção/testes).
- `prefers-reduced-motion` respeitado via CSS **e** via config do admin (`reducedMotion`), que também reduz a duração das transições do `framer-motion`.
- Sem flashes rápidos, sem cronômetro regressivo pressionando dentro das atividades.
- Ninguém fica travado numa mecânica que não consiga executar: o "Recomeçar" (canto da tela) sempre reinicia a sessão, e o timer de inatividade devolve pra Atração sozinho. Nenhuma das 4 atividades tem saída manual antecipada — todas concluem sozinhas ao terminar todos os itens (última pergunta/situação, todos os hábitos classificados, todos os pares encontrados).

## Modo altura baixa — arquitetura (reflow real, não zoom)

Ativado pelo botão discreto no canto da tela (`LowReachToggle`), persiste em `localStorage` e reflete no atributo `data-low-reach-mode` de `.app-shell` (`App.tsx`). Todo o resto do sistema reage a esse atributo — não existe nenhum `transform: scale()` nem `zoom` aplicado à interface; a composição da tela muda de verdade. Três camadas, do mais genérico ao mais específico:

1. **Tokens compactos (`src/styles/theme.css`)** — o seletor `.app-shell[data-low-reach-mode='true']` redefine os próprios valores de `--space-4` a `--space-8` e das fontes `--fs-display`/`--fs-h1`/`--fs-h2`/`--fs-body-lg` (todas com `clamp()`, nunca um valor fixo). Como praticamente todo componente do app já consome espaçamento e tipografia via `var(--space-N)`/`var(--fs-N)`, essa única mudança compacta gaps, paddings e títulos em toda a interface automaticamente, sem precisar editar cada componente. Esse é o padrão reutilizável: qualquer tela nova que use os tokens já herda o comportamento certo de graça.
2. **Reancoragem de layout (`ScreenShell.css`)** — `.screen-shell__content` troca de `justify-content: center` para `flex-end`, empurrando o bloco de conteúdo (já mais compacto pela camada 1) pro rodapé real da tela. Diferente de uma versão anterior deste recurso, não existe mais nenhum `max-height`/`position: absolute` recortando uma "caixa" — isso cortava fisicamente o topo de conteúdo mais alto que a caixa (bug real encontrado em produção). `overflow-y: auto` continua como rede de segurança apenas para o caso extremo de uma tela realmente baixa onde nem a compactação resolve — nesse caso o conteúdo rola em vez de cortar ou sobrepor.
3. **Ajustes por componente** — cada tela/atividade decide o que pode encolher ou sumir sem prejudicar a compreensão: `AttractScreen` esconde a fileira de ícones decorativos (a mesma informação já está no título); `MemoryActivity` e `SortActivity` reduzem a largura mínima de card/hábito (via `ResizeObserver` + JS no caso da Memória, calculando o maior divisor exato da quantidade de cartas pra manter a grade sempre balanceada) e alargam o container, encaixando mais itens por linha e reduzindo o número de linhas; `QuizActivity`/`ScenarioActivity`/`ActivitySelectScreen` reduzem a altura mínima e o tamanho dos ícones dos cards. `RestartCorner` (saída/cancelar) desce pro rodapé junto com o resto — antes ficava preso no canto superior mesmo com o modo ativo. `AdminAccessTrigger` usa `position: fixed` (não `absolute`) justamente para NÃO seguir esse reflow — o acesso administrativo é operado pela equipe, que consegue alcançar o topo real da tela.

Resultado medido (ver [docs/06-plano-testes.md](06-plano-testes.md)): em 1920×1080 e 1600×900, todas as 4 atividades + seleção + atração ficam sem rolagem nenhuma com o modo ativo; o conteúdo interativo das telas mais simples (Quiz, Cenário, Memória) fica com o topo entre 57% e 65% da altura da tela — dentro ou muito perto da meta de "60% inferiores". Organize os Hábitos, por ter mais elementos interativos simultâneos (8 hábitos arrastáveis + 2 colunas), é a exceção honesta: mesmo compactado ao máximo sem comprometer o alvo de toque, o topo do conteúdo fica perto de 39% da altura — mais alto que a meta de 60%, mas sem nenhum corte, sobreposição ou rolagem.

## Kiosk mode (proteções de navegador)

`src/hooks/useKioskGuards.ts` bloqueia menu de contexto, gestos de pinça e double-tap-zoom. `global.css` desativa seleção de texto e callout de long-press fora dos formulários administrativos (`data-allow-selection="true"`). `viewport` trava zoom manual. Botão de tela cheia (gesto do usuário, exigido pelos navegadores) fica visível até o totem entrar em fullscreen.
