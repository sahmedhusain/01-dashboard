import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'frontend/dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'apollo-vendor': ['@apollo/client', 'graphql'],
          'animation-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 5173,
    host: true,
    open: false,
  },
  preview: {
    port: 4173,
    host: true,
    open: false,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@apollo/client',
      'graphql',
      'framer-motion',
      'lucide-react',
      'jwt-decode',
    ],
  },
})
