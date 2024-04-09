// astro.config.ts
import { defineConfig } from "astro/config";
import { defaultLayout } from "astro-default-layout";

// https://astro.build/config
export default defineConfig(
    {
        site:"https://parlier-njrotc.github.io",
        markdown:{
            remarkPlugins: [defaultLayout]
        }
    }
)
