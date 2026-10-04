import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, Moon, Sun, X } from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  ['Home', '/'], ['Services', '/services'], ['Work', '/work'],
  ['About', '/about'], ['Pricing', '/pricing'], ['Contact', '/contact'],
]

const projects = [
  {
    no: '01', name: 'FORGE', type: 'INDUSTRIAL / MANUFACTURING',
    line: 'A heavy-industry manufacturer presented with the seriousness of a precision brand.',
    image: '/assets/cnc.jpg', secondary: '/assets/factory-hall.jpg', tertiary: '/assets/turbine.jpg',
  },
  {
    no: '02', name: 'MONUMENT', type: 'PREMIUM SERVICE BUSINESS',
    line: 'An architecture practice where the website behaves like a gallery.',
    image: '/assets/monument-exterior.jpg', secondary: '/assets/monument-interior.jpg',
  },
  {
    no: '03', name: 'VELOCITY', type: 'PRODUCT / E-COMMERCE',
    line: 'A modern product brand that treats shopping like a product demo.',
    image: '/assets/hero-tech.jpg', secondary: '/assets/abstract-wave.jpg',
  },
]

const services = [
  {
    no: '01', title: 'WEB DESIGN', intro: 'Designed to look unmistakably yours.',
    body: 'Interfaces with a clear point of view, structured around your brand, audience and business goals.',
    tags: ['ART DIRECTION', 'UX STRUCTURE', 'RESPONSIVE DESIGN'],
    list: ['Brand-aligned visual direction', 'UX structure', 'Responsive interface design', 'Interactive prototyping', 'Motion direction', 'Conversion-oriented layouts'],
    art: 'browser',
  },
  {
    no: '02', title: 'WEB DEVELOPMENT', intro: 'Built carefully. Shipped properly.',
    body: 'Fast, responsive and carefully engineered websites built for real-world performance.',
    tags: ['MODERN FRONTEND', 'PERFORMANCE', 'DEPLOYMENT'],
    list: ['Modern frontend development', 'Responsive implementation', 'Performance optimisation', 'Forms and enquiry flows', 'Hosting and deployment', 'Analytics integration', 'Search foundations'],
    art: 'code',
  },
  {
    no: '03', title: 'DIGITAL EXPERIENCES', intro: 'Because memorable beats familiar.',
    body: 'Motion, interaction and storytelling that turn passive browsing into memorable experiences.',
    tags: ['SCROLL STORYTELLING', 'MICRO-INTERACTIONS', 'CAMPAIGN SITES'],
    list: ['Advanced motion', 'Scroll storytelling', 'Micro-interactions', 'Interactive product experiences', 'Landing experiences', 'Campaign websites'],
    art: 'motion',
  },
  {
    no: '04', title: 'GROWTH FOUNDATIONS', intro: 'Visibility begins with infrastructure.',
    body: 'Search-ready structure, analytics, conversion paths and advertising infrastructure built into the experience.',
    tags: ['SEO SETUP', 'ANALYTICS', 'META ADS READY'],
    list: ['On-page SEO setup', 'Technical search foundations', 'Search Console', 'Analytics', 'Conversion tracking', 'Meta Business setup', 'Pixel configuration'],
    art: 'search',
  },
]

const plans = [
  { name: 'STARTER', price: '₹10,000', desc: 'Single-page digital presence.', note: 'For individuals and small businesses that need a strong, focused online presence.', items: ['One-page website', '5–7 content sections', 'Responsive custom design', 'Contact / enquiry form UI', 'WhatsApp integration', 'SEO & Search Console setup', 'SSL, deployment & 1 year hosting', '2 consolidated revision rounds'] },
  { name: 'BUSINESS', price: '₹20,000', desc: 'A complete professional business website.', note: 'For businesses that need an organised, conversion-ready digital presence.', popular: true, items: ['Up to 8–10 pages', 'Custom responsive interface', 'Professional business presentation', 'Contact and enquiry flows', 'Lead workflow preparation', 'Analytics & Search Console', '.in domain for first year', 'SSL, deployment & 1 year hosting'] },
  { name: 'GROWTH', price: '₹25,000', desc: 'Website plus advertising foundations.', note: 'Everything in Business, with the systems needed to start growing.', items: ['Everything in Business', 'Meta Business Portfolio setup', 'Facebook / Instagram connection', 'Ad account configuration', 'Pixel / tracking foundation', 'Initial audience configuration', 'First campaign setup & launch'] },
]

