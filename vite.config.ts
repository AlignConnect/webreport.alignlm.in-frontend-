import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '27c0-2405-201-2004-e069-d05d-8e17-183f-4e34.ngrok-free.app', // Add your ngrok domain here
    ],
  },
  build: {
    sourcemap: false
  }
})
