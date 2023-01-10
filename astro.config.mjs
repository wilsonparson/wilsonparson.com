import { defineConfig } from 'astro/config';
import { defaultLayout } from 'astro-default-frontmatter';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [[defaultLayout, '../../layouts/MarkdownLayout.astro']],
  },
  integrations: [
    tailwind({
      config: { path: './tailwind.config.js' },
    }),
  ],
});
