import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dictionary-app/',
  build: {
    sourcemap: true,
    assetsDir: 'assets',
    // Ensure that assets are loaded relatively
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
