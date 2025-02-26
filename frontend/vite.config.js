import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": {
      target: "http://localhost:4000",
      changeOrigin: true,
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
})
