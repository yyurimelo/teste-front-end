import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/yyurimelo/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // A API de produtos não envia headers de CORS, então o navegador
      // não consegue buscá-la diretamente; o proxy resolve isso em dev.
      '/teste-front-end': {
        target: 'https://app.econverse.com.br',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/teste-front-end': {
        target: 'https://app.econverse.com.br',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})