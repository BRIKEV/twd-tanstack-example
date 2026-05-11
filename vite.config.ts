import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { twd } from 'twd-js/vite-plugin';
import { twdRemote } from 'twd-relay/vite';
import istanbul from 'vite-plugin-istanbul';

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    devtools(),
    tailwindcss(),
    twd({
      testFilePattern: '/**/*.twd.test.{ts,tsx}',
      open: true,
      position: 'left',
      search: true,
    }),
    twdRemote(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', '**/*.twd.test.ts'],
      requireEnv: !process.env.CI,
      extension: ['.ts', '.tsx'],
    }),
  ],
})

export default config
