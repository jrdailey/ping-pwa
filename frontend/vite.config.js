import { defineConfig } from 'vite'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@generated': path.resolve(__dirname, './generated'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.vue$/],
    },
  },
})
