// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://NI57721.dev",
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                            @use "/src/styles/_variables.scss" as var;
                            @use "/src/styles/_mixins.scss" as mixin;
                          `,
        },
      },
    },
  },
  integrations: [icon(), react()],
});
