# 7. Evoluções futuras

Priorizadas por impacto vs. esforço.

## Curto prazo (baixo esforço)

- **PIN administrativo configurável pela própria interface** (hoje é fixo no código-fonte — ver [docs/04-arquitetura.md](04-arquitetura.md)).
- **Editor de conteúdo das atividades no admin** (hoje perguntas/cenários vivem em `src/data/activitiesData.ts`; dá pra expor um editor simples de texto para cada pergunta/item sem tocar em código).
- **Sons de interface** — a configuração `soundEnabled` já existe no admin e é respeitada pelos componentes, falta compor/licenciar os efeitos sonoros e conectá-los aos eventos de toque, acerto e conclusão.
- **Ícones PWA em PNG multi-resolução** — hoje o manifest usa SVG (funciona bem em Android/desktop); para melhor suporte em iOS/instaladores mais antigos, gerar PNGs 192/512px.
- **Créditos institucionais com o arquivo-fonte oficial** — `src/components/ui/InstitutionalCredit.tsx` (rodapé da tela de atração) hoje exibe `public/institutional/energisa-pee-aneel.svg`, vetorizado com potrace a partir de `energisa-pee-aneel-source.png` (print de baixa resolução fornecido pela equipe). O layout e as formas ficam fiéis ao original e nítidas em qualquer tamanho de tela, mas por ter passado por um print, o traçado pode ter uma leve serrilhada em bordas bem finas quando ampliado muito. Se o time de comunicação/marketing da Energisa conseguir o arquivo-fonte oficial (vetor nativo do manual de identidade do PEE/ANEEL), substituir `energisa-pee-aneel.svg` por ele remove essa limitação por completo.

## Médio prazo

- **5 atividades adicionais já conceituadas** (Duelo de Hábitos, Memória da Energia, Missão Economia, Ranking dos Vilões, Roleta Consciente) — ver [docs/02-atividades.md](02-atividades.md). A arquitetura modular já suporta isso sem alterar o core.
- **Identificação opcional do participante** (nome/e-mail, com consentimento explícito e coleta mínima) para campanhas que peçam follow-up — hoje o sistema é 100% anônimo por padrão, essa deve continuar sendo a opção default.
- **Sincronização de métricas para nuvem** (Firebase/Supabase/API própria) para consolidar dados de múltiplos totens rodando em paralelo — os serviços já isolam o acesso a dados (`src/services/`) especificamente para viabilizar essa troca sem reescrever telas.
- **Múltiplos idiomas** — hoje os textos são fixos em português; a estrutura de `AppTexts` já centraliza tudo num objeto, então internacionalização é uma extensão natural.

## Longo prazo

- **Painel multi-evento / multi-totem**, com um backend central para configurar vários equipamentos ao mesmo tempo e agregar métricas entre eles.
- **Modo apresentação/relatório automático** para a equipe de marketing, gerando um resumo visual pós-evento a partir das métricas exportadas.
- **Testes automatizados** (unitários para a lógica de critério de conclusão e liberação de brinde; end-to-end para o fluxo completo) — o MVP foi validado manualmente via navegador (ver [docs/06-plano-testes.md](06-plano-testes.md)), mas uma suíte automatizada protegeria contra regressões à medida que novas atividades forem adicionadas.
