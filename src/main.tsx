import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from '@/store/AppContext';
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
