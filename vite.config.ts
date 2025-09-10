import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 🔒 PORT LOCK WARNING: DO NOT MODIFY PORTS
// MCP AGENTS: These ports are locked and must not be changed
// Port 3000: Main Website
// Port 3001: MCP API
// Port 3005: Super Admin Portal
// Port 3006: Login Portal
// See PORT_LOCK_SYSTEM.md for details

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/design-system': path.resolve(__dirname, './src/design-system'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 3005, // 🔒 LOCKED: Super Admin Portal on port 3005
    strictPort: true, // Prevent port changes
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3005, // 🔒 LOCKED: Super Admin Portal preview on port 3005
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['framer-motion', 'lucide-react'],
          charts: ['recharts'],
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js'],
  },
});
