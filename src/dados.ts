/**
 * Dados da DM Monitoramento — ÚNICO lugar para editar contato e conteúdo.
 * Só entra aqui o que é fato público (Instagram @dm.monitoramento e a logo).
 */

/** 55 + DDD + número. Número da logo, confirmado pelo Mateus como o contato da empresa. */
export const WHATSAPP_PHONE = '5511930127688'
export const TELEFONE = '(11) 93012-7688'
export const TELEFONE_TEL = 'tel:+5511930127688'
export const INSTAGRAM = 'https://www.instagram.com/dm.monitoramento/'
export const INSTAGRAM_USER = '@dm.monitoramento'

export const PRODUTO = 'DM Monitoramento'
export const MENSAGEM_ORCAMENTO =
  'Olá! Vim pelo site da DM Monitoramento e gostaria de pedir um orçamento.'

export const waLink = (msg = MENSAGEM_ORCAMENTO) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`

/**
 * Localização. Confirmado: sede em Mogi das Cruzes (SP); atende a Grande São
 * Paulo e o interior de SP. Rua, número e bairro NÃO são conhecidos: não exibir
 * endereço, mapa nem coordenadas. Cada campo só aparece quando preenchido.
 */
export const LOCAL: { sede: string | null; regiao: string | null; endereco: string | null; mapa: string | null } = {
  sede: 'Mogi das Cruzes, SP',
  regiao: 'Grande São Paulo e interior de SP',
  endereco: null,
  mapa: null,
}

export type Servico = { id: string; nome: string; desc: string; img: string; alt: string }

/** Os 6 serviços da bio do Instagram, na ordem em que a empresa os lista. */
export const SERVICOS: Servico[] = [
  {
    id: 'cftv',
    nome: 'Câmeras de segurança',
    desc: 'CFTV de alta definição para você ver a entrada, o quintal e a garagem sem precisar estar lá.',
    img: 'cftv.webp',
    alt: 'Duas câmeras de segurança fixadas em uma parede de concreto escuro',
  },
  {
    id: 'cerca',
    nome: 'Cerca elétrica',
    desc: 'Fio esticado no alto do muro, para desencorajar quem pensa em pular.',
    img: 'cerca.webp',
    alt: 'Arame galvanizado esticado em um tensor parafusado',
  },
  {
    id: 'portoes',
    nome: 'Portões automáticos',
    desc: 'O portão abre e fecha pelo controle, sem você descer do carro.',
    img: 'portao.webp',
    alt: 'Portão de correr metálico com interfone ao lado',
  },
  {
    id: 'antenas',
    nome: 'Antenas',
    desc: 'Instalação de antenas para a casa, o condomínio e a empresa.',
    img: 'antena.webp',
    alt: 'Antena de metal no alto de um telhado, em preto e branco',
  },
  {
    id: 'acesso',
    nome: 'Controle de acesso',
    desc: 'Você decide quem entra, por onde e quando, em casa, no condomínio ou na empresa.',
    img: 'acesso.webp',
    alt: 'Interfone com teclado numérico ao lado de um portão',
  },
  {
    id: '24h',
    nome: 'Monitoramento 24h',
    desc: 'Alguém de olho em tempo real, o dia inteiro e a noite inteira, para você poder dormir.',
    img: 'noite.webp',
    alt: 'Casa à noite com uma janela acesa',
  },
]

/* ───────── texto da página (uma fonte só: a LP e o snapshot HTML leem daqui) ───────── */

export const COPY = {
  heroSub:
    'Câmeras, cerca elétrica, portões automáticos e monitoramento 24h para a sua casa, o seu condomínio e o seu negócio, de Mogi das Cruzes para a Grande São Paulo e o interior de SP. O orçamento sai pelo WhatsApp.',
  heroFatos: ['Monitoramento 24h', 'Instalação profissional', 'Orçamento pelo WhatsApp'],
  servicosTitulo: 'O que a DM instala',
  servicosLead: 'Seis serviços para a casa, o condomínio e a empresa ficarem de olho aberto.',
  porqueTitulo: 'Quem instala é gente que cuida',
  porqueLead:
    'A DM nasceu para proteger o que é mais importante: a sua família, o seu lar e o seu patrimônio.',
  orcamentoTitulo: 'Pedir orçamento é uma mensagem',
  orcamentoLead: 'Três passos, e o primeiro cabe no seu celular.',
  historiaTitulo: '30 anos de parceria, amor e dedicação',
  historiaTexto:
    'O casal que toca a DM vive uma parceria de 30 anos, feita de amor e dedicação. Dessa vida em família nasceu a vontade de proteger o que é mais importante: a família, o lar e o patrimônio de cada cliente.',
  historiaAssina: 'Confie na DM.',
  faqTitulo: 'Perguntas que a DM mais ouve',
  faqLead: 'Respostas curtas. O resto a gente combina pelo WhatsApp.',
  contatoTitulo: 'Vamos cuidar do que é seu?',
  contatoLead:
    'Chame a DM no WhatsApp e diga o que você precisa proteger. É assim que todo orçamento começa.',
  rodapeDescricao: 'Segurança eletrônica em Mogi das Cruzes e região.',
}

export const PILARES = [
  { t: 'Confiança', d: 'A gente trata a sua casa do jeito que trataria a nossa.' },
  { t: 'Responsabilidade', d: 'Instalação profissional: feita direito, do primeiro cabo ao último parafuso.' },
  { t: 'Cuidado com as pessoas', d: 'Por trás de cada câmera tem uma família que a gente quer ver em paz.' },
  { t: 'Tempo real', d: 'Monitoramento 24h, em tempo real, para o que importa não esperar.' },
]

export const PASSOS = [
  { n: '1', titulo: 'Chame no WhatsApp', texto: 'Conte o que você quer proteger: casa, condomínio ou empresa.' },
  { n: '2', titulo: 'Receba o orçamento', texto: 'A DM monta o orçamento para o que você pediu.' },
  { n: '3', titulo: 'Instalação profissional', texto: 'Com tudo combinado, a equipe da DM instala e deixa funcionando.' },
]

/**
 * FAQ: só fato confirmado (bio e posts do Instagram + briefing do Mateus).
 * Sem preço, prazo, marca de equipamento nem tempo de mercado.
 */
export const FAQ = [
  {
    q: 'A DM atende a minha região?',
    a: 'A DM Monitoramento tem sede em Mogi das Cruzes, SP, e atende a Grande São Paulo e o interior de São Paulo. Para saber se o seu endereço está na área, mande uma mensagem no WhatsApp.',
  },
  {
    q: 'Quais serviços a DM Monitoramento oferece?',
    a: 'Câmeras de segurança (CFTV), cerca elétrica, portões automáticos, antenas, controle de acesso e monitoramento 24h, para casas, condomínios e pequenas empresas.',
  },
  {
    q: 'Como peço um orçamento?',
    a: 'Pelo WhatsApp, no (11) 93012-7688. Conte o que você quer proteger e a DM monta o orçamento para o que você pediu.',
  },
  {
    q: 'A DM faz a instalação?',
    a: 'Sim. A instalação é profissional, feita pela equipe da DM.',
  },
  {
    q: 'O monitoramento funciona o dia todo?',
    a: 'A DM oferece monitoramento 24h, em tempo real.',
  },
  {
    q: 'Quem está por trás da DM?',
    a: 'Uma empresa de família. O casal que toca a DM vive uma parceria de 30 anos, feita de amor e dedicação.',
  },
]
