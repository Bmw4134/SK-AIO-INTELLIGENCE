import { defineConfig } from 'astro/config';
import qwik from '@qwikdev/astro';

export default defineConfig({
  integrations: [qwik()],
  output: 'hybrid',
  server: {
    port: 4321,
    host: true
  },
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }
});