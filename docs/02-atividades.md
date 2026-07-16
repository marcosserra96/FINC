# 2. Atividades — conceitos avaliados e seleção do MVP

Nove conceitos foram avaliados contra os critérios do projeto (rápido, visual, sem leitura pesada, sem cálculo, sem punição). Os quatro primeiros compõem o MVP; os demais ficam documentados como evolução — a arquitetura de atividades é modular, então adicioná-los depois não exige mudar o core (ver [docs/04-arquitetura.md](04-arquitetura.md)).

---

## 1. Quiz Relâmpago — ✅ no MVP

- **Objetivo educativo:** reforçar hábitos corretos do dia a dia com energia.
- **Público mais adequado:** todos os públicos, inclusive baixa familiaridade digital.
- **Tempo médio:** 45–60s (4 perguntas de um banco de 6).
- **Como funciona:** afirmação na tela, visitante toca em Verdadeiro ou Falso, recebe explicação curta na hora.
- **Nível de dificuldade:** fácil.
- **Potencial de engajamento:** alto — resposta imediata, ritmo rápido.
- **Facilidade de uso no touch:** máxima — dois botões grandes, sem gestos.
- **O que o visitante aprende:** hábitos de consumo consciente aplicáveis em casa.
- **Complexidade de desenvolvimento:** baixa.
- **Riscos de confusão/abandono:** baixíssimo.
- **Critério de conclusão válida:** acerto mínimo configurável (padrão 50%) sobre as perguntas respondidas, com mínimo de perguntas respondidas.

## 2. Memória da Energia — ✅ no MVP

- **Objetivo educativo:** fixar boas práticas de consumo consciente por repetição lúdica.
- **Público mais adequado:** todos, forte apelo com crianças — jogo da memória é um formato universalmente conhecido.
- **Tempo médio:** 60–90s (6 pares, 12 cartas).
- **Como funciona:** o jogo começa com todas as 12 cartas viradas pra cima por 3 segundos ("espiadinha" — pequena ajuda de memorização, clássico do gênero), depois vira todas de volta e o jogo de verdade começa: toca em duas cartas por vez tentando formar pares; ao acertar um par, uma dica de consumo consciente aparece por alguns segundos antes de sumir sozinha. O tempo da espiadinha não conta pro cronômetro do resultado.
- **Nível de dificuldade:** fácil.
- **Potencial de engajamento:** alto — mecânica já conhecida de todo mundo, sem curva de aprendizado.
- **Facilidade de uso no touch:** máxima — só toque simples, sem gestos, sem precisão motora fina.
- **O que o visitante aprende:** uma dica prática por aparelho (lâmpada, carregador, ar-condicionado, geladeira, TV, ferro elétrico).
- **Complexidade de desenvolvimento:** baixa-média (grade de cartas com flip 3D via CSS, sem física).
- **Riscos de confusão/abandono:** baixíssimo — grade pequena (12 cartas) mantém a sessão dentro do tempo alvo.
- **Critério de conclusão válida:** encontrar uma proporção mínima de pares nas tentativas feitas (padrão 40%, calibrado para não punir tentativa e erro natural do jogo) com número mínimo de tentativas.

> Substituiu a "Caça ao Desperdício" (cena de casa com alvos para tocar), retirada do MVP por feedback de que a mecânica não estava explorando bem o potencial da tela touch nem tinha acabamento visual à altura das demais. Fica documentada como conceito de evolução futura mais abaixo.

## 3. Organize os Hábitos — ✅ no MVP

- **Objetivo educativo:** distinguir hábitos eficientes de hábitos de desperdício.
- **Público mais adequado:** todos.
- **Tempo médio:** 60s.
- **Como funciona:** arrasta o hábito até a coluna certa ("Hábito eficiente" ou "Desperdício") — com destaque visual na coluna enquanto arrasta; alternativa sem arrastar: tocar no hábito e depois na coluna, para quem tem dificuldade motora fina.
- **Nível de dificuldade:** fácil.
- **Potencial de engajamento:** alto — arrastar é mais satisfatório e "de mão na massa" do que só tocar, principalmente para crianças.
- **Facilidade de uso no touch:** alta, com fallback total — o arrasto usa Pointer Events (touch/mouse/caneta) e nunca é a única forma de interagir.
- **O que o visitante aprende:** consumo consciente é feito de hábitos repetidos, não de uma ação única.
- **Complexidade de desenvolvimento:** média (arrasto via Pointer Events + fallback de toque, mesmo padrão usado antes na Casa Eficiente).
- **Riscos de confusão/abandono:** baixo — instrução muda de "arraste ou toque" para "toque na coluna" conforme o estado, e a coluna destaca visualmente quando o item passa por cima durante o arrasto.
- **Critério de conclusão válida:** acerto mínimo (padrão 75%) sobre o total de hábitos categorizados.

## 4. Casa Eficiente — ✅ no MVP

- **Objetivo educativo:** treinar a decisão certa em situações reais do dia a dia (ligar o ar-condicionado, sair do quarto, terminar de carregar o celular...).
- **Público mais adequado:** todos — é a atividade mais "de lógica" das quatro, sem exigir nenhuma coordenação motora fina.
- **Tempo médio:** 45–60s (4 situações de um banco de 6).
- **Como funciona:** uma situação curta aparece com um ícone; o visitante toca em uma das duas atitudes possíveis e recebe a explicação na hora — a mesma mecânica de escolha simples usada no Quiz Relâmpago, mas com uma decisão prática em vez de Verdadeiro/Falso.
- **Nível de dificuldade:** fácil.
- **Potencial de engajamento:** alto — cada cenário é reconhecível ("isso já aconteceu comigo"), o que prende mais do que uma afirmação abstrata.
- **Facilidade de uso no touch:** máxima — dois cartões grandes, sem gestos.
- **O que o visitante aprende:** em cada situação do dia a dia existe uma escolha mais consciente.
- **Complexidade de desenvolvimento:** baixa (reaproveita o mesmo padrão de pergunta+feedback do Quiz Relâmpago).
- **Riscos de confusão/abandono:** baixíssimo.
- **Critério de conclusão válida:** acerto mínimo (padrão 50%) sobre as situações respondidas, com mínimo de situações respondidas.