function cx(...v) { return v.filter(Boolean).join(' ') }

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(() => {
    try { return sessionStorage.getItem('outmark-device-intro-v1') !== 'played' } catch { return true }
  })
  const [menu, setMenu] = useState(false)
  const [theme, setTheme] = useState('light')
  const [themeWipe, setThemeWipe] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (!loading) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('intro-running')
    const timer = window.setTimeout(() => {
      try { sessionStorage.setItem('outmark-device-intro-v1', 'played') } catch { /* storage can be unavailable */ }
      setLoading(false)
      document.body.classList.remove('intro-running')
    }, reducedMotion ? 500 : 4350)
    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('intro-running')
    }
  }, [loading])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenu(false)
    const path = location.pathname.slice(1)
    const title = path ? `${path[0].toUpperCase()}${path.slice(1)} — OUTMARK` : 'OUTMARK — Outmark the ordinary.'
    document.title = title
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const toggleTheme = () => {
    if (themeWipe) return
    const next = theme === 'light' ? 'dark' : 'light'
    setThemeWipe(next)
    window.setTimeout(() => setTheme(next), 310)
    window.setTimeout(() => setThemeWipe(null), 820)
  }

  return (
    <>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <AnimatePresence>{themeWipe && <ThemeWipe mode={themeWipe} />}</AnimatePresence>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Header open={menu} setOpen={setMenu} theme={theme} onTheme={toggleTheme} />
      <MobileMenu open={menu} setOpen={setMenu} />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} className="route-stage" initial={{ opacity: 0, clipPath: 'inset(0 0 8% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 0 8%)' }} transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

function Loader() {
  const [number, setNumber] = useState(0)
  useEffect(() => {
    const started = Date.now()
    const id = window.setInterval(() => setNumber(Math.min(100, Math.round((Date.now() - started) / 40))), 40)
    return () => window.clearInterval(id)
  }, [])
  const phase = number < 22 ? 'INITIALISING' : number < 48 ? 'OPENING DISPLAY' : number < 78 ? 'LOADING OUTMARK' : 'ENTERING EXPERIENCE'
  return (
    <motion.div className="loader device-loader" exit={{ opacity: 0, filter: 'blur(8px)' }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}>
      <div className="loader-ambient" aria-hidden="true" />
      <div className="loader-top mono"><span><LogoMark /> OUTMARK / DIGITAL STUDIO</span><span>{phase}</span></div>
      <div className="loader-device-scene">
        <motion.div className="device-zoom" initial={{ scale: .82, y: 58 }} animate={{ scale: [.82, .82, 1, 1, 3.25], y: [58, 58, 0, 0, 0], opacity: [1, 1, 1, 1, 0] }} transition={{ duration: 4.2, times: [0, .16, .4, .72, 1], ease: [0.76, 0, 0.24, 1] }}>
          <LaptopIntro />
          <PhoneIntro />
        </motion.div>
        <motion.div className="loader-instruction mono" initial={{ opacity: 0, y: 12 }} animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }} transition={{ duration: 3.6, times: [0, .22, .72, 1] }}>A DIGITAL EXPERIENCE BY OUTMARK</motion.div>
      </div>
      <div className="loader-bottom mono"><span>OUTMARK THE ORDINARY.</span><div className="loader-line"><motion.i animate={{ width: `${number}%` }} /></div><span>{String(number).padStart(3, '0')}%</span></div>
    </motion.div>
  )
}

function LaptopIntro() {
  return (
    <div className="laptop-device asset-device" aria-hidden="true">
      <motion.img
        className="laptop-render laptop-render-closed"
        src="/assets/devices/laptop-closed.png"
        alt=""
        fetchpriority="high"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 2.4, times: [0, .25, .48, 1], ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="laptop-open-layer"
        initial={{ clipPath: 'inset(71% 0 0 0)', opacity: 0 }}
        animate={{ clipPath: ['inset(71% 0 0 0)', 'inset(71% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)'], opacity: [0, 0, 1, 1] }}
        transition={{ duration: 2.65, times: [0, .2, .69, 1], ease: [0.16, 1, 0.3, 1] }}
      >
        <img className="laptop-render laptop-render-open" src="/assets/devices/laptop-open.png" alt="" fetchpriority="high" />
        <motion.div className="device-live-screen laptop-live-screen" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1] }} transition={{ duration: 2.75, times: [0, .48, .72, 1] }}>
          <MiniSitePreview />
          <motion.div className="asset-screen-wake" initial={{ scaleY: 1 }} animate={{ scaleY: [1, 1, 0, 0] }} transition={{ duration: 2.9, times: [0, .5, .84, 1], ease: [0.76, 0, 0.24, 1] }} />
          <div className="screen-sheen" />
        </motion.div>
      </motion.div>
      <motion.div className="asset-device-shadow" initial={{ opacity: .24, scaleX: .76 }} animate={{ opacity: [.24, .24, .42], scaleX: [.76, .76, 1] }} transition={{ duration: 2.5, times: [0, .28, 1] }} />
    </div>
  )
}

function PhoneIntro() {
  return (
    <motion.div className="phone-device asset-device" aria-hidden="true" initial={{ rotateY: -22, rotateZ: -4, scale: .9 }} animate={{ rotateY: [-22, -22, 0, 0], rotateZ: [-4, -4, 0, 0], scale: [.9, .9, 1, 1] }} transition={{ duration: 2.45, times: [0, .18, .68, 1], ease: [0.16, 1, 0.3, 1] }}>
      <img className="phone-render" src="/assets/devices/phone-front.jpg" alt="" fetchpriority="high" />
      <div className="device-live-screen phone-live-screen">
        <MiniSitePreview compact />
        <motion.div className="asset-screen-wake phone-asset-wake" initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 2.4, times: [0, .4, .8, 1] }}><LogoMark large /></motion.div>
        <div className="screen-sheen" />
      </div>
      <span className="asset-phone-island"><i /></span>
      <motion.div className="asset-device-shadow" initial={{ opacity: .2, scaleX: .7 }} animate={{ opacity: [.2, .2, .38], scaleX: [.7, .7, 1] }} transition={{ duration: 2.3, times: [0, .3, 1] }} />
    </motion.div>
  )
}

