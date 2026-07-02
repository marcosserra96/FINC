# Energisa · Consumo Consciente (Totem Interativo)

Aplicação web interativa para tela touch, criada para estandes e eventos do Grupo Energisa. Traz jogos e atividades educativas sobre consumo consciente e eficiência energética.

100% front-end (React + Vite), sem backend, com configurações e ranking salvos em `localStorage`. Depois do primeiro carregamento, funciona totalmente offline.

## Funcionalidades

- **Tela inicial** com chamada principal, botões grandes de atividades e logo com acesso oculto à área da equipe.
- **Quiz Rápido**: perguntas de múltipla escolha sobre economia e segurança no uso de energia, com feedback imediato e pontuação final.
- **Jogo da Memória**: encontre os pares de ícones ligados a economia de energia (lâmpada LED, geladeira, ar-condicionado, chuveiro, energia solar, tomada), com um selo de eficiência A-E ao final baseado no número de tentativas.
- **O Que Mais Consome Energia?**: compare eletrodomésticos e descubra quais pesam mais na conta de luz, com um ranking educativo ao final.
- **Ranking opcional** (apenas apelido + pontuação, sem dados pessoais).
- **Área da equipe (admin)** protegida por PIN, oculta atrás de 5 toques no logo da tela inicial.
- Cuidados de kiosk: botões grandes, sem seleção de texto, sem zoom acidental, sem menu de contexto, retorno automático à tela inicial por inatividade.

## Stack

- React 19 + Vite
- React Router (`HashRouter`, compatível com GitHub Pages)
- CSS puro, organizado por componente, com variáveis de tema do Grupo Energisa
- Persistência via `localStorage` (configurações, perguntas do quiz e ranking)

## Estrutura de pastas

```
src/
  components/
    common/     -> BigButton, HomeButton, Logo, ScreenShell, FeedbackOverlay, NumericKeypad
    admin/      -> Seções do painel da equipe (Geral, Atividades, Quiz, Ranking, Avançado)
  context/      -> ConfigContext (config, quiz, ranking, autenticação admin)
  data/         -> Conteúdo padrão (perguntas do quiz, cômodos, eletrodomésticos)
  hooks/        -> useIdleRedirect (retorno por inatividade), useSecretTap (toque oculto)
  pages/
    Home/
    activities/QuizGame, MemoryGame, ApplianceRace
    Ranking/
    admin/      -> AdminGate (PIN) + AdminPanel
  styles/       -> variables.css (cores Energisa) e global.css (regras de kiosk)
  utils/        -> storage.js, shuffle.js
```

## Como rodar localmente

Pré-requisitos: Node.js 18+ e npm.

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173/`.

## Como gerar o build de produção

```bash
npm run build
```

Os arquivos estáticos são gerados em `dist/`. Para conferir o build localmente antes de publicar:

```bash
npm run preview
```

## Como publicar no GitHub Pages

O projeto já está configurado com `base: '/FINC/'` em `vite.config.js` e usa `HashRouter`, então as rotas funcionam corretamente no GitHub Pages (sem erro 404 ao navegar ou atualizar a página).

> Se o repositório tiver outro nome, ajuste o `base` em `vite.config.js` para `'/<nome-do-repositorio>/'`.

### Opção 1 — Deploy automático via GitHub Actions (recomendado)

1. No GitHub, vá em **Settings → Pages** e defina **Source** como **GitHub Actions**.
2. Este projeto já inclui o workflow `.github/workflows/deploy.yml`, que builda e publica automaticamente a cada push na branch `main`.
3. Após o push, acompanhe o deploy na aba **Actions** do repositório. A URL final ficará algo como `https://<usuario>.github.io/FINC/`.

### Opção 2 — Deploy manual com `gh-pages`

```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

Depois, em **Settings → Pages**, selecione a branch `gh-pages` como fonte.

## Como acessar a área da equipe (admin)

1. Na tela inicial, toque **5 vezes seguidas no logo** (dentro de poucos segundos).
2. Digite o **PIN de acesso** (padrão: `2026`) no teclado numérico exibido.
3. No painel, é possível:
   - Enviar o logo oficial (SVG ou PNG) na aba **Geral**;
   - Editar a mensagem da tela inicial;
   - Ajustar o tempo de inatividade até o retorno automático;
   - Trocar o PIN de acesso;
   - Ativar/desativar cada atividade;
   - Editar, adicionar e excluir perguntas do quiz;
   - Ativar/desativar o ranking e limpá-lo;
   - Restaurar todas as configurações para o padrão de fábrica.
4. Use **"Voltar para o modo público"** no topo do painel para sair e retornar à tela inicial.

Todas as alterações são salvas automaticamente no `localStorage` do navegador usado no totem.

## Modo kiosk / tela cheia no evento

Para uma experiência de totem sem barra de endereço nem gestos do navegador:

- **Chrome/Edge (Windows)**: abra o navegador com a flag de kiosk, por exemplo:
  ```
  chrome.exe --kiosk "https://<usuario>.github.io/FINC/"
  ```
- **Tela cheia manual**: pressione `F11` no navegador (funciona em qualquer sistema).
- **Tablets/monitores touch**: ative o "modo quiosque" do próprio sistema operacional (Windows Assigned Access, Guided Access no iOS, modo quiosque do Android) apontando para a URL publicada.
- Recomenda-se também desativar atualizações automáticas do SO e o modo de suspensão da tela durante o evento.

## Backup local, caso a internet do evento falhe

Como a aplicação é 100% front-end, ela funciona sem internet **depois de carregada uma vez**. Para ter uma versão local de backup:

1. Gere o build: `npm run build`.
2. Copie a pasta `dist/` para o computador/tablet do estande (pen drive, ou compartilhamento local).
3. Sirva os arquivos localmente, por exemplo com:
   ```bash
   npx serve dist
   ```
   ou qualquer outro servidor estático simples.
4. Abra a URL local (ex.: `http://localhost:3000`) no navegador do totem.

Como o app usa `HashRouter` e caminhos relativos, ele funciona tanto publicado no GitHub Pages quanto servido localmente a partir da pasta `dist/`.

## Conteúdo educativo

As perguntas do quiz e os dados de consumo/desperdício incluídos são **exemplos fictícios com fins educativos**, pensados para linguagem simples sobre economia de energia, segurança elétrica e uso consciente de eletrodomésticos. Todo o conteúdo pode ser editado pela área da equipe (quiz) ou diretamente no código-fonte (`src/data/`), para os demais conteúdos.
