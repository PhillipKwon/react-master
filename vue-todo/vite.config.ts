import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // Electron에서 상대 경로 사용
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Vite는 ES 모듈을 사용하지만 Electron은 CommonJS를 사용
  optimizeDeps: {
    exclude: ['electron'],
  },
})
