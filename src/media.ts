/**
 * Mídia versionada: vive em src/media/ e é resolvida por glob para o Vite
 * hashear o nome (trocar o arquivo troca a URL; nenhum cache serve o antigo)
 * e injetar o `base` sozinho (funciona em `/` e em `/dm-monitoramento/`).
 */
const MEDIA = import.meta.glob('./media/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const media = (f: string) => {
  const url = MEDIA[`./media/${f}`]
  if (!url && import.meta.env.DEV) throw new Error(`mídia inexistente: src/media/${f}`)
  return url ?? ''
}
