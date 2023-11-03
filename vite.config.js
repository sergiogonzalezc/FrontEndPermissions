import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // we defined wish port the proyect will run on when execute: "npm run preview", and expose port 8080
  server: {
    host: true,
    strictPort: true,
    port: 8081
  },
  preview: {
    host: true,
    strictPort: true,
    port: 8081
  }
})
