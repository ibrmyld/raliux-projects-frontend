import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'globalThis',
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'wagmi',
      '@web3modal/wagmi',
      'viem',
      'buffer'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
          'web3': ['wagmi', '@web3modal/wagmi', 'viem']
        }
      }
    },
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    chunkSizeWarningLimit: 1000
  },
  esbuild: {
    target: 'esnext',
    platform: 'browser'
  }
})