/**
 * Desfoque progressivo de borda — adaptado do Skiper UI (skiper41, "Progressive
 * Blur", componente gratuito). Mudanças para esta LP: `absolute` em vez de
 * `fixed` (a borda pertence ao hero, não à janela), cor e altura por prop e
 * máscara nos dois sentidos. Efeito: a borda do vídeo sai de foco e entra no
 * grafite da próxima seção, como uma lente que perde o foco.
 */
export default function ProgressiveBlur({
  position = 'bottom',
  height = 200,
  color = '#0e1012',
}: {
  position?: 'top' | 'bottom'
  height?: number
  color?: string
}) {
  const down = position === 'bottom'
  return (
    <div
      aria-hidden="true"
      className="pblur"
      style={{
        height,
        [down ? 'bottom' : 'top']: 0,
        background: `linear-gradient(to ${down ? 'bottom' : 'top'}, transparent, ${color})`,
        maskImage: `linear-gradient(to ${down ? 'bottom' : 'top'}, transparent, #000 55%)`,
        WebkitMaskImage: `linear-gradient(to ${down ? 'bottom' : 'top'}, transparent, #000 55%)`,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    />
  )
}
