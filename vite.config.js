import { defineConfig } from 'vite';

// Embute o CSS no HTML no build: tira uma ida e volta de rede antes da primeira pintura (FCP/LCP).
const inlineCss = () => ({
  name: 'inline-css',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx.bundle) return html;
      for (const [name, chunk] of Object.entries(ctx.bundle)) {
        if (chunk.type !== 'asset' || !name.endsWith('.css')) continue;
        const at = html.indexOf(`/${name}"`);
        if (at === -1) continue;
        const start = html.lastIndexOf('<link', at);
        const end = html.indexOf('>', at) + 1;
        html = html.slice(0, start) + `<style>${chunk.source}</style>` + html.slice(end);
        delete ctx.bundle[name];
      }
      return html;
    },
  },
});

export default defineConfig({
  plugins: [inlineCss()],
});
