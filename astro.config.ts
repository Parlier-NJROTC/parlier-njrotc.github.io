import { defineConfig, envField } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  experimental:{
      env:{
          schema:{
              API_URL:envField.string({
                  context:"client",
                  access:"public"
              })
          }

      }
  }
});