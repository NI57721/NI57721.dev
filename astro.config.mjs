// @ts-check
import { defineConfig } from 'astro/config';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                            @use "./src/styles/_variables.scss" as var;
                            @use "./src/styles/_mixins.scss" as mixin;
                          `,
        },
      },
    },
  },

  integrations: [icon()],
});