function MiniSitePreview({ compact = false }) {
  return (
    <div className={cx('mini-site-preview', compact && 'compact')}>
      <div className="mini-nav"><span><LogoMark /> OUTMARK</span><i /><i /><i /><b>START A PROJECT</b></div>
      <div className="mini-hero">
        <div className="mini-copy"><small>INDEPENDENT DIGITAL STUDIO</small><strong>WE DESIGN,<br />BUILD <em>& GROW</em><br />DIGITAL BRANDS.</strong><p>Strategy, design, development and growth—working as one connected system.</p><span>BUILD WITH OUTMARK</span></div>
        <div className="mini-dashboard"><small>OUTMARK / LIVE SYSTEM</small><div className="mini-bars"><i /><i /><i /><i /><i /></div><strong>+38%</strong><p>DIGITAL MOMENTUM</p></div>
      </div>
    </div>
  )
}

function ThemeWipe({ mode }) {
  return <motion.div className={cx('theme-wipe', mode)} initial={{ clipPath: 'circle(0% at 92% 5%)' }} animate={{ clipPath: 'circle(160% at 92% 5%)' }} exit={{ opacity: 0, transition: { duration: .22 } }} transition={{ duration: .78, ease: [0.76, 0, 0.24, 1] }} />
}

function LogoMark({ large = false }) {
  return <span className={cx('logo-mark', large && 'large')}><i /><i /><i /></span>
}

function Header({ open, setOpen, theme, onTheme }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={cx('site-header', scrolled && 'scrolled')}>
      <Link className="brand" to="/" aria-label="Outmark home"><LogoMark /><span>OUTMARK</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.slice(0, -1).map(([label, href]) => <NavLink key={href} to={href} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <ThemeToggle theme={theme} onToggle={onTheme} />
        <Link to="/contact" className="pill light">Start a project <ArrowUpRight size={15} /></Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
}

function ThemeToggle({ theme, onToggle }) {
  return <button className="theme-toggle" onClick={onToggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><span className="theme-icons"><Sun size={15} /><Moon size={15} /></span><motion.i layout transition={{ type: 'spring', stiffness: 430, damping: 32 }} className={theme} /><b className="mono">{theme === 'light' ? 'LIGHT' : 'DARK'}</b></button>
}

function MobileMenu({ open, setOpen }) {
  return <AnimatePresence>{open && (
    <motion.aside className="mobile-menu" initial={{ clipPath: 'circle(0% at 92% 6%)' }} animate={{ clipPath: 'circle(150% at 92% 6%)' }} exit={{ clipPath: 'circle(0% at 92% 6%)' }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}>
      <div className="menu-label mono">NAVIGATION / 2026</div>
      <nav>{navItems.map(([label, href], i) => <Link key={href} to={href} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{label}<ArrowUpRight /></Link>)}</nav>
      <div className="menu-foot mono">INDEPENDENT DIGITAL STUDIO · INDIA / EVERYWHERE</div>
    </motion.aside>
  )}</AnimatePresence>
}

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const M = motion[as]
  return <M className={className} initial={{ opacity: 0, y: 58, filter: 'blur(12px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .95, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</M>
}

function TextReveal({ children, className = '', as = 'h2', delay = 0 }) {
  const M = motion[as]
  return <M className={cx('text-reveal', className)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }}><motion.span variants={{ hidden: { y: '118%', rotate: 2 }, show: { y: '0%', rotate: 0, transition: { duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] } } }}>{children}</motion.span></M>
}

function SectionIntro({ eyebrow, title, body, compact = false }) {
  return (
    <div className={cx('section-intro', compact && 'compact')}>
      <Reveal className="eyebrow mono"><span />{eyebrow}</Reveal>
      <TextReveal as="h2" className="display" delay={.05}>{title}</TextReveal>
      {body && <Reveal as="p" delay={.1}>{body}</Reveal>}
    </div>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <ProofRail />
      <CapabilityBento />
      <SystemSection />
      <section className="work-home section-pad">
        <SectionIntro eyebrow="SELECTED / CONCEPT WORK" title={<>IDEAS MADE<br />TANGIBLE.</>} body="Three concept worlds that show our range across industrial, premium service and product businesses." />
        <div className="work-grid">{projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}</div>
        <Link className="text-link" to="/work">ALL WORK <ArrowRight /></Link>
      </section>
      <Process />
      <Manifesto />
      <section className="pricing-home section-pad">
        <SectionIntro eyebrow="PRICING" title={<>A CLEAR PLACE<br />TO START.</>} />
        <div className="price-row">{plans.map((p, i) => <PriceMini key={p.name} plan={p} i={i} />)}</div>
        <Link className="text-link" to="/pricing">COMPARE PLANS <ArrowRight /></Link>
      </section>
      <BigCTA />
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 110])
  return (
    <section ref={ref} className="hero hero-v2 grid-bg">
      <motion.div style={{ y }} className="hero-gradient" aria-hidden="true" />
      <div className="hero-grid-v2">
        <div className="hero-copy-v2">
          <motion.div className="hero-kicker mono" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: .7 }}><span />INDEPENDENT DIGITAL STUDIO · INDIA / EVERYWHERE</motion.div>
          <h1 className="display hero-statement">
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 1.48, duration: 1, ease: [0.16, 1, 0.3, 1] }}>WE DESIGN,</motion.span>
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 1.58, duration: 1, ease: [0.16, 1, 0.3, 1] }}>BUILD <em>& GROW</em></motion.span>
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 1.68, duration: 1, ease: [0.16, 1, 0.3, 1] }}>DIGITAL BRANDS.</motion.span>
          </h1>
          <motion.p className="hero-deck" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.85, duration: .75 }}>Outmark turns ambitious businesses into clear, high-converting digital experiences—from positioning and interface design to React development, motion and launch.</motion.p>
          <motion.div className="hero-actions-v2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.96, duration: .75 }}><Link to="/contact" className="pill light">Build with Outmark <ArrowUpRight size={16} /></Link><Link to="/services" className="under-link">See our capabilities <ArrowRight size={16} /></Link></motion.div>
          <motion.div className="hero-scope mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}><span>01 STRATEGY</span><span>02 DESIGN</span><span>03 DEVELOPMENT</span><span>04 GROWTH</span></motion.div>
        </div>
        <HeroInterface />
      </div>
      <div className="hero-bottom mono"><span>AVAILABLE FOR SELECT PROJECTS · Q4 / 2026</span><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
    </section>
  )
}

