import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'

import path from 'path';

const pathResolve = (dirPath) => path.resolve(__dirname, dirPath)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `/${pathResolve('src')}/`,
      },
    ],
  },
  server: {
    port: 9003,
    open: true,
  }
})
