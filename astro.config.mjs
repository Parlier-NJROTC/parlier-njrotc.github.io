// astro.config.mjs
import astroLayouts from "astro-layouts";
import mdx from "@astrojs/mdx";

const layoutOptions = {
  "pages/**/*": '/src/layouts/MainLayout.astro',
  "pages/*": "/src/layouts/Layout.astro"
};

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [[astroLayouts, layoutOptions]],
  },
});