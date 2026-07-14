# Central de Relatórios e Aplicativos — Tela "Central" (reconstrução)

Reconstrução completa da tela `Central` do app Power Apps Canvas "Central de Relatórios e Aplicativos", com base no código-fonte original (`Central_Relatorios_Aplicativos_SEM_BARRAS.txt`). Fonte de dados: SharePoint `GD - Lista de Relatórios Power BI`.

Arquivo pronto para colar no editor de código-fonte do Power Apps: `Central.pa.yaml`.

## 1. Principais problemas encontrados no código original

- **Somente leitura**: não havia inclusão nem edição de registros — requisito central do pedido.
- **Responsividade quebrada em telas intermediárias**: o container de filtros trocava de altura em `App.Width >= 1200`, mas os dropdowns de Área/Categoria e as abas de Tipo mantinham posição/largura fixas de "modo largo" em qualquer resolução, causando risco de estouro/corte da direita do container em janelas entre ~700–1199px.
- **Largura das abas "Tipo" fixa em pixels** (`96/112/116`), sem relação com a largura real do container — não escalava.
- **Nenhuma variável central de permissão**: não existia `varIsAdmin`, `varPodeAdicionar`, nem qualquer verificação de responsável.
- **Estado "sem resultados" sem ação funcional**: o texto pedia para "limpar os filtros", mas não havia nenhum controle clicável para isso.
- **Botão "Limpar" com bom padrão de chip HTML, mas nenhum botão nativo crítico em lugar algum** (toda a interação de escrita usaria HTML, o que a especificação veta para ações críticas).
- Card e busca (`SortByColumns`, `Filter`, campos Choice/Pessoa) já estavam bem implementados — foram preservados quase integralmente.

## 2. Arquitetura escolhida

- **Layout**: mantidos `GroupContainer` em `ManualLayout` (mesmo padrão do arquivo original) para cabeçalho, filtros, barra de resultados e o novo painel de inclusão/edição. Coordenadas recalculadas para reagir a `Parent.Width`/`App.Width`/`Parent.Height` em vez de valores fixos isolados.
- **Filtros**: mantidos como abas HTML (chip) para Tipo + `ModernDropdown@1.0.2` para Área/Categoria — já era o padrão correto do app original; o problema era só a responsividade, que foi corrigida (layout em 1 linha ≥1200px, empilhado em 3 linhas abaixo disso, com larguras 100% proporcionais).
- **Cards**: HTML preservado (é exatamente onde HTML agrega valor: composição visual densa, badges, clamp de texto, avatar/iniciais). Adicionado um ícone nativo `Editar` sobreposto no canto do card (controle separado, por cima do `HtmlViewer`), pois um único `HtmlViewer` só permite um `OnSelect` — não é possível ter duas ações distintas dentro do mesmo HTML.
- **Inclusão/Edição — Patch em painel lateral nativo, não Form/DataCard nem HTML.**
  - **Por que não `EditForm`/`SubmitForm`**: o schema de `DataCard` para colunas Pessoa/Choice do SharePoint é gerado internamente pelo Studio (nomes de `DataCardValueXX`, templates específicos por tipo de coluna) e não pode ser recriado de forma confiável à mão em YAML sem risco real de erro de importação — o que violaria a exigência de "YAML válido, sem propriedades inventadas".
  - **Por que não HTML**: a especificação exige controles nativos para ações críticas (salvar, cancelar, validação).
  - **Por que Patch**: dá controle total e auditável sobre exatamente o que é gravado — em especial, força o campo Pessoa do responsável a partir de uma variável calculada no momento do clique em Salvar (`varResponsavelGravacao`), ignorando qualquer manipulação visual do campo. Usa somente controles já comprovados no arquivo original (`GroupContainer`, `Text`, `TextInput`, `ModernDropdown`, `Icon`) mais `Button` nativo para as ações críticas.
- **Painel lateral (não modal central)**: ancorado à direita, altura total da tela (`Parent.Height`), com scrim semitransparente cobrindo o restante da tela (bloqueio de fundo). Evita a matemática de centralização vertical/horizontal de um modal e overflow de conteúdo em janelas baixas — o rodapé de botões usa `Max(624, Parent.Height - 64)` para nunca sobrepor os campos, mesmo em janelas pequenas.
- **Pessoa responsável no formulário**: dropdown nativo (`ModernDropdown`) alimentado por uma coleção de responsáveis já existentes na lista (`colResponsaveis`, deduplicados por e-mail) **+** campo de texto opcional para o administrador digitar o e-mail de uma pessoa nova. Essa escolha evita depender do conector Office 365 Users (não confirmado no código original) — ver suposição nº 1.

## 3. Permissões (resumo)

- `varIsAdmin`: `Lower(User().Email) = "marcos.serra@energisa.com.br"`, calculado uma única vez no `OnVisible`.
- `varPodeAdicionar`: admin OU usuário já responsável por pelo menos um item — calculado **uma única vez** no `OnVisible` (não em cada card).
- Botão "Editar" em cada card: `Visible` **e** `OnSelect` revalidam a permissão (`varIsAdmin` OU e-mail do responsável = usuário logado).
- No momento de salvar (`btnSalvarModal`), a permissão é **revalidada** antes do `Patch`; se falhar, mostra erro e não grava.
- Para usuário comum, o campo Responsável some do formulário (dropdown/e-mail ficam `Visible: false`) e é substituído por um texto bloqueado mostrando quem será gravado — e o valor realmente gravado vem de `varResponsavelGravacao`, calculado no clique de Salvar, não do que aparece na tela.

