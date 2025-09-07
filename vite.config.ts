import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to your Express server
      '/api': {
        target: 'http://localhost:4242',
        changeOrigin: true,
      },
      '/create-checkout-session': {
        target: 'http://localhost:4242',
        changeOrigin: true,
      },
      '/verify-payment': {
        target: 'http://localhost:4242',
        changeOrigin: true,
      },
      '/send-receipt': {
        target: 'http://localhost:4242',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
  }
});