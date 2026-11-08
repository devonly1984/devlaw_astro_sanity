// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro'
import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), clerk()],
  adapter: netlify(),
  output: "server",
});