## 4. Suposições assumidas (documentadas conforme solicitado)

1. **Sem conector de diretório corporativo (Office 365 Users) confirmado no código original.** Por isso, o administrador escolhe o responsável entre pessoas já cadastradas na própria lista (dropdown) ou informa o e-mail de uma pessoa nova em um campo de texto (o nome é derivado do e-mail). Caso o app já tenha o conector Office 365 Users habilitado, é possível evoluir esse campo para busca em diretório completo.
2. **`Periodicidade de Atualização` é coluna de texto simples** (não Choice) — inferido do código original, que lê `ThisItem.'Periodicidade de Atualização'` sem `.Value`, ao contrário de `Gerência.Value`, `Coordenação.Value` etc. O formulário usa `TextInput` livre para esse campo.
3. **`Link de Acesso` é texto simples (URL)**, não um valor estruturado de Hyperlink — inferido porque o código original chama `Launch(ThisItem.'Link de Acesso')` diretamente, sem `.Value`/`.Address`.
4. **`Descrição` é multilinha** — o formulário grava texto simples (sem formatação rica); o SharePoint aceita texto simples em colunas de texto multilinha normalmente.
5. **Coordenação não é campo obrigatório** no formulário (não era usada como filtro no código original, sugerindo caráter complementar).
6. Contraste de cores e paleta seguem estritamente os tons informados (`#005061`, `#009FC2`, `#F37021`, `#F4F6F7`, `#FFFFFF`), com a ressalva do item 8 abaixo.

### Ajustes feitos após validação real no Power Apps Studio

A primeira versão foi validada apenas com um parser YAML genérico (sintaxe), não com o compilador real do Power Apps. Ao colar no Studio, o compilador acusou propriedades que **não existem nas versões de controle deste ambiente específico** (`PA2108 Unknown property`). Corrigido:

7. **`Icon@0.0.7` não suporta `OnSelect`, `Fill`, `Radius*` nem `AccessibleLabel` neste ambiente** (só o próprio ícone original, decorativo, já usava as propriedades seguras: `Height`, `Icon`, `IconColor`, `IconStyle`, `Width`, `X`, `Y`). O ícone de "Editar" no card e o "✕" de fechar o painel foram substituídos por controles `Button` nativos (interativos de verdade).
8. **`Button` (bumped para `Button@0.0.45`, versão atual indicada pelo compilador) não suporta `Fill`, `Color`, `Size` nem `Radius*`** neste ambiente — os botões usam apenas `Text`, `BorderColor`, `BorderThickness`, `DisplayMode`, `Height`, `Width`, `X`, `Y`, `OnSelect`, `AccessibleLabel`, e por isso renderizam com o estilo padrão do tema do Power Apps (não com as cores de marca customizadas). Se quiser a cor de marca nos botões, aplique um tema/estilo pelo próprio Studio após colar.
9. **`GroupContainer@1.5.0` (ManualLayout) não suporta `OnSelect`** — o "scrim" (fundo escurecido atrás do painel) deixou de fechar o painel ao ser clicado; o fechamento/​cancelamento continua funcionando pelos botões "✕", "Cancelar" e "Descartar".
10. **`TextInput@0.0.54` não suporta `Default`** — não é possível pré-preencher o campo de texto programaticamente. Por isso, ao editar um registro, os campos de texto (Nome, Link, Descrição, Periodicidade) começam **em branco**, e:
    - O rótulo do campo mostra o valor atual entre parênteses (ex.: `NOME * (atual: Relatório de Vendas)`);
    - O placeholder explica "Deixe em branco para manter o valor atual";
    - Se o usuário deixar em branco e salvar, o valor **original é mantido** (a gravação usa `Coalesce`/`If` para isso); se digitar algo, o valor novo **substitui** o atual.
    - Os campos do tipo Choice (`ModernDropdown`) não têm essa limitação — continuam pré-selecionados normalmente via `Default`.
11. **O card inteiro não abre mais o link ao ser clicado.** O `htmlCard` (HTML) ficou puramente visual, sem `OnSelect` — só o botão nativo `btnAcessarCard`, no rodapé do card, dispara `Launch(ThisItem.'Link de Acesso')`. Isso evita cliques acidentais em qualquer ponto do card e deixa a área clicável explícita, como em um botão de verdade. `btnEditarCard` também foi realocado do canto superior direito (onde sobrepunha os badges de Tipo/Ambiente) para o rodapé, ao lado do "Acessar" — os dois nunca mais competem visualmente com os badges ou com o nome do responsável (o HTML reserva um espaço vazio de largura fixa nessa área para os botões nativos ficarem por cima sem tampar texto).

## 5. Checklist de entrega

- [x] Inclusão funcional (Patch, responsável forçado para usuário comum)
- [x] Edição funcional (Patch, permissão revalidada no salvamento)
- [x] Campo Responsável bloqueado para usuário comum / editável pelo admin
- [x] Botão Editar visível apenas para admin ou responsável do item
- [x] Botão "Adicionar novo" visível apenas para admin ou quem já é responsável por algum item
- [x] Painel lateral com título dinâmico, fechar, cancelar, salvar, validação, erro, sucesso, loading, prevenção de duplo clique, confirmação de descarte
- [x] Estado sem resultados com ação funcional de limpar filtros
- [x] Responsividade baseada em `Parent`/`App` (sem tela fixa)
- [x] YAML validado sintaticamente (`yaml.safe_load`)

O arquivo `Central.pa.yaml` está pronto para substituir a tela `Central` atual do aplicativo.
