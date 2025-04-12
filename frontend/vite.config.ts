import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ],
  root: './', // Root directory for Vite
  build: {
    outDir: 'dist', // Build output folder
  },
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(new URL(".", import.meta.url)), "./src"),
      "@server": path.resolve(fileURLToPath(new URL(".", import.meta.url)),"../"),
    },
  },
})
