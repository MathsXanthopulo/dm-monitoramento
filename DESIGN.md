# DM Monitoramento · design system ("Latão & Grafite")

**Material:** o produto da DM é metal que fica no portão de casa dia e noite: carcaça de câmera em alumínio escovado, lente de vidro com LED vermelho, arame galvanizado da cerca, cadeado de latão, trilho de portão. **Metáfora:** a chapa de aço gravada, com uma janela acesa lá dentro. **Gesto de marca:** o LED vermelho da câmera é o ponto final de todo título (e é a única coisa vermelha da página). **Clichê evitado:** azul neon, matriz verde, cadeado brilhante, tela de hacker.

1. **Cores (60-30-10):** grafite `#0e1012` e chumbo `#171a1d` (60), aço escovado `#e4e7e9`/`#d3d7da` e alumínio `#aab1b6` (30), latão `#c9a24b`→`#e0bf6a` só nos CTAs e nos objetos de latão (10). LED `#ff3b2f` só como ponto final/lente. Texto: `#eef0f1` no escuro, `#14171a` no aço. Seções alternam escuro/aço como o metal muda de luz.
2. **Fonte:** uma família só, Schibsted Grotesk (400–800). Títulos 800 com tracking −0.045em e entrelinha 0.93–0.96 (H1 `clamp(2.75rem,7.4vw,6.2rem)`); corpo 400 a 17px/1.6. Sem mono, sem serifa, sem Inter.
3. **Ritmo e forma:** sem cards. Réguas de 1px, linhas de lista e espaço (seção `clamp(4.5rem,10vw,9rem)`); raio 6px nos botões ("chapa"), círculo só na lente; sombras de objeto físico, não de UI. Container 76rem, quebra de simetria 5/7 e 6/5, foto sangrando na história.
4. **Movimento:** easing `cubic-bezier(0.16,1,0.3,1)`, entradas 0.9s; foco de câmera (blur→nítido) no hero e na troca de serviço; folha do portão corre no trilho com o scroll; LED pisca a 3.4s; Lenis no scroll. Tudo cai para estático em `prefers-reduced-motion`.
5. **Componentes autorais:** `Lente` (serviços), `Trilho` (como pedir orçamento), `Placa` (contato, placa "imóvel monitorado" com o telefone), `Arame` (marca de seção). Infra reaproveitada: `Reveal`, `SeamlessVideo`, `WhatsAppCta` (shared).
6. **Mídia:** Pexels, tratada na paleta (dessaturada, grafite por cima). Vídeo só ≥768px, sem Data Saver e sem reduced-motion; abaixo disso o poster do mesmo vídeo. Tudo em `src/media/`, resolvido por `media()`.

## Notas da ferramenta ui-ux-pro-max
A busca `--design-system` devolveu "Modern Dark", azul `#2563EB` e JetBrains Mono ("hacker"). Isso é o clichê que o briefing manda evitar, então foi **descartado**. Aproveitado do resultado: padrão *Trust & Authority + Conversion* (CTA no nav + sticky), densidade espaçosa, easing expo.out, nunca `#000` puro, alvos de toque de 44px, ícones SVG (sem emoji), foco visível e reduced-motion.

## Onde editar o conteúdo
`src/dados.ts`: telefone/WhatsApp (confirmado), Instagram, os 6 serviços e `LOCAL` (sede Mogi das Cruzes e região atendida preenchidas; endereço e mapa `null`: só aparecem quando preenchidos).

## GEO / SEO (busca e respostas de IA)
- **Snapshot HTML:** a LP é SPA, então o plugin `seoSnapshot` (vite.config.ts + `src/snapshot.ts`) escreve o texto da página (títulos, serviços, perguntas, contato) dentro do `#root` no build; o React o substitui ao subir. O texto vem todo de `src/dados.ts` (fonte única), então não há versão "só para robô".
- **JSON-LD** no `<head>`: `LocalBusiness` (nome, telefone, Instagram, cidade Mogi das Cruzes/SP, `areaServed` Grande SP e interior de SP, catálogo dos 6 serviços) e `FAQPage`. Sem rua, número, bairro, coordenadas, horário ou preço (não são fatos conhecidos). Não existe subtipo schema.org para segurança eletrônica, por isso o tipo é `LocalBusiness`.
- **FAQ** (7ª seção): 6 perguntas, só com fato da bio/posts e do briefing. Para acrescentar prazo, preço ou marca, confirmar com o Mateus antes.
- `robots.txt`, `sitemap.xml` e `llms.txt` são **gerados no build** (plugin `seo` em `vite.config.ts`) com a URL do site. O `llms.txt` é barato mas, segundo estudos, quase não é lido.
- **URL do site:** vem de `SITE_URL` (domínio próprio) ou, na Vercel, de `VERCEL_PROJECT_PRODUCTION_URL` (a Vercel define sozinha); sem nenhuma das duas, usa `https://dm-monitoramento.vercel.app/`. Ela entra em `og:url`, `canonical`, `og:image`, JSON-LD, sitemap, robots e llms. Ao comprar um domínio: defina `SITE_URL=https://seudominio.com.br` nas variáveis do projeto na Vercel e faça um novo deploy.
- Fora do código (mais peso para local): completar o Perfil da Empresa no Google com o mesmo nome e telefone, avaliações que citem serviços, Instagram igual.
