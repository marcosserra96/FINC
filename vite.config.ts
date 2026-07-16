import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

// Painel Interativo Energisa — totem touch para eventos.
// base: './' garante caminhos relativos, necessário para publicar em
// GitHub Pages ou qualquer subpasta sem reconfigurar.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Energisa Consumo Consciente',
        short_name: 'Energisa Painel',
        description: 'Painel interativo educativo sobre eficiência energética',
        theme_color: '#005061',
        background_color: '#005061',
        display: 'fullscreen',
        orientation: 'landscape',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // O service worker antigo só larga o controle na próxima navegação
        // por padrão — skipWaiting + clientsClaim faz o novo assumir assim
        // que termina de instalar, sem esperar todas as abas fecharem.
        // Mesmo assim, uma aba já aberta antes do deploy só pega a versão
        // nova depois de recarregada pelo menos uma vez.
        skipWaiting: true,
        clientsClaim: true,
        // Modo evento: cache-first para nunca depender de internet no estande.
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: { cacheName: 'images-cache' }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 4173
  }
});
