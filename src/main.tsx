import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from '@/store/AppContext';
// Empacotado localmente pelo bundler (não é CDN/Google Fonts) — os arquivos
// da fonte entram no build normal e ficam no cache do PWA, mantendo o totem
// funcional offline sem depender de rede pra carregar a fonte.
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/800.css';
import '@/styles/theme.css';
import '@/styles/global.css';
import '@/styles/animations.css';

// HashRouter: o painel precisa funcionar em hospedagem estática (GitHub
// Pages, pasta local) sem configurar rewrite de servidor para rotas SPA.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </StrictMode>
);
