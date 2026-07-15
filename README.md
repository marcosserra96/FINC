# Painel Interativo Energisa — Consumo Consciente

Painel educativo para tela touch, feito para feiras, eventos e ações da Energisa. O visitante toca para começar, joga um desafio rápido sobre eficiência energética, recebe uma mensagem de aprendizado e — quando conclui de verdade — sai com um código para retirar um brinde no estande.

Documentação completa em [`docs/`](docs):

1. [Estratégia e princípios](docs/01-estrategia.md)
2. [Atividades — conceito e seleção do MVP](docs/02-atividades.md)
3. [Fluxo do visitante e mapa de telas](docs/03-fluxo-e-telas.md)
4. [Arquitetura do sistema](docs/04-arquitetura.md)
5. [Manual rápido da equipe do estande](docs/05-manual-operacao.md)
6. [Plano de testes](docs/06-plano-testes.md)
7. [Evoluções futuras](docs/07-evolucoes-futuras.md)

## Stack

React 18 + TypeScript + Vite, `react-router-dom` (HashRouter), `framer-motion` para animação, `lucide-react` para ícones, `qrcode` para o QR do brinde, PWA via `vite-plugin-pwa`. Estado de sessão e configuração ficam em `localStorage` — sem backend obrigatório. Ver justificativas técnicas em [docs/04-arquitetura.md](docs/04-arquitetura.md).

## Rodando localmente

Requer Node 18+.

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Painel administrativo em `http://localhost:5173/#/admin` (PIN padrão `2025` — troque antes de um evento real, ver [manual da equipe](docs/05-manual-operacao.md)).

## Build de produção

```bash
npm run build   # gera ./dist
npm run preview # serve o build localmente para conferência
```

## Publicar no GitHub Pages

O projeto usa `base: './'` e `HashRouter`, então funciona em qualquer subpasta sem configurar rewrites.

```bash
npm run build
# publique o conteúdo de ./dist na branch gh-pages (ex: usando gh-pages CLI)
npx gh-pages -d dist
```

Ative GitHub Pages no repositório apontando para a branch `gh-pages`.

## Publicar na Vercel

1. Importe o repositório na Vercel.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Nenhuma variável de ambiente é obrigatória para o MVP (sem backend).

## Rodando em modo quiosque (o totem no evento)

1. Abra a URL publicada em tela cheia no navegador do equipamento (Chrome recomendado).
2. Toque no ícone de expandir no canto inferior direito da tela de atração, ou use o modo quiosque nativo do navegador/SO (ex: `chrome --kiosk https://sua-url`).
3. Instale como PWA (ícone de instalar na barra de endereço, ou "Adicionar à tela inicial") para rodar sem a UI do navegador e com cache offline.
4. Trave o equipamento em modo quiosque no sistema operacional (Windows Kiosk Mode, Chrome OS Kiosk, ou um app launcher dedicado) para impedir acesso ao SO.

Detalhes operacionais completos: [docs/05-manual-operacao.md](docs/05-manual-operacao.md).

## Estrutura de pastas

```
src/
  public-app/     telas e componentes do fluxo público (visitante)
  activities/      atividades modulares (config + componente de execução)
  admin/           painel administrativo (login, dashboard, seções)
  components/ui/   componentes visuais reutilizáveis (Button, Card, Icon...)
  services/        acesso a localStorage, métricas, brindes, config, auth
  store/           estado global (Context + reducer) e máquina de estados da sessão
  data/            conteúdo das atividades (textos, perguntas, cenários)
  types/           tipos TypeScript compartilhados
  hooks/           idle timer, kiosk guards, fullscreen
  styles/          tokens de marca, globais, animações
docs/              documentação do produto e do projeto
```
