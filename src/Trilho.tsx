import { useRef, type ReactNode } from 'react'
import { useProgress } from './hooks'

export type Passo = { n: string; titulo: string; texto: string }

/**
 * COMPONENTE AUTORAL 2 — o trilho do portão.
 * Três paradas num trilho de aço; uma folha de portão em latão corre por ele
 * conforme o scroll (horizontal no desktop, vertical no celular). O texto dos
 * passos fica sempre visível: o movimento é só a metáfora.
 */
export default function Trilho({ passos, children }: { passos: Passo[]; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const p = useProgress(ref, 0.8, 0.8)
  const ativo = p < 0.34 ? 0 : p < 0.67 ? 1 : 2
  return (
    <div className="trilho" ref={ref} style={{ ['--p' as string]: p.toFixed(3) }}>
      <div className="trilho-via" aria-hidden="true">
        <span className="trilho-fio" />
        <span className="trilho-batente a" />
        <span className="trilho-batente b" />
        <span className="folha">
          <i /><i /><i /><i /><i />
        </span>
      </div>
      <ol className="passos">
        {passos.map((s, k) => (
          <li key={s.n} className={`passo ${k <= ativo ? 'ligado' : ''}`}>
            <span className="passo-parada" aria-hidden="true" />
            <span className="passo-n">{s.n}</span>
            <h3>{s.titulo}</h3>
            <p>{s.texto}</p>
          </li>
        ))}
      </ol>
      {children}
    </div>
  )
}