> Versão anterior do projeto usava aqui uma mecânica de arrastar aparelhos até o cômodo certo. Trocamos pela versão de decisão por dois motivos: como jogo, o "para qual cômodo vai esse aparelho" ensinava pouco sobre consumo consciente (era mais teste de memória de layout de casa do que educação energética); e a mecânica de decisão ("o que fazer nessa situação") é mais direta, mais rápida de jogar e continua 100% acessível em touch sem depender de coordenação motora fina.

---

## 5. Duelo de Hábitos — evolução futura

*Nota: desde que o Casa Eficiente passou a usar decisão de duas alternativas, esta atividade só vale a pena como uma quinta opção se tiver um recorte diferente (comparar dois hábitos completos lado a lado, sem uma "situação" introdutória) — senão fica redundante.*

- **Objetivo educativo:** decidir, entre duas ações do dia a dia, qual economiza mais.
- **Público:** todos. **Tempo:** ~45s. **Dificuldade:** fácil.
- **Como funciona:** dois cards lado a lado (ex: "tomar banho de 5min" vs "tomar banho de 20min"), toca no que considera mais consciente.
- **Engajamento:** médio. **Touch:** máxima facilidade.
- **Aprendizado:** comparação direta de hábitos cotidianos.
- **Complexidade de dev:** baixa. **Risco:** frases mal calibradas podem parecer ambíguas — exige curadoria cuidadosa de conteúdo.
- **Conclusão:** acerto mínimo sobre pares respondidos.

## 6. Caça ao Desperdício — evolução futura

*Nota: fez parte do MVP até ser substituída pela Memória da Energia (ver item 2) — feedback de que a cena com alvos para tocar não tinha acabamento visual à altura das demais nem explorava bem o touch. Fica como conceito para retomar com um tratamento visual diferente (ex: cena mais ilustrada, ou alvos que reagem com mais física).*

- **Objetivo educativo:** treinar o olhar para desperdícios comuns em casa.
- **Público mais adequado:** todos, forte apelo com crianças e famílias.
- **Tempo médio:** 60–90s.
- **Como funciona:** cena de uma casa com vários itens; visitante toca nos que representam desperdício de energia, ignorando os itens neutros.
- **Engajamento:** alto — mecânica de "achar o erro" é intuitiva.
- **Touch:** alta, com alvos grandes.
- **Aprendizado:** reconhecer desperdícios de energia no ambiente doméstico.
- **Complexidade de dev:** média. **Risco:** exige um tratamento visual mais elaborado do que uma implementação básica para não parecer genérico.
- **Conclusão:** encontrar uma proporção mínima dos itens de desperdício.

## 7. Missão Economia — evolução futura

- **Objetivo:** aplicar hábitos conscientes numa mini-história ("um dia na casa").
- **Público:** adultos. **Tempo:** ~90s. **Dificuldade:** médio.
- **Engajamento:** alto, mas depende de boa escrita. **Touch:** bom.
- **Aprendizado:** visão mais integrada do consumo consciente ao longo do dia.
- **Complexidade de dev:** média-alta (mais telas/estados). **Risco:** exige mais leitura que as demais — maior chance de abandono em público com pressa.
- **Conclusão:** tomar a decisão consciente em pelo menos parte das cenas.

## 8. Ranking dos Vilões — evolução futura

- **Objetivo:** reconhecer, em ordem relativa (sem números), quais aparelhos costumam pesar mais na conta.
- **Público:** adultos. **Tempo:** ~60s. **Dificuldade:** fácil.
- **Engajamento:** médio. **Touch:** bom (toques sequenciais).
- **Aprendizado:** priorização de atenção em casa (o que vale mais a pena observar).
- **Complexidade de dev:** baixa. **Risco:** pode soar como "prova técnica" se não for bem ilustrado — precisa de tom leve.
- **Conclusão:** apontar corretamente a maioria dos itens de maior destaque.

## 9. Roleta Consciente — evolução futura

- **Objetivo:** vitrine de atração — sorteia uma dica, visitante valida se é boa prática.
- **Público:** todos, ótimo para tela de espera/vitrine. **Tempo:** ~45s. **Dificuldade:** fácil.
- **Engajamento:** muito alto (mecânica de sorte é viciante). **Touch:** ótimo.
- **Aprendizado:** mais raso que as demais, por depender de sorte — bom como complemento, não substituto.
- **Complexidade de dev:** baixa. **Risco:** pode ser percebida como "só sorte", sem ensinar de fato — mitigar sempre mostrando a explicação da dica, acerte ou não.
- **Conclusão:** número mínimo de rodadas respondidas.

---

## Por que essas quatro para o MVP

Cobrem quatro mecânicas de interação diferentes (V/F, jogo da memória, categorização por arrastar, decisão de duas alternativas), nenhuma depende de leitura longa ou cálculo, e todas ficam abaixo de 90 segundos. Juntas mostram a variedade de interação que um totem institucional precisa demonstrar — incluindo um arrastar de verdade (Organize os Hábitos) e uma mecânica clássica muito forte com crianças (Memória da Energia). As cinco atividades restantes ficam prontas para entrar em versões seguintes sem alterar a arquitetura central.