function HeroInterface() {
  const shell = useRef(null)
  const rx = useMotionValue(-5)
  const ry = useMotionValue(7)
  const rotateX = useSpring(rx, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(ry, { stiffness: 150, damping: 20 })
  const move = (event) => {
    const bounds = shell.current?.getBoundingClientRect()
    if (!bounds) return
    rx.set(((event.clientY - bounds.top) / bounds.height - .5) * -12)
    ry.set(((event.clientX - bounds.left) / bounds.width - .5) * 14)
  }
  return (
    <motion.div className="hero-interface-wrap" initial={{ opacity: 0, scale: .9, y: 45 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1.55, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} onPointerMove={move} onPointerLeave={() => { rx.set(-5); ry.set(7) }} ref={shell}>
      <motion.div className="hero-interface" style={{ rotateX, rotateY }}>
        <div className="interface-glow" />
        <div className="interface-card interface-main">
          <div className="interface-top mono"><span>OUTMARK / LIVE SYSTEM</span><span className="live-dot">● ONLINE</span></div>
          <div className="interface-chart"><i /><i /><i /><i /><i /><i /><b /></div>
          <div className="interface-metric"><small className="mono">DIGITAL MOMENTUM</small><strong className="display">+38%</strong><span>Sharper story. Faster experience. Clearer action.</span></div>
          <div className="interface-stats mono"><span><b>0.6s</b>LCP</span><span><b>98</b>PERF.</span><span><b>100%</b>CUSTOM</span></div>
        </div>
        <motion.div className="interface-card float-card strategy" animate={{ y: [0, -12, 0], rotateZ: [-4, -2, -4] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}><span className="mono">01 / STRATEGY</span><b>POSITION → STORY</b></motion.div>
        <motion.div className="interface-card float-card shipped" animate={{ y: [0, 10, 0], rotateZ: [5, 3, 5] }} transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut' }}><span className="status-ring"><i /></span><div><b>SHIPPED.</b><small className="mono">DESIGN / CODE / GROWTH</small></div></motion.div>
        <div className="interface-orbit orbit-one" /><div className="interface-orbit orbit-two" />
      </motion.div>
      <div className="drag-note mono">MOVE TO TILT / INTERACTIVE</div>
    </motion.div>
  )
}

function ProofRail() {
  const proof = [
    ['4', 'CONNECTED CAPABILITIES'],
    ['1', 'ACCOUNTABLE STUDIO'],
    ['100%', 'CUSTOM-BUILT'],
    ['01—06', 'WEEKS TO FIRST LAUNCH'],
  ]
  return <section className="proof-rail">{proof.map(([value, label], i) => <Reveal className="proof-item" delay={i * .06} key={label}><strong className="display">{value}</strong><span className="mono">{label}</span></Reveal>)}</section>
}

function CapabilityBento() {
  return (
    <section className="capabilities section-pad">
      <div className="capability-intro">
        <SectionIntro eyebrow="WHAT OUTMARK ACTUALLY DOES" title={<>ONE STUDIO.<br /><em>FOUR OUTCOMES.</em></>} body="You don't need disconnected vendors. You need one sharp system where strategy, design, engineering and growth work together." />
      </div>
      <div className="capability-grid">
        {services.map((service, index) => <CapabilityCard key={service.no} service={service} index={index} />)}
      </div>
      <Marquee words="POSITION IT · DESIGN IT · BUILD IT · LAUNCH IT · MEASURE IT · IMPROVE IT ·" />
    </section>
  )
}

function CapabilityCard({ service, index }) {
  const outcomes = ['A brand people recognise', 'A site that feels fast', 'A story people remember', 'A system you can improve']
  return (
    <motion.article className={cx('capability-card', `capability-${index + 1}`)} initial={{ opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} whileHover={{ y: -10 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="capability-head"><span className="mono">{service.no} / {service.title}</span><ArrowUpRight /></div>
      <div className={cx('capability-symbol', `symbol-${service.art}`)} aria-hidden="true"><i /><i /><i /></div>
      <h3 className="display">{service.intro}</h3>
      <p>{service.body}</p>
      <div className="capability-outcome"><small className="mono">BUILT TO CREATE</small><b>{outcomes[index]}</b></div>
      <div className="tag-list mono">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </motion.article>
  )
}

function ModeToggle() {
  const [marked, setMarked] = useState(false)
  return <button className={cx('mode-toggle mono', marked && 'marked')} onClick={() => setMarked(!marked)}><span>{marked ? 'OUTMARKED' : 'DEFAULT'} <i /></span><b>{marked ? 'DEFAULT' : 'OUTMARKED'}</b></button>
}

function CodeWindow() {
  return <div className="code-window glass-card"><div className="window-top mono"><span>● ● ●</span><span>site.tsx</span><span>BUILD / DEPLOY</span></div><pre>{`1  const site = await build({\n2    design: \"distinct\",\n3    performance: 100,\n4    motion: \"purposeful\",\n5    cms: null\n6  });`}</pre><div className="code-stat mono">+38% <small>ATTENTION</small></div></div>
}

function BrowserWindow() {
  return <div className="browser-window glass-card"><div className="browser-bar mono">yourbusiness.com</div><i /><i /><i /><i /><i /></div>
}

function Marquee({ words }) {
  return <div className="marquee mono"><div>{words} {words} {words}</div></div>
}

function ServicePanel({ service, index }) {
  return (
    <Reveal className="service-panel">
      <div className="service-head"><span className="mono">{service.no}</span><h3 className="display">{service.title}</h3><ArrowUpRight /></div>
      <div className="service-body"><div><p>{service.body}</p><div className="tag-list mono">{service.tags.map(t => <span key={t}>{t}</span>)}</div></div><ServiceVisual type={service.art} imageIndex={index} /></div>
    </Reveal>
  )
}

function ServiceVisual({ type }) {
  if (type === 'code') return <div className="visual-card code-demo"><div className="window-top mono">site.tsx <span>BUILD / DEPLOY</span></div><pre>{`const site = await build({\n  design: \"distinct\",\n  performance: 100,\n  motion: \"purposeful\"\n});`}</pre><div className="perf-ring">98<small>/ 100</small></div><div className="metrics mono"><span>LCP<br /><b>0.6s</b></span><span>CLS<br /><b>0.00</b></span><span>TBT<br /><b>0ms</b></span></div></div>
  if (type === 'motion') return <div className="visual-card motion-demo"><img src="/assets/explosion.jpg" alt="Abstract geometric fragments with purple light" /><div className="device-tabs mono"><span>DESKTOP</span><span>TABLET</span><span>MOBILE</span></div><div className="float-orb" /></div>
  if (type === 'search') return <div className="visual-card search-demo"><img src="/assets/wireframe.jpg" alt="Digital wireframe landscape" /><div className="search-result"><span className="mono">web design studio</span><small>outmark.studio › services</small><b>Web Design & Development Studio — Outmark</b><p>Interfaces with a clear point of view — designed, engineered and launched.</p><div className="mono checks">TITLE ✓ &nbsp; META ✓ &nbsp; SCHEMA ✓</div></div></div>
  return <div className="visual-card browser-demo"><div className="browser-bar mono">yourbusiness.com</div><div className="browser-copy"><small>WE MAKE</small><strong>IDEAS<br />VISIBLE.</strong><i /></div></div>
}

function SystemSection() {
  const steps = [
    ['ATTRACT', 'Search, social and campaigns bring the right people in.', 'SEO · SOCIAL · ADS'],
    ['CONVINCE', 'A clear story and premium experience build trust fast.', 'POSITION · UX · MOTION'],
    ['CONVERT', 'Focused pathways turn interest into real enquiries.', 'CTA · FORM · WHATSAPP'],
    ['LEARN', 'Analytics show what is working and what needs attention.', 'EVENTS · FUNNELS · INSIGHT'],
    ['COMPOUND', 'We refine the system so every launch gets smarter.', 'TEST · IMPROVE · SCALE'],
  ]
  return (
    <section className="system system-v2 section-pad">
      <div className="system-copy">
        <SectionIntro eyebrow="THE OUTMARK SYSTEM" title={<>FROM ATTENTION<br />TO <em>ACTION.</em></>} body="A polished website is only the visible layer. Underneath it, we connect the complete journey—from discovery to enquiry to measurable growth." />
        <Link to="/services" className="pill system-link">Explore the full service system <ArrowRight size={16} /></Link>
      </div>
      <div className="system-stage grid-bg">
        <div className="system-beam" />
        <div className="system-core"><LogoMark large /><span className="mono">OUTMARK CORE</span><b className="display">YOUR DIGITAL<br />GROWTH SYSTEM</b></div>
        {steps.map((step, i) => <motion.div className={cx('system-node', `node-${i + 1}`)} key={step[0]} initial={{ opacity: 0, scale: .75 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .1, duration: .65 }} whileHover={{ scale: 1.045, zIndex: 4 }}><span className="mono">0{i + 1}</span><div><h3 className="display">{step[0]}</h3><p>{step[1]}</p><small className="mono">{step[2]}</small></div></motion.div>)}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  return <Reveal className={cx('project-card', `card-${index + 1}`)} delay={index * .08}><Link to="/work"><div className="project-image"><img src={project.image} alt={`${project.name} concept project`} /><span className="mono">CONCEPT {project.no}</span><div className="project-hover">VIEW<br />PROJECT</div></div><div className="project-meta"><span className="mono">{project.type}</span><h3 className="display">{project.name}</h3><ArrowUpRight /></div></Link></Reveal>
}

function Process() {
  const items = [
    ['DISCOVER', 'We understand the business, audience, competition and purpose before touching the interface.'],
    ['DEFINE', 'We establish structure, content hierarchy, visual direction and technical scope.'],
    ['DESIGN', 'We create the experience, interactions and responsive visual system.'],
    ['BUILD', 'We translate the design into a fast, responsive production-ready frontend.'],
    ['REFINE', 'We test, optimise and polish the details that separate good work from forgettable work.'],
    ['LAUNCH', 'We connect the domain, configure deployment and take the website live.'],
  ]
  return <section className="process section-pad"><SectionIntro eyebrow="THE WAY WE WORK" title="HOW WE WORK." body="Clear enough to stay efficient. Flexible enough to make something exceptional." /><div className="process-grid">{items.map((it, i) => <Reveal className="process-item" key={it[0]} delay={(i % 3) * .05}><span className="mono">0{i + 1}</span><h3 className="display">{it[0]}</h3><p>{it[1]}</p></Reveal>)}</div></section>
}

function Manifesto() {
  return <section className="manifesto"><img src="/assets/abstract-ribbon.jpg" alt="Sculptural black ribbon form" /><div className="manifesto-shade" /><div className="manifesto-content"><Reveal as="h2" className="display">THE INTERNET<br />DOESN'T NEED<br />ANOTHER<br /><em>TEMPLATE.</em></Reveal><Reveal as="p">Your website may be the first room a customer ever enters. It should feel like someone cared about every detail.</Reveal><div className="manifesto-points mono"><span>01&nbsp; DISTINCT BY DESIGN.</span><span>02&nbsp; BUILT WITH PURPOSE.</span><span>03&nbsp; OBSESSED WITH FINISH.</span></div></div></section>
}

function PriceMini({ plan, i }) {
  return <Reveal className={cx('price-mini', plan.popular && 'popular')} delay={i * .08}>{plan.popular && <span className="popular-tag mono">MOST POPULAR</span>}<div className="mono">{plan.name}</div><h3 className="display">{plan.price}</h3><p>{plan.desc}</p><Link to="/pricing">DETAILS <ArrowRight /></Link></Reveal>
}

function BigCTA() {
  return <section className="big-cta grid-bg"><div className="eyebrow mono"><span />NEXT STEP</div><h2 className="display">READY TO<br />OUTMARK?</h2><p>Tell us what you're building. We'll tell you how we'd make it impossible to ignore.</p><Link className="pill light" to="/contact">Start a project <ArrowUpRight /></Link><div className="giant-word display">OUTMARK</div></section>
}

function PageHero({ eyebrow, title, body, image, children }) {
  return <section className={cx('page-hero grid-bg', image && 'with-image')}><div className="page-hero-inner"><motion.div className="eyebrow mono" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}><span />{eyebrow}</motion.div><TextReveal as="h1" className="display">{title}</TextReveal>{body && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .7 }}>{body}</motion.p>}{children}</div>{image && <motion.img initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: .72 }} transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }} src={image} alt="" />}</section>
}

