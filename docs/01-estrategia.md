# 1. Estratégia

## Objetivo

Um totem touch que qualquer visitante — criança, adulto, idoso, alguém sem intimidade com tecnologia — entenda sozinho em segundos, jogue por 1 a 2 minutos, aprenda uma coisa real sobre uso consciente de energia, e saia com um motivo concreto para lembrar da marca (o brinde).

## Riscos identificados e como o projeto responde a eles

| Risco | Resposta no projeto |
|---|---|
| Visitante não sabe como começar | Tela de atração com um único CTA gigante, sem outras opções concorrendo por atenção |
| Fila/ambiente barulhento, pouca paciência | Sessões de 45–90s, textos curtos, feedback visual (não depende só de som) |
| Criança e idoso na mesma fila | Nenhuma atividade exige leitura longa, cálculo ou jargão técnico; toque grande (mín. 48px, a maioria 56–64px) |
| Alguém repete a atividade só para ganhar outro brinde | Critério de conclusão real (mínimo de acertos + etapas); sem código nem estoque digital, a equipe acompanha o jogo ao vivo e decide na prática (não repetir brinde pra quem já jogou na frente dela) |
| Painel trava ou perde conexão no meio do evento | 100% funcional offline (PWA), estado local, tela de erro amigável com botão de recomeçar, sem depender de rede para nada essencial |
| Equipe do estande não é técnica | Painel admin com toggles e campos simples, sem jargão, PIN de 4-6 dígitos ao invés de login complexo |
| Visual "genérico de template" | Sistema visual próprio com paleta Energisa, ícones da biblioteca Lucide (consistentes e profissionais), gradientes e animações com propósito |

## Princípios de experiência

1. **Uma decisão por tela.** Nunca dois CTAs concorrendo.
2. **Sessão curta por design.** Toda atividade cabe em 45–90s; o totem inteiro (do toque inicial ao brinde) fica entre 2 e 3 minutos.
3. **Feedback nunca constrange.** Sem "errado" em vermelho, sem placar público, sem pressão de tempo dentro das atividades como regra geral. Exceção deliberada: um limite de tempo por atividade (configurável como múltiplo do tempo estimado de cada uma, padrão 2x, com anel de contagem regressiva grande e chamativo) existe só pra gestão de fila do evento, não pra apressar o aprendizado — ao estourar, leva a uma tela amigável convidando a tentar de novo, nunca uma mensagem de "perdeu". Ver docs/03-fluxo-e-telas.md.
4. **Conclusão é ganha, não assumida.** Só quem de fato interage o suficiente (critério configurável por atividade) é considerado "concluiu", e só isso libera brinde.
5. **Sempre existe uma saída.** Botão "Recomeçar" discreto em toda tela, inatividade sempre volta pro início.
6. **Configurável sem programar.** Textos, tempos, critérios e regras de brinde vivem no painel admin, não no código.

## Tempo ideal de sessão

- Atração → início do desafio: até 10s de decisão.
- Atividade: 45–90s (configurável por atividade no admin).
- Resultado + aprendizado (e brinde, se ganhou, direto na mesma tela): 10–15s de leitura.
- **Total: ~2 a 3 minutos por visitante**, compatível com fila de evento.

## Atividades propostas e seleção do MVP

Ver [docs/02-atividades.md](02-atividades.md) para os 9 conceitos avaliados e a justificativa completa da escolha de **Quiz Relâmpago, Memória da Energia, Organize os Hábitos e Casa Eficiente** como MVP.
