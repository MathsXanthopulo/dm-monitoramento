import { useEffect, useRef, useState } from 'react'

/**
 * Loop sem corte: duas camadas de <video>; perto do fim de uma, a outra
 * começa do zero e entra em fade. Sem áudio, sempre muted + playsInline.
 */
export default function SeamlessVideo({
  src,
  poster,
  fade = 1.4,
  className = '',
}: {
  src: string
  poster?: string
  fade?: number
  className?: string
}) {
  const a = useRef<HTMLVideoElement>(null)
  const b = useRef<HTMLVideoElement>(null)
  const [front, setFront] = useState<'a' | 'b'>('a')
  const frontRef = useRef<'a' | 'b'>('a')

  useEffect(() => {
    const va = a.current
    const vb = b.current
    if (!va || !vb) return
    const videos = { a: va, b: vb }
    const tick = () => {
      const cur = videos[frontRef.current]
      const nxt = videos[frontRef.current === 'a' ? 'b' : 'a']
      if (cur.duration && cur.currentTime > cur.duration - fade - 0.1 && nxt.paused) {
        nxt.currentTime = 0
        nxt.play().catch(() => {})
        frontRef.current = frontRef.current === 'a' ? 'b' : 'a'
        setFront(frontRef.current)
        window.setTimeout(() => {
          cur.pause()
        }, fade * 1000 + 200)
      }
    }
    va.play().catch(() => {})
    va.addEventListener('timeupdate', tick)
    vb.addEventListener('timeupdate', tick)
    return () => {
      va.removeEventListener('timeupdate', tick)
      vb.removeEventListener('timeupdate', tick)
    }
  }, [fade])

  const common = {
    muted: true,
    playsInline: true,
    preload: 'auto' as const,
    poster,
    'aria-hidden': true,
    tabIndex: -1,
  }
  const style = (on: boolean) => ({ opacity: on ? 1 : 0, transition: `opacity ${fade}s linear` })
  return (
    <div className={`sv ${className}`}>
      <video ref={a} src={src} {...common} style={style(front === 'a')} />
      <video ref={b} src={src} {...common} style={style(front === 'b')} />
    </div>
  )
}