function Services() {
  return <><PageHero eyebrow="SERVICES" title="SERVICES." body="Not everything needs more technology. It needs the right technology, designed well." image="/assets/abstract-wave.jpg" /><section className="service-page section-pad">{services.map((s, i) => <ServiceDetail key={s.no} service={s} index={i} />)}</section><BigCTA /></>
}

function ServiceDetail({ service, index }) {
  return <Reveal className="service-detail"><div className="detail-number mono">{service.no}</div><div className="detail-copy"><h2 className="display">{service.title}</h2><h3>{service.intro}</h3><ul>{service.list.map(x => <li key={x}><span>—</span>{x}</li>)}</ul></div><ServiceVisual type={service.art} imageIndex={index} /></Reveal>
}

function Work() {
  return <><PageHero eyebrow="PORTFOLIO" title="WORK." body="Experiments, concepts and digital experiences built to move businesses forward." image="/assets/explosion.jpg"><div className="honesty mono">EVERY PROJECT BELOW IS A CONCEPT PROJECT — HONESTLY LABELLED.</div></PageHero><section className="work-page section-pad">{projects.map((p, i) => <CaseStudy project={p} index={i} key={p.name} />)}</section><BigCTA /></>
}

function CaseStudy({ project, index }) {
  return <Reveal className={cx('case-study', index % 2 && 'reverse')}><div className="case-image"><img src={project.image} alt={`${project.name} primary concept`} /><img src={project.secondary} alt={`${project.name} secondary concept`} />{project.tertiary && <img src={project.tertiary} alt={`${project.name} detail concept`} />}</div><div className="case-copy"><span className="mono">CASE STUDY {project.no} — CONCEPT PROJECT</span><h2 className="display">{project.name}</h2><p>{project.line}</p><div className="case-tags mono"><span>STRATEGY</span><span>DESIGN</span><span>DEVELOPMENT</span></div><button className="under-link">View case study <ArrowRight /></button></div></Reveal>
}

