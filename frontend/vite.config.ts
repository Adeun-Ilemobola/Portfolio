import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths() ],
  build: {
    outDir: 'dist', // Build output folder
    emptyOutDir: true, // Empty the output folder before building
  },

  server:{
    port: 3000, // Port for the development server
    open: true, // Open the browser after server is started
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
