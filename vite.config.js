import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5173, // Using Vite's default port
    host: true, // Allow access from all network interfaces
    strictPort: true, // Ensure exact port usage
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '*.ngrok-free.app',
      'ce5f-103-101-119-214.ngrok-free.app' // Adding specific ngrok host
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
