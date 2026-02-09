import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/webhook': {
        target: 'https://bernardine-nonneural-glacially.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
