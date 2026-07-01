import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path do repositório no GitHub Pages (https://<usuario>.github.io/FINC/).
// Ao publicar em outro repositório, ajuste este valor para "/<nome-do-repositorio>/".
export default defineConfig({
  base: '/FINC/',
  plugins: [react()],
})
