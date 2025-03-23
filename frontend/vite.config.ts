import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite"

import { fileURLToPath } from 'url';
import path from 'path';


export default defineConfig({
  plugins: [react(), tailwindcss()],
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
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
});
