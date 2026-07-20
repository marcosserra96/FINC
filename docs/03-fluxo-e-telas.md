# 3. Fluxo do visitante e mapa de telas

## Fluxo público

```
Atração (vitrine, animada, idle)
   │ toque em qualquer lugar
   ▼
Faixa etária (4 cards: Criança/Adolescente/Adulto/Idoso — registro de público, sempre aparece)
   │ toque num card
   ▼
[conforme modo configurado no admin]
   ├─ Visitante escolhe → Seleção de atividade (grade de cards, já com nome/descrição/duração)
   │                          │ toque num card
   │                          ▼
   │                      Prepare-se (contagem regressiva "3, 2, 1, Vamos!", ~2.5s, avança sozinho)
   │
   ├─ Sorteio aleatório  → Prepare-se (idem)
   └─ Ordem fixa         → Prepare-se (idem)
   │
   ▼
Execução da atividade (cabeçalho com nome + instrução de 1 frase, sempre visível; feedback imediato a cada interação)
   │
   ▼
Resultado (placar não punitivo + "O que você aprendeu")
   │
   ├─ Não atingiu critério de conclusão ──────────────► Encerramento
   │
   ├─ Atingiu critério, mas sem brindes disponíveis ──► Sem brindes (mensagem alternativa) → Encerramento
   │
   └─ Atingiu critério e há brinde disponível
          │
          ▼
      Conclusão (celebração + código + QR code)
          │
          ▼
      Instruções de retirada (código grande + validade) → "Concluir"
          │
          ▼
      Encerramento (mensagem de agradecimento)
          │  4s automático, ou inatividade
          ▼
      volta para Atração
```

> **Decisão de design:** a primeira versão tinha uma tela de boas-vindas ("Vamos lá") entre a Atração e a Seleção, e uma tela de introdução com botão "Começar" entre a Seleção e a Execução — 4 toques até o jogo realmente começar. Cortamos o toque de boas-vindas (a Atração já leva direto pra escolha, ou já sorteia/inicia, conforme o modo) e trocamos o botão "Começar" por uma contagem regressiva ("3, 2, 1, Vamos!") que avança sozinha — dá o respiro de orientação (nome, ícone, instrução no cabeçalho) e um momento lúdico antes de começar, sem exigir nenhum toque. Quem já conhece a atividade pode tocar em qualquer lugar da tela pra pular direto. Resultado (antes da tela de faixa etária): no máximo 2 toques até jogar (Atração → card), nenhum toque extra pra "confirmar começar". A tela de faixa etária, adicionada depois para registrar o público do evento, soma +1 toque obrigatório a esse total.

### Estados especiais

- **Inatividade:** em qualquer tela (exceto Atração), sem toque por N segundos (configurável, padrão 45s) → volta direto para Atração, sessão nova é criada, métrica `idle_reset` registrada.
- **Erro inesperado:** qualquer falha não tratada leva a uma tela de erro amigável, sem jargão técnico, com botão único "Recomeçar" — nunca expõe stack trace ou mensagem de sistema ao visitante.
- **Saída voluntária:** botão discreto "Recomeçar" no canto de toda tela pública (exceto Atração), sempre disponível.
- **Sem brindes disponíveis:** mensagem alternativa, calorosa, que não faz o visitante sentir que "perdeu" — o aprendizado continua sendo o valor central.

## Mapa de telas — público

| Tela | Arquivo | Função |
|---|---|---|
| Atração | `AttractScreen` | Vitrine animada, chamada para tocar, acesso admin oculto (5 toques no canto) |
| Faixa etária | `AgeSelectScreen` | 4 cards (Criança/Adolescente/Adulto/Idoso) para registrar o público — sempre aparece, antes da lógica de seleção de atividade decidir o próximo passo |
| Seleção de atividade | `ActivitySelectScreen` | Grade de cards das atividades ativas — só aparece no modo "visitante escolhe" |
| Prepare-se | `ActivityPrepareScreen` | Contagem regressiva "3, 2, 1, Vamos!" com cabeçalho de nome+instrução; avança sozinha (ou no toque, pra quem quiser pular) |
| Execução | `ActivityRunnerScreen` | Cabeçalho fixo com nome + instrução, e o componente da atividade escolhida |
| Resultado | `ResultScreen` | Placar não punitivo + aprendizado principal |
| Conclusão | `CompletionScreen` | Celebração, código do brinde, QR code |
| Instruções do brinde | `GiftInstructionsScreen` | Código grande, prazo de validade (anel regressivo) |
| Sem brindes | `NoGiftsScreen` | Mensagem alternativa calorosa |
| Encerramento | `ClosingScreen` | Agradecimento, retorno automático |
| Erro | `ErrorScreen` | Mensagem amigável + recomeçar |

## Fluxo e mapa de telas — administrativo

Acesso: rota `/admin` (direta ou via 5 toques no canto superior direito da tela de atração) → PIN de 4-6 dígitos → painel.

| Seção | Conteúdo |
|---|---|
| Atividades | ativar/desativar, ordenar, duração estimada, critério de conclusão |
| Textos e mensagens | nome do evento e todos os textos exibidos ao visitante |
| Comportamento | modo de seleção de atividade, tempo de inatividade, sons, animações, quantidade de perguntas do quiz |
| Brindes | estoque, validade do código, cooldown, confirmação manual de entrega, histórico |
| Métricas | sessões, conclusões, abandonos, brindes, desempenho por atividade, exportar/limpar dados |
| Modo evento e dados | ativar/desativar modo evento, retenção de dados, restaurar padrões, apagar tudo |

O painel administrativo nunca aparece na navegação pública e não é acessível por link visível — apenas pela rota direta ou pelo gesto oculto.
