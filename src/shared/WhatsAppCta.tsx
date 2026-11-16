/**
 * ─────────────────────────────────────────────────────────────────────────────
 * FONTE ÚNICA — edite SEMPRE em `lps/shared/WhatsAppCta.tsx` e rode:
 *     node scripts/sync-shared.mjs
 * As cópias em `lps/<slug>/src/shared/` são geradas. Editar a cópia é perdido
 * no próximo sync (e `--check` acusa a divergência).
 *
 * Por que cópia e não symlink: `fidelyx` e `aurora` têm Dockerfile próprio com
 * contexto de build isolado (base directory = /lps/<slug>). Um symlink pra fora
 * dessa pasta dangleia dentro da imagem e quebra o deploy em produção.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CTA de WhatsApp — híbrido responsivo, link direto (zero JS de terceiro).
 *
 *   Desktop  → pill fixa no canto inferior direito, rótulo visível.
 *   Mobile   → barra sticky full-width no rodapé (o padrão que mede melhor:
 *              +31% de conversão vs. não-sticky no estudo Contentsquare).
 *
 * O rótulo comunica ação: o glifo do WhatsApp sozinho derruba o clique, então
 * o pill nasce com texto. A EXCEÇÃO é o fim da página: perto do rodapé o pill
 * cheio deita por cima do texto (links, crédito, endereço), sobretudo em telas
 * estreitas. Nos últimos ~340px de scroll ele encolhe sozinho pro ícone só —
 * ver `collapseNearFooter`. É padrão do repo; passe `false` só se a LP não tem
 * nada no canto que o pill possa cobrir.
 */
import { useEffect, useState } from 'react'

/** Monta o link click-to-chat. `phone` em formato 55DDDNÚMERO (não-dígitos são ignorados). */
export function waHref(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export type WhatsAppCtaProps = {
  /** 55 + DDD + número. Ex.: '5511963113818'. Ignorado quando `href` é passado. */
  phone?: string
  /**
   * Link pronto, para quem só divulga o encurtado `wa.me/message/<ID>` e não o
   * número (é o caso da Abib). O encurtado NÃO aceita `?text=`, então a
   * `message` não é pré-preenchida — some do link em vez de virar query morta.
   */
  href?: string
  /** Mensagem pré-preenchida. Específica por LP — genérica converte menos. */
  message: string
  /** Rótulo do botão. Padrão do repo: "Falar com especialista da <Produto>". */
  label?: string
  /** Sobrescreve o rótulo só na barra mobile. Raro — o padrão é o mesmo texto nos dois. */
  mobileLabel?: string
  /** Fração da viewport rolada antes de aparecer. 0.9 = logo após o hero. */
  showAfter?: number
  /** Classes de marca (fundo/texto). Default: verde oficial do WhatsApp. */
  className?: string
  /** Raio do pill no desktop. LPs de identidade quadrada passam 'rounded-none'. */
  radiusClassName?: string
  /** Só-ícone no desktop, expandindo no hover. Converte menos — use por exceção. */
  desktopVariant?: 'pill' | 'bubble'
  /**
   * Distância do fim da página (px) em que o pill do desktop encolhe pro ícone
   * só, pra não cobrir o rodapé. Padrão: 340. Passe `false` pra desligar.
   */
  collapseNearFooter?: number | false
}

const BAR_H = '3.5rem' // h-14 — mesmo valor no padding-bottom do body

function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export default function WhatsAppCta({
  phone,
  href: hrefProp,
  message,
  label = 'Falar no WhatsApp',
  mobileLabel,
  showAfter = 0.9,
  className = 'bg-[#25D366] text-white',
  radiusClassName = 'rounded-full',
  desktopVariant = 'pill',
  collapseNearFooter = 340,
}: WhatsAppCtaProps) {
  const [show, setShow] = useState(false)
  // perto do rodapé: o pill do desktop encolhe pro ícone só, pra não deitar
  // por cima do texto do fim da página.
  const [nearFooter, setNearFooter] = useState(false)
  const href = hrefProp ?? waHref(phone ?? '', message)

  // Só entra depois do hero: em cima do CTA principal ele canibaliza o clique.
  useEffect(() => {
    const gap = collapseNearFooter === false ? -1 : collapseNearFooter
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * showAfter)
      if (gap < 0) return setNearFooter(false)
      const restante =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
      setNearFooter(restante < gap)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [showAfter, collapseNearFooter])

  // A barra mobile não pode tapar o fim da página — abre espaço equivalente.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const apply = () => {
      document.body.style.paddingBottom =
        show && mq.matches ? `calc(${BAR_H} + env(safe-area-inset-bottom))` : ''
    }
    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      document.body.style.paddingBottom = ''
    }
  }, [show])

  const shared =
    'z-50 shadow-[0_12px_32px_-8px_rgb(0_0_0/0.45)] transition-all duration-500 ' +
    'motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40'

  // rótulo do desktop: escondido de vez perto do rodapé; senão, expande no
  // hover (bubble) ou fica sempre visível (pill).
  const labelClass = nearFooter
    ? 'hidden'
    : desktopVariant === 'bubble'
      ? 'ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-56 group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-56 group-focus-visible:opacity-100 motion-reduce:transition-none'
      : 'ml-3 whitespace-nowrap text-sm'

  return (
    <>
      {/* Desktop — pill no canto inferior direito */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        aria-hidden={!show}
        tabIndex={show ? undefined : -1}
        className={`group fixed bottom-6 right-6 hidden h-14 items-center px-[1.05rem] font-medium md:flex ${radiusClassName} ${className} ${shared} ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <WhatsAppGlyph className="size-6 shrink-0" />
        <span className={labelClass}>{label}</span>
      </a>

      {/* Mobile — barra sticky no rodapé */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={mobileLabel ?? label}
        aria-hidden={!show}
        tabIndex={show ? undefined : -1}
        // corpo fluido: o rótulo padrão ("Falar com especialista da <Produto>") estoura
        // 375px em fonte fixa — pior caso em mono, e Android de 360px é comum.
        className={`fixed inset-x-0 bottom-0 flex min-h-14 items-center justify-center gap-2.5 px-4 pb-[env(safe-area-inset-bottom)] text-[clamp(0.78rem,3.3vw,0.9375rem)] font-medium md:hidden ${className} ${shared} ${
          show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
      >
        <WhatsAppGlyph className="size-5 shrink-0" />
        {mobileLabel ?? label}
      </a>
    </>
  )
}
