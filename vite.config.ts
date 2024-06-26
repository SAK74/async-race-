import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({}) => ({
  plugins: [react(), svgr()],
  server: { host: true },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
}));
