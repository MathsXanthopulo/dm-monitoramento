import { media } from './media'
import { TELEFONE, PRODUTO } from './dados'

/**
 * COMPONENTE AUTORAL 3 — a placa.
 * O telefone vira o objeto que ele já é na vida real: a placa de alumínio
 * "imóvel monitorado" parafusada no muro, com a logo na faixa preta.
 * Fonte do objeto, rebites, escova do metal e leve rotação.
 */
export default function Placa() {
  return (
    <figure className="placa" aria-label={`Imóvel monitorado por ${PRODUTO}, ${TELEFONE}`}>
      <i className="rebite tl" /><i className="rebite tr" /><i className="rebite bl" /><i className="rebite br" />
      <div className="placa-faixa">
        <img src={media('logo-sm.webp')} alt="" width={64} height={64} />
        <span>{PRODUTO}</span>
      </div>
      <div className="placa-corpo">
        <b>Imóvel<br />monitorado</b>
        <span className="placa-fone">{TELEFONE}</span>
      </div>
    </figure>
  )
}
