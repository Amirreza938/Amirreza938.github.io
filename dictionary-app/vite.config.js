import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Amirreza938.github.io/', // Make sure this matches your GitHub repository name exactly
  build: {
    sourcemap: true,
    assetsDir: 'assets',
    outDir: 'dist',
    // Ensure assets are correctly referenced
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