function About() {
  const values = [['CLARITY', 'Complexity should happen behind the interface, not in front of the customer.'], ['CRAFT', "Details aren't decoration. They're what people feel."], ['ORIGINALITY', 'Different for the sake of different is noise. Different with purpose is identity.'], ['RESPONSIBILITY', 'If we build it, we care how it performs after launch.']]
  return <><PageHero eyebrow="ABOUT" title={<>WE STARTED OUTMARK<br />FOR A SIMPLE REASON.<br /><em>TO MAKE BETTER</em><br />DIGITAL WORK.</>} image="/assets/abstract-ribbon.jpg" /><section className="about-story section-pad"><Reveal className="about-lead display">Too many business websites are treated like checkboxes.</Reveal><Reveal className="about-list mono">A LOGO. &nbsp; A FEW SECTIONS. &nbsp; A CONTACT FORM. &nbsp; DONE.</Reveal><Reveal as="p">We think the website deserves more attention than that. Outmark is an independent digital studio focused on stronger ideas, better execution and a higher standard of finish.</Reveal></section><section className="studio section-pad"><div className="studio-image"><img src="/assets/monument-interior.jpg" alt="Quiet minimalist studio interior" /></div><div className="studio-copy"><SectionIntro eyebrow="INDEPENDENT / FOCUSED" title={<>SMALL STUDIO.<br />BIG STANDARD.</>} body="Being focused means fewer layers between the idea and the people building it. Strategy, design and development stay connected throughout the project." /></div></section><section className="values section-pad">{values.map((v, i) => <Reveal className="value" key={v[0]} delay={i * .05}><span className="mono">0{i + 1}</span><h3 className="display">{v[0]}</h3><p>{v[1]}</p></Reveal>)}</section><section className="about-closing"><img src="/assets/explosion.jpg" alt="Abstract fragments in motion" /><h2 className="display">OUTMARK ISN'T ABOUT<br />BEING LOUDER.<br />IT'S ABOUT BEING<br /><em>HARDER TO FORGET.</em></h2><Link className="pill light" to="/contact">Start a project <ArrowUpRight /></Link></section></>
}

