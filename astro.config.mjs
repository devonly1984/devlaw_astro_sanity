// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro'
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      CLERK_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      SANITY_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SANITY_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      SIGNING_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      PUBLIC_DOMAIN_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  server: {
    port: 3000,
  },

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    clerk(),
    sanity({
      projectId: "xqyw1sxo",
      dataset: "production",
      useCdn: false,
      studioBasePath: "/admin",
    }),
  ],
  adapter: node({ mode: "standalone" }),
  output: "server",
});