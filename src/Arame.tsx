/** Arame galvanizado torcido: dois fios que se cruzam. Marca o início de cada seção. */
export default function Arame({ className = '' }: { className?: string }) {
  const ondas = (inv: boolean) => {
    let d = 'M0 7'
    for (let x = 0; x < 120; x += 20) {
      const y1 = inv ? 1 : 13
      d += ` C ${x + 5} ${y1}, ${x + 15} ${14 - y1}, ${x + 20} 7`
    }
    return d
  }
  return (
    <svg className={`arame ${className}`} viewBox="0 0 120 14" width="96" height="12" aria-hidden="true" focusable="false">
      <path d={ondas(false)} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d={ondas(true)} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
    </svg>
  )
}