function Pricing() {
  return <><PageHero eyebrow="PRICING" title={<>A CLEAR PLACE<br />TO START.</>} body="Defined packages for common projects. Custom scope when the project needs more." /><section className="pricing-page section-pad">{plans.map((p, i) => <PlanCard plan={p} i={i} key={p.name} />)}<Reveal className="custom-plan"><div><span className="mono">CUSTOM / ADVANCED</span><h2 className="display">LET'S TALK.</h2><p>We'll understand the requirement first, define the scope and quote the project accordingly.</p></div><div className="custom-scopes mono">{['E-COMMERCE', 'ADMIN DASHBOARDS', 'CUSTOMER ACCOUNTS', 'BOOKING SYSTEMS', 'PAYMENT GATEWAYS', 'CRM INTEGRATIONS', 'CUSTOM DATABASES', 'APIs'].map(x => <span key={x}>{x}</span>)}</div><Link className="pill light" to="/contact">Discuss a custom project <ArrowUpRight /></Link></Reveal><p className="pricing-note mono">ALL PRICING IS INDICATIVE STARTING SCOPE AND CAN CHANGE WHEN REQUIREMENTS EXCEED THE LISTED DELIVERABLES.</p></section></>
}

function PlanCard({ plan, i }) {
  return <Reveal className={cx('plan-card', plan.popular && 'popular')} delay={i * .06}>{plan.popular && <span className="popular-tag mono">MOST POPULAR</span>}<div className="plan-top"><span className="mono">0{i + 1} / {plan.name}</span><h2 className="display">{plan.price}</h2><p>{plan.note}</p></div><div className="plan-list"><span className="mono">INCLUDES</span>{plan.items.map(x => <div key={x}><Check size={16} />{x}</div>)}</div><Link className={cx('pill', plan.popular && 'light')} to="/contact">Choose {plan.name[0] + plan.name.slice(1).toLowerCase()} <ArrowUpRight /></Link></Reveal>
}

