import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  redirects: {
    "/Gallery/Page--1": "/Gallery",
    "/Gallery/Page-0": "/Gallery"
  }
});