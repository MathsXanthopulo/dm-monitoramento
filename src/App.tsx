import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ArrowRight, MapPin, Menu, Phone, Plus, X } from 'lucide-react'
import WhatsAppCta from './shared/WhatsAppCta'
import Reveal from './Reveal'
import SeamlessVideo from './SeamlessVideo'
import Lente from './Lente'
import Trilho from './Trilho'
import Placa from './Placa'
import Arame from './Arame'
import ProgressiveBlur from './ProgressiveBlur'
import { media } from './media'
import { useVideoOk } from './hooks'
import {
  COPY,
  FAQ,
  PASSOS,
  PILARES,
  INSTAGRAM,
  INSTAGRAM_USER,
  LOCAL,
  MENSAGEM_ORCAMENTO,
  PRODUTO,
  TELEFONE,
  TELEFONE_TEL,
  WHATSAPP_PHONE,
  waLink,
} from './dados'

/* ───────── infraestrutura ───────── */

let lenis: Lenis | null = null

function irPara(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -88 })
  else el.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', hash)
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Led() {
  return <span className="led" aria-hidden="true" />
}

const NAV = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Por que a DM', href: '#por-que' },
  { label: 'Orçamento', href: '#orcamento' },
  { label: 'História', href: '#historia' },
  { label: 'Perguntas', href: '#perguntas' },
  { label: 'Contato', href: '#contato' },
]

