import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import image from "@astrojs/image";

export default defineConfig({
  site: "https://oliverbutler.uk",
  server: {
    port: 4201,
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    image(),
  ],
});
