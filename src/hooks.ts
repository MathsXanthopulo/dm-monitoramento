import { useEffect, useState, type RefObject } from 'react'

/** Progresso (0–1) de uma seção atravessando a tela. */
export function useProgress(ref: RefObject<HTMLElement | null>, from = 0.75, span = 0.9) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const calc = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        setP(Math.min(1, Math.max(0, (innerHeight * from - r.top) / (r.height * span))))
      })
    }
    calc()
    addEventListener('scroll', calc, { passive: true })
    addEventListener('resize', calc)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', calc)
      removeEventListener('resize', calc)
    }
  }, [ref, from, span])
  return p
}

/**
 * Vídeo só no desktop, decidido já na primeira renderização (o <video> nem
 * entra no DOM abaixo de 768px, então nada é baixado). Cai para imagem em
 * prefers-reduced-motion e com Data Saver.
 */
export function useVideoOk() {
  const [ok] = useState(() => {
    if (typeof window === 'undefined') return false
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    return (
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !nav.connection?.saveData
    )
  })
  return ok
}
