import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Honour PORT so the dev server can be told which port to take.
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