function Contact() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ need: '', budget: '', message: '', name: '', email: '' })
  const [done, setDone] = useState(false)
  const choose = (field, value) => setForm(f => ({ ...f, [field]: value }))
  const nextDisabled = step === 1 ? !form.need : step === 2 ? !form.budget : step === 3 ? !form.message.trim() : !form.name.trim() || !form.email.trim()
  const next = () => step < 4 ? setStep(s => s + 1) : setDone(true)
  const needs = ['Website', 'Redesign', 'Landing Page', 'Custom Development', 'Growth Setup', 'Something Else']
  const budgets = ['₹10k – ₹20k', '₹20k – ₹35k', '₹35k – ₹75k', '₹75k+', 'Not sure yet']
  return <section className="contact-page grid-bg"><div className="contact-left"><div className="eyebrow mono"><span />CONTACT</div><h1 className="display">LET'S MAKE<br />SOMETHING<br /><em>WORTH OPENING.</em></h1><p>Tell us what you're building, what isn't working, or what you want to do differently.</p><div className="availability mono"><i />CURRENTLY TAKING NEW PROJECTS</div></div><div className="contact-form-wrap">{done ? <motion.div className="success" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }}><div className="success-icon"><Check /></div><span className="mono">ENQUIRY CAPTURED</span><h2 className="display">GOOD START,<br />{form.name.toUpperCase()}.</h2><p>This frontend demo has completed the flow. Once the backend is connected, enquiries will route to email and your lead sheet automatically.</p><button className="under-link" onClick={() => { setDone(false); setStep(1); }}>Start another <ArrowRight /></button></motion.div> : <div className="contact-form"><div className="form-head"><span className="mono">STEP 0{step} / 04</span><div>{[1,2,3,4].map(n => <i className={n <= step ? 'active' : ''} key={n} />)}</div></div><AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .3 }}>{step === 1 && <ChoiceStep label="NEED" title="What do you need?" items={needs} value={form.need} onPick={v => choose('need', v)} />}{step === 2 && <ChoiceStep label="INVESTMENT" title="What's the starting range?" items={budgets} value={form.budget} onPick={v => choose('budget', v)} />}{step === 3 && <TextStep form={form} choose={choose} />}{step === 4 && <DetailsStep form={form} choose={choose} />}</motion.div></AnimatePresence><div className="form-actions">{step > 1 && <button className="back" onClick={() => setStep(s => s - 1)}>Back</button>}<button className="continue" disabled={nextDisabled} onClick={next}>{step === 4 ? 'Finish' : 'Continue'} <ArrowRight /></button></div><div className="mono privacy">NO ACCOUNT NEEDED. NO SPAM. JUST A CONVERSATION.</div></div>}</div></section>
}

function ChoiceStep({ label, title, items, value, onPick }) {
  return <><span className="mono step-label">{label}</span><h2>{title}</h2><div className="choice-grid">{items.map(x => <button className={value === x ? 'selected' : ''} onClick={() => onPick(x)} key={x}>{x}<i>{value === x && <Check size={15} />}</i></button>)}</div></>
}

function TextStep({ form, choose }) {
  return <><span className="mono step-label">BRIEF</span><h2>Tell us the useful bit.</h2><textarea value={form.message} onChange={e => choose('message', e.target.value)} placeholder="What are you building? What needs to change? What does success look like?" /><span className="char-count mono">{form.message.length} / 600</span></>
}

function DetailsStep({ form, choose }) {
  return <><span className="mono step-label">DETAILS</span><h2>Where should we reply?</h2><label>Your name<input value={form.name} onChange={e => choose('name', e.target.value)} placeholder="Name" /></label><label>Email address<input type="email" value={form.email} onChange={e => choose('email', e.target.value)} placeholder="you@company.com" /></label></>
}

function Footer() {
  const location = useLocation()
  if (location.pathname === '/contact') return null
  return <footer><div className="footer-brand"><div className="brand"><LogoMark /><span>OUTMARK</span></div><p>Outmark the ordinary.<br />An independent digital studio.<br />We start with the web — and build for much more.</p></div><div><span className="mono">MENU</span>{navItems.map(([l, h]) => <Link to={h} key={h}>{l}</Link>)}</div><div><span className="mono">SERVICES</span>{services.map(s => <Link to="/services" key={s.no}>{s.title}</Link>)}</div><div className="footer-bottom mono"><span>© 2026 OUTMARK. ALL RIGHTS RESERVED.</span><span>INDIA / EVERYWHERE</span><span>BUILT WITH INTENTION</span></div></footer>
}

export default App
