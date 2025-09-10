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
    port: 3000, // Main website on port 3000
    strictPort: false, // Allow port changes for flexibility
    host: true,
    // Enable HTTPS for local development with custom domain
    https: false, // Set to true if you want HTTPS locally
    // Allow all transbotai.com subdomains for local development
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'transbotai.com',
      'www.transbotai.com',
      'customer.transbotai.com',
      'broker.transbotai.com',
      'carrier.transbotai.com',
      'driver.transbotai.com',
      'shipper.transbotai.com',
      'analytics.transbotai.com',
      'marketplace.transbotai.com',
      'financial.transbotai.com',
      'fleet.transbotai.com',
      'crm.transbotai.com',
      'loadboard.transbotai.com',
      'admin.transbotai.com',
      'mcp.transbotai.com',
      'superadmin.transbotai.com',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      // Proxy for subdomains
      '/customer': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/customer/, ''),
      },
      '/broker': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/broker/, ''),
      },
      '/carrier': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/carrier/, ''),
      },
      '/driver': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/driver/, ''),
      },
      '/shipper': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/shipper/, ''),
      },
      '/admin': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/admin/, ''),
      },
      '/mcp': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/mcp/, ''),
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
