// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://biyuboxing.com',
  
  // Performance optimizations
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },
  
  // Image optimization settings
  image: {
    domains: ['biyuboxing.com'],
    remotePatterns: [
      {
        protocol: 'https'
      }
    ]
  },
  
  // Prefetch settings for better navigation performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  
  // Compression and optimization
  compressHTML: true,
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          // Manual chunking for better caching
          manualChunks: {
            'astro': ['astro'],
            'framework': ['@astrojs/internal-helpers']
          }
        }
      }
    }
  }
});