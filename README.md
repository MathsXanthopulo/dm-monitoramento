# DM Monitoramento

Landing page da **DM Monitoramento** (segurança eletrônica, Mogi das Cruzes e região). Uma página, português do Brasil, um único objetivo: pedir orçamento no WhatsApp.

Direção visual "Latão & Grafite": a página é feita do que a DM instala (alumínio escovado, grafite, latão) e o LED vermelho da câmera é o ponto final de todo título. Detalhes em [`DESIGN.md`](DESIGN.md).

## Stack
Vite 7 + React 19 + TypeScript + Tailwind 4. Sem backend, sem banco, sem segredos.

## Rodar
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (com snapshot HTML, JSON-LD, robots, sitemap, llms.txt)
npm run preview  # serve o dist/
```

## Conteúdo
Todo texto e dado de contato estão em [`src/dados.ts`](src/dados.ts) (WhatsApp, Instagram, serviços, FAQ, sede e região). Endereço e mapa estão `null` de propósito: só aparecem quando preenchidos. Não inclua preço, prazo, marca de equipamento ou tempo de mercado sem confirmação do cliente.

## Hospedagem (Vercel, plano gratuito)
Projeto Vite padrão: `npm run build`, saída `dist`. A URL pública vem de `SITE_URL` ou de `VERCEL_PROJECT_PRODUCTION_URL` (veja `DESIGN.md`). Para domínio próprio: defina `SITE_URL` nas variáveis do projeto.

## Mídia
Fotos e vídeos do Pexels (ilustrativos) em `src/media/`, resolvidos por `media()` com `import.meta.glob` (o Vite gera o hash do nome). Trocar por fotos reais da empresa quando houver. Sem crédito do Pexels no rodapé, por decisão do cliente; só "Feito por Cold Code Labs".

## Origem
Criada pelo fluxo da Aurora Labs (vitrine em `cold-code-labs/aurora-labs`, pasta `lps/dm-monitoramento`). Este repositório é o projeto independente que vai para a Vercel.