function Cta({ children, className = '', href = waLink() }: { children: ReactNode; className?: string; href?: string }) {
  return (
    <a className={`btn ${className}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

/* ───────── nav ───────── */

function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(scrollY > 24)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => {
      removeEventListener('keydown', esc)
      document.documentElement.style.overflow = ''
    }
  }, [open])
  const go = (h: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // espera o scroll destravar antes de rolar
    setTimeout(() => irPara(h), 30)
  }
  return (
    <header className={`nav ${solid || open ? 'solid' : ''}`}>
      <div className="nav-in">
        <a className="marca" href="#topo" onClick={go('#topo')} aria-label={`${PRODUTO} — início`}>
          <img src={media('logo-sm.webp')} alt="" width={44} height={44} />
          <span>{PRODUTO}</span>
        </a>
        <nav className="nav-links" aria-label="Seções">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={go(n.href)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav-dir">
          <Cta className="btn-nav">Orçamento</Cta>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="gaveta"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} strokeWidth={1.6} /> : <Menu size={24} strokeWidth={1.6} />}
          </button>
        </div>
      </div>
      <div id="gaveta" className={`gaveta ${open ? 'open' : ''}`} hidden={!open}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={go(n.href)}>
            {n.label}
          </a>
        ))}
        <Cta className="btn-grande">Pedir orçamento no WhatsApp</Cta>
      </div>
    </header>
  )
}

/* ───────── 1 · hero ───────── */

function Hero() {
  const video = useVideoOk()
  return (
    <section className="hero" id="topo">
      <div className="hero-midia" aria-hidden="true">
        {video ? (
          <SeamlessVideo src={media('hero.mp4')} poster={media('hero-poster.webp')} className="foco" />
        ) : (
          <img
            className="foco"
            src={media('hero-poster.webp')}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        )}
        <span className="hero-veu" />
        <ProgressiveBlur position="bottom" height={220} />
      </div>
      <div className="wrap hero-in">
        <h1>
          <span className="l1">A gente vigia.</span>
          <span className="l2">
            Você descansa
            <Led />
            <span className="sr-only">.</span>
          </span>
        </h1>
        <p className="hero-sub">{COPY.heroSub}</p>
        <div className="hero-acoes">
          <Cta className="btn-grande">
            Pedir orçamento no WhatsApp <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
          </Cta>
          <a
            className="link-fio"
            href="#servicos"
            onClick={(e) => {
              e.preventDefault()
              irPara('#servicos')
            }}
          >
            Ver o que a DM instala
          </a>
        </div>
        <ul className="hero-fatos" role="list">
          {COPY.heroFatos.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────── 2 · serviços ───────── */

function Servicos() {
  return (
    <section className="sec aco" id="servicos">
      <div className="wrap">
        <Reveal>
          <Arame />
          <h2>
            {COPY.servicosTitulo}<span className="led" aria-hidden="true" />
            <span className="sr-only">.</span>
          </h2>
          <p className="lead">{COPY.servicosLead}</p>
        </Reveal>
        <Reveal delay={80}>
          <Lente />
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── 3 · por que a DM ───────── */

function PorQue() {
  const video = useVideoOk()
  return (
    <section className="sec grafite" id="por-que">
      <div className="wrap porque">
        <Reveal className="porque-midia">
          <div className="retrato" aria-hidden="true">
            {video ? (
              <SeamlessVideo src={media('chuva.mp4')} poster={media('chuva-poster.webp')} fade={1} />
            ) : (
              <img src={media('chuva-poster.webp')} alt="" loading="lazy" decoding="async" />
            )}
          </div>
        </Reveal>
        <div className="porque-txt">
          <Reveal>
            <Arame />
            <h2>
              {COPY.porqueTitulo}<span className="led" aria-hidden="true" />
              <span className="sr-only">.</span>
            </h2>
            <p className="lead">{COPY.porqueLead}</p>
          </Reveal>
          <ul className="pilares" role="list">
            {PILARES.map((p, k) => (
              <li key={p.t}>
                <Reveal delay={k * 70}>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────── 4 · como pedir orçamento ───────── */

function Orcamento() {
  return (
    <section className="sec aco" id="orcamento">
      <div className="wrap">
        <Reveal>
          <Arame />
          <h2>
            {COPY.orcamentoTitulo}<span className="led" aria-hidden="true" />
            <span className="sr-only">.</span>
          </h2>
          <p className="lead">{COPY.orcamentoLead}</p>
        </Reveal>
        <Trilho passos={PASSOS}>
          <div className="trilho-cta">
            <Cta className="btn-grande btn-escuro">
              Começar pelo WhatsApp <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
            </Cta>
          </div>
        </Trilho>
      </div>
    </section>
  )
}

/* ───────── 5 · história do casal ───────── */

function Historia() {
  return (
    <section className="sec grafite" id="historia">
      <div className="wrap historia">
        <div className="historia-txt">
          <Reveal>
            <Arame />
            <h2>
              {COPY.historiaTitulo}<span className="led" aria-hidden="true" />
              <span className="sr-only">.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="corpo-grande">{COPY.historiaTexto}</p>
            <p className="assina">{COPY.historiaAssina}</p>
          </Reveal>
        </div>
        <Reveal delay={120} className="historia-midia">
          <figure>
            <img
              src={media('janela.webp')}
              alt="Janela de madeira acesa à noite, com luz quente vinda de dentro da casa"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── 6 · perguntas (FAQ) ───────── */

function Faq() {
  return (
    <section className="sec aco" id="perguntas">
      <div className="wrap faq">
        <Reveal>
          <Arame />
          <h2>
            {COPY.faqTitulo}
            <span className="led" aria-hidden="true" />
            <span className="sr-only">.</span>
          </h2>
          <p className="lead">{COPY.faqLead}</p>
        </Reveal>
        <div className="faq-lista">
          {FAQ.map((f, k) => (
            <Reveal key={f.q} delay={k * 40}>
              <details className="faq-item" open={k === 0}>
                <summary>
                  <span>{f.q}</span>
                  <Plus aria-hidden="true" size={22} strokeWidth={1.6} />
                </summary>
                <p>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 7 · contato ───────── */

function Contato() {
  const temLocal = Boolean(LOCAL.sede || LOCAL.regiao || LOCAL.endereco)
  return (
    <section className="sec chumbo" id="contato">
      <div className="wrap contato">
        <div className="contato-txt">
          <Reveal>
            <Arame />
            <h2>
              {COPY.contatoTitulo.replace('?', '')}<span className="led" aria-hidden="true" />
              <span className="sr-only">?</span>
            </h2>
            <p className="lead">{COPY.contatoLead}</p>
            <div className="hero-acoes">
              <Cta className="btn-grande">
                Pedir orçamento no WhatsApp <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
              </Cta>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ul className="canais" role="list">
              <li>
                <a href={TELEFONE_TEL}>
                  <Phone size={20} strokeWidth={1.6} aria-hidden="true" />
                  <span>{TELEFONE}</span>
                </a>
              </li>
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                  <IconInstagram />
                  <span>{INSTAGRAM_USER}</span>
                </a>
              </li>
              {temLocal && (
                <li className="local">
                  <MapPin size={20} strokeWidth={1.6} aria-hidden="true" />
                  <span>
                    {LOCAL.sede && <b>Sede em {LOCAL.sede}</b>}
                    {LOCAL.regiao && <em>Atendemos {LOCAL.regiao}</em>}
                    {LOCAL.endereco && <em>{LOCAL.endereco}</em>}
                    {LOCAL.mapa && (
                      <a href={LOCAL.mapa} target="_blank" rel="noreferrer">
                        Ver no mapa
                      </a>
                    )}
                  </span>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={140} className="contato-placa">
          <Placa />
        </Reveal>
      </div>
    </section>
  )
}

function Rodape() {
  return (
    <footer className="rodape">
      <div className="wrap rodape-in">
        <p className="rodape-marca">
          <img src={media('logo-sm.webp')} alt="" width={40} height={40} />
          <span>
            © {new Date().getFullYear()} {PRODUTO}
            <small>{COPY.rodapeDescricao}</small>
          </span>
        </p>
        <ul role="list" className="rodape-links">
          <li>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href={TELEFONE_TEL}>{TELEFONE}</a>
          </li>
          <li>
            Feito por&nbsp;
            <a href="https://www.coldcodelabs.com/" target="_blank" rel="noreferrer">
              Cold Code Labs
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

/* ───────── app ───────── */

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ autoRaf: true, lerp: 0.11 })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Servicos />
        <PorQue />
        <Orcamento />
        <Historia />
        <Faq />
        <Contato />
      </main>
      <Rodape />
      <WhatsAppCta
        phone={WHATSAPP_PHONE}
        message={MENSAGEM_ORCAMENTO}
        label={`Falar com especialista da ${PRODUTO}`}
        className="bg-[#c9a24b] text-[#14171a] text-[0.875rem]!"
        radiusClassName="rounded-md"
      />
    </>
  )
}
