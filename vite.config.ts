import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Minimal typing so the config can read PORT without pulling in @types/node.
declare const process: { env: Record<string, string | undefined> };

export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5173, host: '127.0.0.1' },
  // The recipe library is bundled as data (~160 kB gzipped); no need to warn about it.
  build: { chunkSizeWarningLimit: 700 },
  preview: { port: 4173, host: '127.0.0.1' },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
  },
});
