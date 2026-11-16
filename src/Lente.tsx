import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { media } from './media'
import { SERVICOS } from './dados'

/**
 * COMPONENTE AUTORAL 1 — a lente.
 * O visitante escolhe o serviço na lista (clique, toque ou teclado) e a lente
 * troca de imagem com foco de câmera: a foto entra desfocada e "puxa o foco".
 * No celular a lente grande some e cada linha ganha a própria miniatura —
 * nada depende de hover.
 */
export default function Lente() {
  const [i, setI] = useState(0)
  return (
    <div className="lente-grid">
      <div className="lente-col">
        <div className="lente" aria-hidden="true">
          <div className="lente-anel">
            <div className="lente-vidro">
              {SERVICOS.map((s, k) => (
                <img
                  key={s.id}
                  src={media(s.img)}
                  alt=""
                  loading={k === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={k === i ? 'on' : ''}
                />
              ))}
              <span className="lente-reflexo" />
            </div>
            <span className="lente-led" />
          </div>
        </div>
        <p className="lente-legenda" aria-live="polite">
          <span className="led" aria-hidden="true" />
          <span>
            {String(i + 1).padStart(2, '0')} · {SERVICOS[i].nome}
          </span>
        </p>
      </div>

      <ul className="servicos" role="list">
        {SERVICOS.map((s, k) => (
          <li key={s.id}>
            <button
              type="button"
              className={`serv ${k === i ? 'on' : ''}`}
              aria-pressed={k === i}
              onClick={() => setI(k)}
              onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setI(k)}
              onFocus={() => setI(k)}
            >
              <span className="serv-mini" aria-hidden="true">
                <img src={media(s.img)} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="serv-num">{String(k + 1).padStart(2, '0')}</span>
              <span className="serv-txt">
                <strong>{s.nome}</strong>
                <span>{s.desc}</span>
              </span>
              <ArrowUpRight className="serv-seta" aria-hidden="true" size={22} strokeWidth={1.6} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
