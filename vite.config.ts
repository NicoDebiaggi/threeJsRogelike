import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Add the declaration of __dirname
declare const __dirname: string;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
})
