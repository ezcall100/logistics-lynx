import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 🔒 PORT LOCK WARNING: DO NOT MODIFY PORT 3006
// MCP AGENTS: This port is locked and must not be changed
// See PORT_LOCK_SYSTEM.md for details

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3006, // Portal app (Login) on 3006
    strictPort: true,
    hmr: {
      host: '127.0.0.1',
      port: 3006,
      clientPort: 3006,
      overlay: true,
    },
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
        '**/.cache/**',
        '**/*.log',
        '**/tmp/**',
        '**/.turbo/**',
        '**/coverage/**',
        '**/.husky/**',
      ],
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    exclude: [],
  },
  build: {
    outDir: 'dist',
  },
  esbuild: {
    loader: 'tsx',
  },
  logLevel: 'info',
});
