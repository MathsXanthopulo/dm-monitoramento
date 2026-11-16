/**
 * Snapshot em HTML puro + JSON-LD, gerados no build a partir de `dados.ts`.
 *
 * Por quê: a LP é uma SPA em React, então o HTML que sai do servidor era uma
 * <div id="root"></div> vazia. Robôs de IA e de busca que não executam
 * JavaScript não enxergariam nenhum texto. O snapshot põe o conteúdo real
 * (títulos, serviços, perguntas e respostas) dentro do #root; quando o React
 * sobe, ele substitui esse bloco. É o MESMO texto da página (fonte única em
 * dados.ts), então não existe versão "só para robô".
 */
import {
  COPY,
  FAQ,
  INSTAGRAM,
  LOCAL,
  PASSOS,
  PILARES,
  PRODUTO,
  SERVICOS,
  TELEFONE,
} from './dados'

/**
 * URL pública do site, com barra final. Ordem: SITE_URL (domínio próprio) >
 * VERCEL_PROJECT_PRODUCTION_URL (a Vercel define no build) > padrão da Vercel.
 * Roda só no Node (vite.config), nunca no navegador.
 */
function resolveSiteUrl(): string {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}
  const raw = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '') || 'https://dm-monitoramento.vercel.app'
  return raw.replace(/\/+$/, '') + '/'
}
export const SITE_URL = resolveSiteUrl()

/** robots.txt, sitemap.xml e llms.txt com a URL certa (gerados no build). */
export function renderRobots(): string {
  return `# Liberar de propósito os robôs de busca e de resposta das IAs: bloqueá-los tira o site das respostas.
User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`
}
export function renderSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
  </url>
</urlset>
`
}
export function renderLlmsTxt(): string {
  return `# ${PRODUTO}

> Empresa de segurança eletrônica com sede em ${LOCAL.sede ?? ''}. Atende a ${LOCAL.regiao ?? ''}, para casas, condomínios e pequenas empresas.

Serviços: ${SERVICOS.map((x) => x.nome.toLowerCase()).join(', ')}. Instalação profissional.

Orçamento: pelo WhatsApp, ${TELEFONE}.

- [Página principal](${SITE_URL}): serviços, como pedir orçamento, perguntas frequentes e contato.
- [Instagram](${INSTAGRAM})
`
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function renderSnapshot(): string {
  const local = [LOCAL.sede && `Sede em ${LOCAL.sede}`, LOCAL.regiao && `Atendemos ${LOCAL.regiao}`]
    .filter(Boolean)
    .join('. ')
  return `<main data-snapshot>
<h1>${esc(PRODUTO)}: a gente vigia. Você descansa.</h1>
<p>${esc(COPY.heroSub)}</p>
<ul>${COPY.heroFatos.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
<section id="servicos"><h2>${esc(COPY.servicosTitulo)}</h2><p>${esc(COPY.servicosLead)}</p>
<ul>${SERVICOS.map((s) => `<li><h3>${esc(s.nome)}</h3><p>${esc(s.desc)}</p></li>`).join('')}</ul></section>
<section id="por-que"><h2>${esc(COPY.porqueTitulo)}</h2><p>${esc(COPY.porqueLead)}</p>
<ul>${PILARES.map((p) => `<li><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></li>`).join('')}</ul></section>
<section id="orcamento"><h2>${esc(COPY.orcamentoTitulo)}</h2><p>${esc(COPY.orcamentoLead)}</p>
<ol>${PASSOS.map((p) => `<li><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></li>`).join('')}</ol></section>
<section id="historia"><h2>${esc(COPY.historiaTitulo)}</h2><p>${esc(COPY.historiaTexto)}</p><p>${esc(COPY.historiaAssina)}</p></section>
<section id="perguntas"><h2>${esc(COPY.faqTitulo)}</h2>
${FAQ.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n')}</section>
<section id="contato"><h2>${esc(COPY.contatoTitulo)}</h2><p>${esc(COPY.contatoLead)}</p>
<p>WhatsApp e telefone: ${esc(TELEFONE)}. Instagram: <a href="${INSTAGRAM}">@dm.monitoramento</a>.</p>
${local ? `<p>${esc(local)}.</p>` : ''}</section>
<footer><p>${esc(PRODUTO)}. ${esc(COPY.rodapeDescricao)}</p></footer>
</main>`
}

/**
 * JSON-LD: só fato confirmado. Sem rua/número/bairro (desconhecidos), sem
 * coordenadas, sem horário, sem preço. Não existe subtipo schema.org específico
 * para segurança eletrônica, então o tipo é LocalBusiness.
 */
export function renderJsonLd(): string {
  const graph = [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}#empresa`,
      name: PRODUTO,
      url: SITE_URL,
      image: `${SITE_URL}og-v1.jpg`,
      description: `Segurança eletrônica em ${LOCAL.sede ?? ''}: câmeras de segurança (CFTV), cerca elétrica, portões automáticos, antenas, controle de acesso e monitoramento 24h para casas, condomínios e pequenas empresas.`,
      telephone: '+55 11 93012-7688',
      sameAs: [INSTAGRAM],
      address: { '@type': 'PostalAddress', addressLocality: 'Mogi das Cruzes', addressRegion: 'SP', addressCountry: 'BR' },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Grande São Paulo' },
        { '@type': 'AdministrativeArea', name: 'Interior de São Paulo' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços da DM Monitoramento',
        itemListElement: SERVICOS.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.nome, description: s.desc },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#perguntas`,
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c')
}
