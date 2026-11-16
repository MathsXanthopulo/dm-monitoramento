import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  SITE_URL,
  renderJsonLd,
  renderLlmsTxt,
  renderRobots,
  renderSitemap,
  renderSnapshot,
} from './src/snapshot'

/**
 * GEO/SEO no build e no dev:
 * - texto da página (HTML puro) dentro do #root, para robôs que não executam JS;
 * - JSON-LD no <head>;
 * - __SITE_URL__ do index.html trocado pela URL real;
 * - robots.txt, sitemap.xml e llms.txt gerados com a mesma URL.
 */
function seo(): Plugin {
  return {
    name: 'dm-seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', SITE_URL)
        .replace('<div id="root"></div>', `<div id="root">${renderSnapshot()}</div>`)
        .replace('</head>', `<script type="application/ld+json">\n${renderJsonLd()}\n</script>\n  </head>`)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: renderLlmsTxt() })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  server: { port: 5173 },
})
