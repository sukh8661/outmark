import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, Moon, Sun, X, Plus, Code2, Layers, Sparkles, Search, Download, Copy, ArrowLeft, ChevronUp, CheckCircle2 } from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'

const navItems = [
  ['Home', '/'], ['Services', '/services'], ['Work', '/work'],
  ['About', '/about'], ['Pricing', '/pricing'], ['Contact', '/contact'],
]

const projects = [
  {
    no: '01', name: 'FORGE', slug: 'forge', category: 'Industrial', type: 'INDUSTRIAL / MANUFACTURING',
    line: 'A heavy-industry manufacturer presented with the seriousness of a precision brand.',
    image: '/assets/cnc.jpg', secondary: '/assets/factory-hall.jpg', tertiary: '/assets/turbine.jpg',
  },
  {
    no: '02', name: 'MONUMENT', slug: 'monument', category: 'Architecture', type: 'PREMIUM SERVICE BUSINESS',
    line: 'An architecture practice where the website behaves like a gallery.',
    image: '/assets/monument-exterior.jpg', secondary: '/assets/monument-interior.jpg',
  },
  {
    no: '03', name: 'VELOCITY', slug: 'velocity', category: 'Product', type: 'PRODUCT / E-COMMERCE',
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
  { name: 'STARTER', price: '₹10,000', desc: 'Single-page digital presence.', note: 'For individuals and small businesses that need a strong, focused online presence.', items: ['One-page website', '5–7 content sections', 'Responsive custom design', 'Contact and enquiry flow', 'WhatsApp integration', 'SEO & Search Console setup', 'SSL, deployment & 1 year hosting', '2 consolidated revision rounds'] },
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
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('outmark-theme') === 'dark' ? 'dark' : 'light' } catch { return 'light' } })
  const reducedMotion = useReducedMotion()
  const [themeWipe, setThemeWipe] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 })

  const finishIntro = () => {
    try { sessionStorage.setItem('outmark-device-intro-v1', 'played') } catch { /* Storage is optional. */ }
    setLoading(false)
    document.body.classList.remove('intro-running')
  }

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
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
    setMenu(false)
    const path = location.pathname.slice(1).replaceAll('/', ' · ')
    const title = path ? `${path[0].toUpperCase()}${path.slice(1)} — OUTMARK` : 'OUTMARK — Outmark the ordinary.'
    document.title = title
    const descriptions = { '/': 'Outmark designs and builds custom websites, digital experiences and growth foundations for ambitious businesses.', '/services': 'Explore web design, React development, motion and search foundations from Outmark.', '/work': 'Explore Outmark concept projects across manufacturing, architecture and product brands.', '/pricing': 'Compare Outmark website packages starting at ₹10,000 and define your project scope.', '/contact': 'Create a project brief for your next website with Outmark.' }
    document.querySelector('meta[name="description"]')?.setAttribute('content', descriptions[location.pathname] || descriptions['/work'])
    const timer = window.setTimeout(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 800)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f7fb' : '#0c0c12')
    try { localStorage.setItem('outmark-theme', theme) } catch { /* Storage is optional. */ }
  }, [theme])

  const toggleTheme = () => {
    if (themeWipe) return
    const next = theme === 'light' ? 'dark' : 'light'
    if (reducedMotion) { setTheme(next); return }
    setThemeWipe(next)
    window.setTimeout(() => setTheme(next), 310)
    window.setTimeout(() => setThemeWipe(null), 820)
  }

  return (
    <>
      <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <AnimatePresence>{themeWipe && <ThemeWipe mode={themeWipe} />}</AnimatePresence>
      <AnimatePresence>{loading && <Loader onSkip={finishIntro} />}</AnimatePresence>
      <Header open={menu} setOpen={setMenu} theme={theme} onTheme={toggleTheme} />
      <MobileMenu open={menu} setOpen={setMenu} />
      <AnimatePresence mode="wait">
        <motion.main id="main-content" tabIndex={-1} key={location.pathname} className="route-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .25 }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
      </MotionConfig>
    </>
  )
}

function Loader({ onSkip }) {
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
      <button className="intro-skip" onClick={onSkip}>Skip intro <ArrowRight size={14} /></button>
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
        <div className="mini-dashboard"><small>OUTMARK / THE BUILD</small><div className="mini-bars"><i /><i /><i /><i /><i /></div><strong>IDEA TO LIVE.</strong><p>DESIGN / DEVELOP / LAUNCH</p></div>
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
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
}

function ThemeToggle({ theme, onToggle }) {
  return <button className="theme-toggle" onClick={onToggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><span className="theme-icons"><Sun size={15} /><Moon size={15} /></span><motion.i layout transition={{ type: 'spring', stiffness: 430, damping: 32 }} className={theme} /><b className="mono">{theme === 'light' ? 'LIGHT' : 'DARK'}</b></button>
}

function MobileMenu({ open, setOpen }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const prior = document.activeElement
    document.body.classList.add('menu-running')
    ref.current?.querySelector('a')?.focus()
    const keydown = event => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab') return
      const links = [...ref.current.querySelectorAll('a, button')]
      const first = links[0], last = links[links.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', keydown)
    return () => { document.body.classList.remove('menu-running'); window.removeEventListener('keydown', keydown); prior?.focus() }
  }, [open, setOpen])
  return <AnimatePresence>{open && (
    <motion.aside ref={ref} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" className="mobile-menu" initial={{ clipPath: 'circle(0% at 92% 6%)' }} animate={{ clipPath: 'circle(150% at 92% 6%)' }} exit={{ clipPath: 'circle(0% at 92% 6%)' }} transition={{ duration: .45, ease: [0.76, 0, 0.24, 1] }}>
      <button className="menu-dismiss" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
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
      <FAQ />
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
          <motion.div className="hero-kicker mono" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .7 }}><span />INDEPENDENT DIGITAL STUDIO · INDIA / EVERYWHERE</motion.div>
          <h1 className="display hero-statement">
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .18, duration: .85, ease: [0.16, 1, 0.3, 1] }}>WE DESIGN,</motion.span>
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .28, duration: .85, ease: [0.16, 1, 0.3, 1] }}>BUILD <em>& GROW</em></motion.span>
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .38, duration: .85, ease: [0.16, 1, 0.3, 1] }}>DIGITAL BRANDS.</motion.span>
          </h1>
          <motion.p className="hero-deck" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .75 }}>Custom websites for businesses ready for their next chapter. We connect thoughtful design, React development and growth foundations—so your customers know what you do and what to do next.</motion.p>
          <motion.div className="hero-actions-v2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6, duration: .75 }}><Link to="/contact" className="pill light">Build with Outmark <ArrowUpRight size={16} /></Link><Link to="/services" className="under-link">See our capabilities <ArrowRight size={16} /></Link></motion.div>
          <motion.div className="hero-scope mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }}><span>01 STRATEGY</span><span>02 DESIGN</span><span>03 DEVELOPMENT</span><span>04 GROWTH</span></motion.div>
        </div>
        <HeroInterface />
      </div>
      <div className="hero-bottom mono"><span>DESIGNED IN INDIA · BUILT FOR EVERYWHERE</span><a href="#capabilities">EXPLORE THE STUDIO <ArrowDown size={13} /></a></div>
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
    if (event.pointerType !== 'mouse') return
    const bounds = shell.current?.getBoundingClientRect()
    if (!bounds) return
    rx.set(((event.clientY - bounds.top) / bounds.height - .5) * -12)
    ry.set(((event.clientX - bounds.left) / bounds.width - .5) * 14)
  }
  return (
    <motion.div className="hero-interface-wrap" initial={{ opacity: 0, scale: .9, y: 45 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .3, duration: 1, ease: [0.16, 1, 0.3, 1] }} onPointerMove={move} onPointerLeave={() => { rx.set(-5); ry.set(7) }} ref={shell}>
      <motion.div className="hero-interface" style={{ rotateX, rotateY }}>
        <div className="interface-glow" />
        <div className="interface-card interface-main">
          <div className="interface-top mono"><span>OUTMARK / THE BUILD</span><span className="live-dot">DESIGN → LAUNCH</span></div>
          <div className="interface-chart"><i /><i /><i /><i /><i /><i /><b /></div>
          <div className="interface-metric"><small className="mono">ONE CONNECTED PROCESS</small><strong className="display">IDEA<br /><em>TO LIVE.</em></strong><span>A clear story. A considered interface. A website built to work.</span></div>
          <div className="interface-stats mono"><span><b>Design</b>WITH INTENT</span><span><b>Develop</b>WITH REACT</span><span><b>Launch</b>WITH CARE</span></div>
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
    ['MERN', 'READY FOR WHAT IS NEXT'],
  ]
  return <section className="proof-rail">{proof.map(([value, label], i) => <Reveal className="proof-item" delay={i * .06} key={label}><strong className="display">{value}</strong><span className="mono">{label}</span></Reveal>)}</section>
}

function CapabilityBento() {
  return (
    <section id="capabilities" className="capabilities section-pad">
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
      <div className="capability-icon" aria-hidden="true">{index === 0 ? <Layers /> : index === 1 ? <Code2 /> : index === 2 ? <Sparkles /> : <Search />}</div>
      <h3 className="display">{service.intro}</h3>
      <p>{service.body}</p>
      <div className="capability-outcome"><small className="mono">BUILT TO CREATE</small><b>{outcomes[index]}</b></div>
      <div className="tag-list mono">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <Link className="capability-link under-link" to={`/services#service-${service.no}`}>Explore {service.title.toLowerCase()} <ArrowRight size={17} /></Link>
    </motion.article>
  )
}

function Marquee({ words }) {
  return <div className="marquee mono"><div>{words} {words} {words}</div></div>
}

function ServiceVisual({ type }) {
  if (type === 'code') return <div className="visual-card code-demo"><div className="window-top mono">site.jsx <span>BUILD / DEPLOY</span></div><pre>{`const experience = build({\n  frontend: \"React + JavaScript\",\n  responsive: true,\n  motion: \"purposeful\"\n});`}</pre><div className="perf-ring"><Code2 size={34} /><small>JS</small></div><div className="metrics mono"><span>PLAN<br /><b>Clear</b></span><span>BUILD<br /><b>React</b></span><span>SHIP<br /><b>Ready</b></span></div></div>
  if (type === 'motion') return <div className="visual-card motion-demo"><img loading="lazy" decoding="async" src="/assets/explosion.jpg" alt="Abstract geometric fragments with purple light" /><div className="device-tabs mono"><span>DESKTOP</span><span>TABLET</span><span>MOBILE</span></div><div className="float-orb" /></div>
  if (type === 'search') return <div className="visual-card search-demo"><img loading="lazy" decoding="async" src="/assets/wireframe.jpg" alt="Digital wireframe landscape" /><div className="search-result"><span className="mono">web design studio</span><small>outmark.studio › services</small><b>Web Design & Development Studio — Outmark</b><p>Interfaces with a clear point of view — designed, engineered and launched.</p><div className="mono checks">TITLE ✓ &nbsp; META ✓ &nbsp; STRUCTURE ✓</div></div></div>
  return <div className="visual-card browser-demo"><div className="browser-bar mono">yourbusiness.com</div><div className="browser-copy"><small>WE MAKE</small><strong>IDEAS<br />VISIBLE.</strong><i /></div></div>
}

function SystemSection() {
  const [active, setActive] = useState(0)
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
      <div className="journey-panel">
        <div className="journey-heading mono"><span>YOUR CUSTOMER'S JOURNEY</span><span>0{active + 1} / 05</span></div>
        <div className="journey-tabs" role="tablist" aria-label="Customer journey stages" onKeyDown={event => {
          if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
          event.preventDefault()
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (active + (event.key === 'ArrowRight' ? 1 : -1) + 5) % 5
          setActive(next); event.currentTarget.querySelectorAll('button')[next].focus()
        }}>
          {steps.map((step, i) => <button role="tab" id={`journey-tab-${i}`} aria-selected={active === i} aria-controls="journey-detail" tabIndex={active === i ? 0 : -1} className={cx(active === i && 'active')} key={step[0]} onClick={() => setActive(i)}><span>0{i + 1}</span>{step[0]}</button>)}
        </div>
        <div id="journey-detail" role="tabpanel" aria-labelledby={`journey-tab-${active}`} className="journey-detail">
          <div className="journey-art" aria-hidden="true"><img src={active % 2 ? '/assets/abstract-wave.jpg' : '/assets/wireframe.jpg'} loading="lazy" alt="" /><span className="journey-number display">0{active + 1}</span></div>
          <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}><span className="mono">{steps[active][2]}</span><h3 className="display">{steps[active][0]}.</h3><p>{steps[active][1]}</p></motion.div></AnimatePresence>
        </div>
        <div className="journey-foot"><CheckCircle2 size={18} /><span>Built around the way your customers make decisions.</span></div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  return <Reveal className={cx('project-card', `card-${index + 1}`)} delay={index * .08}><Link to={`/work/${project.slug}`} aria-label={`Explore ${project.name} concept project`}><div className="project-image"><img src={project.image} loading="lazy" decoding="async" alt={`${project.name} — ${project.category.toLowerCase()} concept direction`} /><span className="mono">CONCEPT {project.no}</span><div className="project-hover">EXPLORE<br />PROJECT</div></div><div className="project-meta"><span className="mono">{project.type}</span><h3 className="display">{project.name}</h3><ArrowUpRight /></div><p className="project-description">{project.line}</p></Link></Reveal>
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
  return <Reveal className={cx('price-mini', plan.popular && 'popular')} delay={i * .08}>{plan.popular && <span className="popular-tag mono">RECOMMENDED</span>}<div className="mono">{plan.name}</div><h3 className="display">{plan.price}</h3><p>{plan.desc}</p><Link to="/pricing">DETAILS <ArrowRight /></Link></Reveal>
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
  return <div id={`service-${service.no}`}><Reveal className="service-detail"><div className="detail-number mono">{service.no}</div><div className="detail-copy"><h2 className="display">{service.title}</h2><h3>{service.intro}</h3><p>{service.body}</p><ul>{service.list.map(x => <li key={x}><Check size={15} />{x}</li>)}</ul><Link className="under-link" to={`/contact?need=${encodeURIComponent(index === 3 ? 'Growth Setup' : index === 1 ? 'Custom Development' : 'Website')}`}>Discuss this service <ArrowRight size={16} /></Link></div><ServiceVisual type={service.art} imageIndex={index} /></Reveal></div>
}

function Work() {
  const [filter, setFilter] = useState('All work')
  const filtered = filter === 'All work' ? projects : projects.filter(p => p.category === filter)
  return <><PageHero eyebrow="SELECTED CONCEPTS / 01—03" title={<>A DIFFERENT<br /><em>POINT OF VIEW.</em></>} body="Three industries. Three distinct directions. Explore the thinking behind each concept." /><section className="work-page section-pad"><div className="work-filters" aria-label="Filter projects">{['All work', 'Industrial', 'Architecture', 'Product'].map(label => <button key={label} aria-pressed={filter === label} className={cx(filter === label && 'active')} onClick={() => setFilter(label)}>{label}<span>{label === 'All work' ? '03' : '01'}</span></button>)}</div><p className="work-disclosure">Self-initiated concept studies, created to explore our approach. These are not client commissions.</p><div className="work-grid work-catalog">{filtered.map((p, i) => <ProjectCard project={p} index={i} key={p.name} />)}</div><p className="result-count mono" role="status">{filtered.length} CONCEPT {filtered.length === 1 ? 'PROJECT' : 'PROJECTS'}</p></section><BigCTA /></>
}

function CaseStudy({ project, index }) {
  return <Reveal className={cx('case-study', index % 2 && 'reverse')}><div className="case-image"><img src={project.image} loading="lazy" alt={`${project.name} primary concept`} /><img src={project.secondary} loading="lazy" alt={`${project.name} secondary concept`} />{project.tertiary && <img src={project.tertiary} loading="lazy" alt={`${project.name} detail concept`} />}</div><div className="case-copy"><span className="mono">CASE STUDY {project.no} — CONCEPT PROJECT</span><h2 className="display">{project.name}</h2><p>{project.line}</p><div className="case-tags mono"><span>STRATEGY</span><span>DESIGN</span><span>DEVELOPMENT</span></div><Link className="under-link" to={`/work/${project.slug}`}>Explore concept <ArrowRight /></Link></div></Reveal>
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  if (!project) return <NotFound />
  const index = projects.indexOf(project)
  const stories = [
    { challenge: 'Technical capability is difficult to communicate when every page looks like a catalogue. This direction makes precision and scale immediately visible.', approach: 'Industrial photography, a restrained palette and strong type give the brand a confident voice. Capabilities, sectors and enquiry paths would form the core of the interface.', deliverables: ['Brand and visual direction', 'Capabilities-led page structure', 'Industrial image art direction', 'Responsive interface concept'] },
    { challenge: 'An architecture studio needs room to let its work speak, while helping prospective clients understand its approach.', approach: 'Warm materials, generous space and an editorial rhythm turn the portfolio into a considered experience. Project stories would balance atmosphere with practical context.', deliverables: ['Editorial visual direction', 'Project gallery structure', 'Material-led image palette', 'Responsive portfolio concept'] },
    { challenge: 'A product website needs to make an unfamiliar object feel desirable and understandable before asking someone to buy.', approach: 'A dark, focused composition puts the object first. Close-up imagery and a clear feature story create a product-led direction, with room for shopping functionality in a later build.', deliverables: ['Product visual direction', 'Feature storytelling structure', 'Product image art direction', 'Responsive landing concept'] },
  ]
  const story = stories[index]
  const next = projects[(index + 1) % projects.length]
  return <article className="project-detail">
    <div className="project-detail-head section-pad"><Link to="/work" className="under-link"><ArrowLeft size={16} />All concepts</Link><div className="project-title-row"><h1 className="display">{project.name}</h1><span className="mono">{project.type}<br />SELF-INITIATED CONCEPT / {project.no}</span></div><p>{project.line}</p></div>
    <figure className="project-cover"><img src={project.image} alt={project.name === 'FORGE' ? 'Precision machining with sparks in a dark industrial workshop' : project.name === 'MONUMENT' ? 'Minimal stone building in warm evening light' : 'Sculptural technology product with a violet-lit edge'} fetchpriority="high" /><figcaption>CONCEPT VISUAL DIRECTION · {project.name}</figcaption></figure>
    <section className="project-story section-pad"><div><span className="eyebrow mono">01 / THE CHALLENGE</span><h2 className="display">A CLEARER<br />FIRST IMPRESSION.</h2><p>{story.challenge}</p></div><div><span className="eyebrow mono">02 / THE DIRECTION</span><h2 className="display">THE THINKING<br />BEHIND THE LOOK.</h2><p>{story.approach}</p><ul>{story.deliverables.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul></div></section>
    <section className="project-gallery section-pad"><img src={project.secondary} loading="lazy" decoding="async" alt={`${project.name} supporting visual direction`} />{project.tertiary && <img src={project.tertiary} loading="lazy" decoding="async" alt="Machined turbine detail" />}<div className="project-concept-note"><span className="mono">ABOUT THIS STUDY</span><p>This self-initiated study demonstrates a visual direction. The imagery is illustrative; no client relationship, deployed product or performance result is implied.</p><Link to="/contact?need=Website" className="under-link">Have a similar project in mind? <ArrowRight size={16} /></Link></div></section>
    <Link className="next-project section-pad" to={`/work/${next.slug}`}><span className="mono">NEXT CONCEPT</span><strong className="display">{next.name}</strong><ArrowUpRight size={40} /></Link>
  </article>
}

function FAQ() {
  const items = [
    ['What kind of businesses do you work with?', 'We focus on businesses that need a clearer, more distinctive web presence—from independent professionals and service companies to product and industrial brands. The scope starts with your business, audience and goals.'],
    ['What happens after we choose a package?', 'The package is a starting point. We clarify the pages, content, functionality and timeline together, then agree the deliverables before design and development begin. You can prepare a brief from the project form.'],
    ['Can you redesign an existing website?', 'Yes. A redesign can include a new visual direction, clearer content, better navigation and a responsive React frontend. Existing integrations and migration requirements are scoped separately.'],
    ['Which technologies will my website use?', 'The frontend is built in React and JavaScript. Where a project needs a backend, the intended stack is MongoDB, Express and Node.js. Accounts, payments and databases require a separately agreed implementation.'],
    ['Are content, integrations and ongoing changes included?', 'Package inclusions are listed on the pricing page. Copywriting, specialist integrations and ongoing changes should be discussed during scoping. Domain and hosting renewals after the included first year are also agreed separately.'],
  ]
  return <section className="faq-section section-pad"><div><SectionIntro compact eyebrow="A FEW USEFUL ANSWERS" title={<>GOOD QUESTIONS.<br /><em>CLEAR ANSWERS.</em></>} /><Link to="/contact" className="under-link">Tell us about your project <ArrowRight size={16} /></Link></div><div className="faq-list">{items.map(([question, answer], i) => <details key={question}><summary><span className="mono">0{i + 1}</span><h3>{question}</h3><Plus size={20} /></summary><p>{answer}</p></details>)}</div></section>
}

function NotFound() {
  return <section className="not-found section-pad"><span className="mono">404 / A SMALL DETOUR</span><h1 className="display">LET'S GET<br /><em>YOU BACK.</em></h1><p>This page doesn't exist. There's plenty to explore at the studio.</p><Link to="/" className="pill light">Back to home</Link><Link to="/work" className="under-link">Explore our concepts</Link></section>
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const update = () => setVisible(window.scrollY > 650); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  return <AnimatePresence>{visible && <motion.button className="back-to-top" aria-label="Back to top" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ChevronUp size={20} /></motion.button>}</AnimatePresence>
}

function About() {
  const values = [['CLARITY', 'Complexity should happen behind the interface, not in front of the customer.'], ['CRAFT', "Details aren't decoration. They're what people feel."], ['ORIGINALITY', 'Different for the sake of different is noise. Different with purpose is identity.'], ['RESPONSIBILITY', 'If we build it, we care how it performs after launch.']]
  return <><PageHero eyebrow="ABOUT" title={<>WE STARTED OUTMARK<br />FOR A SIMPLE REASON.<br /><em>TO MAKE BETTER</em><br />DIGITAL WORK.</>} image="/assets/abstract-ribbon.jpg" /><section className="about-story section-pad"><Reveal className="about-lead display">Too many business websites are treated like checkboxes.</Reveal><Reveal className="about-list mono">A LOGO. &nbsp; A FEW SECTIONS. &nbsp; A CONTACT FORM. &nbsp; DONE.</Reveal><Reveal as="p">We think the website deserves more attention than that. Outmark is an independent digital studio focused on stronger ideas, better execution and a higher standard of finish.</Reveal></section><section className="studio section-pad"><div className="studio-image"><img src="/assets/monument-interior.jpg" alt="Quiet minimalist studio interior" /></div><div className="studio-copy"><SectionIntro eyebrow="INDEPENDENT / FOCUSED" title={<>SMALL STUDIO.<br />BIG STANDARD.</>} body="Being focused means fewer layers between the idea and the people building it. Strategy, design and development stay connected throughout the project." /></div></section><section className="values section-pad">{values.map((v, i) => <Reveal className="value" key={v[0]} delay={i * .05}><span className="mono">0{i + 1}</span><h3 className="display">{v[0]}</h3><p>{v[1]}</p></Reveal>)}</section><section className="about-closing"><img src="/assets/explosion.jpg" alt="Abstract fragments in motion" /><h2 className="display">OUTMARK ISN'T ABOUT<br />BEING LOUDER.<br />IT'S ABOUT BEING<br /><em>HARDER TO FORGET.</em></h2><Link className="pill light" to="/contact">Start a project <ArrowUpRight /></Link></section></>
}

function Pricing() {
  return <><PageHero eyebrow="PRICING" title={<>A CLEAR PLACE<br />TO START.</>} body="Defined packages for common projects. Custom scope when the project needs more." /><section className="pricing-page section-pad">{plans.map((p, i) => <PlanCard plan={p} i={i} key={p.name} />)}<Reveal className="custom-plan"><div><span className="mono">CUSTOM / ADVANCED</span><h2 className="display">LET'S TALK.</h2><p>We'll understand the requirement first, define the scope and quote the project accordingly.</p></div><div className="custom-scopes mono">{['E-COMMERCE', 'ADMIN DASHBOARDS', 'CUSTOMER ACCOUNTS', 'BOOKING SYSTEMS', 'PAYMENT GATEWAYS', 'CRM INTEGRATIONS', 'CUSTOM DATABASES', 'APIs'].map(x => <span key={x}>{x}</span>)}</div><Link className="pill light" to="/contact">Discuss a custom project <ArrowUpRight /></Link></Reveal><p className="pricing-note mono">ALL PRICING IS INDICATIVE STARTING SCOPE AND CAN CHANGE WHEN REQUIREMENTS EXCEED THE LISTED DELIVERABLES.</p></section></>
}

function PlanCard({ plan, i }) {
  return <Reveal className={cx('plan-card', plan.popular && 'popular')} delay={i * .06}>{plan.popular && <span className="popular-tag mono">RECOMMENDED</span>}<div className="plan-top"><span className="mono">0{i + 1} / {plan.name}</span><h2 className="display">{plan.price}</h2><p>{plan.note}</p></div><div className="plan-list"><span className="mono">INCLUDES</span>{plan.items.map(x => <div key={x}><Check size={16} />{x}</div>)}</div><Link className={cx('pill', plan.popular && 'light')} to={`/contact?plan=${plan.name}`}>Choose {plan.name[0] + plan.name.slice(1).toLowerCase()} <ArrowUpRight /></Link></Reveal>
}

function Contact() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const selectedPlan = plans.find(p => p.name === params.get('plan'))
  const needs = ['Website', 'Redesign', 'Landing Page', 'Custom Development', 'Growth Setup', 'Something Else']
  const budgets = ['₹10k – ₹20k', '₹20k – ₹35k', '₹35k – ₹75k', '₹75k+', 'Not sure yet']
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => {
    let draft = {}
    try { draft = JSON.parse(sessionStorage.getItem('outmark-brief') || '{}') } catch { /* Start with an empty brief. */ }
    const need = needs.includes(params.get('need')) ? params.get('need') : draft.need || ''
    return { need: selectedPlan?.name === 'GROWTH' ? 'Growth Setup' : selectedPlan ? 'Website' : need, budget: selectedPlan ? selectedPlan.name === 'STARTER' ? budgets[0] : budgets[1] : draft.budget || '', message: draft.message || '', name: draft.name || '', email: draft.email || '', plan: selectedPlan?.name || draft.plan || '' }
  })
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const heading = useRef(null)
  useEffect(() => { try { sessionStorage.setItem('outmark-brief', JSON.stringify(form)) } catch { /* Draft saving is optional. */ } }, [form])
  useEffect(() => { const timer = setTimeout(() => heading.current?.focus(), 350); return () => clearTimeout(timer) }, [step, done])
  const choose = (field, value) => setForm(f => ({ ...f, [field]: value }))
  const next = event => {
    event.preventDefault()
    const issue = step === 1 && !form.need ? 'Choose a service to continue.' : step === 2 && !form.budget ? 'Choose a range, or select “Not sure yet”.' : step === 3 && form.message.trim().length < 20 ? 'Add at least 20 characters so we can understand your project.' : step === 4 && !form.name.trim() ? 'Please enter your name.' : step === 4 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? 'Please enter a valid email address.' : ''
    setError(issue)
    if (issue) return
    if (step < 4) setStep(s => s + 1)
    else setDone(true)
  }
  const brief = () => ['OUTMARK — PROJECT BRIEF', '', 'Name: ' + form.name.trim(), 'Email: ' + form.email.trim(), 'Service: ' + form.need, 'Budget: ' + form.budget, ...(form.plan ? ['Package: ' + form.plan] : []), '', 'PROJECT DETAILS', form.message.trim(), '', 'Prepared locally. This brief has not been sent to Outmark.'].join('\n')
  const copy = async () => { try { await navigator.clipboard.writeText(brief()); setCopied(true); setTimeout(() => setCopied(false), 2500) } catch { setError('Clipboard is unavailable. You can download your brief instead.') } }
  return <section className="contact-page grid-bg">
    <div className="contact-left"><div className="eyebrow mono"><span />LET'S BUILD SOMETHING</div><h1 className="display">YOUR NEXT<br />CHAPTER.<br /><em>STARTS HERE.</em></h1><p>A new website, a thoughtful redesign or something more ambitious. Start with a few useful details.</p><div className="contact-expectations"><span className="mono">A CLEAR FIRST STEP</span><div><CheckCircle2 size={19} />Define what you need</div><div><CheckCircle2 size={19} />Set a comfortable starting range</div><div><CheckCircle2 size={19} />Leave with a ready-to-share brief</div></div><Link to="/pricing" className="under-link">Explore the packages <ArrowRight size={16} /></Link></div>
    <div className="contact-form-wrap">
      {form.plan && <div className="plan-context"><span>{form.plan} PACKAGE</span><button type="button" onClick={() => choose('plan', '')} aria-label="Remove selected package"><X size={15} /></button></div>}
      {done ? <motion.div className="success" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <div className="success-icon"><Check /></div><span className="mono">READY TO SHARE</span><h2 ref={heading} tabIndex={-1} className="display">YOUR BRIEF<br />IS READY.</h2><p>Thanks, {form.name.split(' ')[0]}. Review your details below, then download or copy your brief. It has not been sent to Outmark.</p>
        <dl className="brief-summary"><div><dt>Service</dt><dd>{form.need}</dd></div><div><dt>Budget</dt><dd>{form.budget}</dd></div><div><dt>Name</dt><dd>{form.name}</dd></div><div><dt>Email</dt><dd>{form.email}</dd></div><div className="brief-message"><dt>Your project</dt><dd>{form.message}</dd></div></dl>
        <div className="brief-actions"><a className="pill light" href={`data:text/plain;charset=utf-8,${encodeURIComponent(brief())}`} download="outmark-project-brief.txt"><Download size={16} />Download brief</a><button className="pill" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy brief'}</button></div>
        {error && <p role="alert" className="form-error">{error}</p>}
        <button className="under-link edit-brief" onClick={() => { setDone(false); setError(''); setStep(1) }}>Edit your brief</button>
      </motion.div> : <form className="contact-form" onSubmit={next} noValidate>
        <div className="form-head"><span className="mono">STEP 0{step} / 04</span><div>{[1,2,3,4].map(n => <i className={n <= step ? 'active' : ''} key={n} />)}</div></div>
        <div ref={heading} tabIndex={-1} className="form-step-heading" aria-live="polite"><span className="mono step-label">{['SERVICE', 'INVESTMENT', 'THE PROJECT', 'YOUR DETAILS'][step - 1]}</span><h2>{['What do you have in mind?', 'What feels comfortable?', 'Tell us about your project.', 'Who is the brief for?'][step - 1]}</h2></div>
        <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
          {step === 1 && <ChoiceStep label="Select your service" items={needs} value={form.need} onPick={v => { choose('need', v); setError('') }} />}
          {step === 2 && <ChoiceStep label="Select your budget" items={budgets} value={form.budget} onPick={v => { choose('budget', v); setError('') }} />}
          {step === 3 && <TextStep form={form} choose={choose} />}
          {step === 4 && <DetailsStep form={form} choose={choose} />}
        </motion.div></AnimatePresence>
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="form-actions">{step > 1 && <button type="button" className="back" onClick={() => { setStep(s => s - 1); setError('') }}><ArrowLeft size={16} />Back</button>}<button type="submit" className="continue">{step === 4 ? 'Review my brief' : 'Continue'}<ArrowRight size={16} /></button></div>
        <p className="privacy">Your draft stays in this browser tab. Download it when you're ready; nothing is sent automatically.</p>
      </form>}
    </div>
  </section>
}

function ChoiceStep({ label, title, items, value, onPick }) {
  return <div className="choice-grid" role="group" aria-label={label}>{items.map(x => <button type="button" aria-pressed={value === x} className={value === x ? 'selected' : ''} onClick={() => onPick(x)} key={x}>{x}<i>{value === x && <Check size={15} />}</i></button>)}</div>
}

function TextStep({ form, choose }) {
  return <><label htmlFor="project-message">Your goals, audience and anything we should know</label><textarea id="project-message" maxLength={600} minLength={20} value={form.message} onChange={e => choose('message', e.target.value)} placeholder="For example: We're an architecture studio launching our first website. We'd like a project gallery and a simple way for clients to get in touch." aria-describedby="message-count" /><span id="message-count" className="char-count mono">{form.message.length} / 600 · MIN. 20 CHARACTERS</span></>
}

function DetailsStep({ form, choose }) {
  return <><label htmlFor="brief-name">Your name<input id="brief-name" autoComplete="name" maxLength={80} required value={form.name} onChange={e => choose('name', e.target.value)} placeholder="Your name" /></label><label htmlFor="brief-email">Email address<input id="brief-email" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={e => choose('email', e.target.value)} placeholder="you@company.com" /></label><p className="detail-note">These details will be included in your downloaded brief.</p></>
}

function Footer() {
  return <footer><div className="footer-brand"><Link to="/" className="brand" aria-label="Outmark home"><LogoMark /><span>OUTMARK</span></Link><p>Thoughtful design. Carefully built websites.<br />A connected foundation for what's next.</p><Link to="/contact" className="under-link">Let's build your next chapter <ArrowRight size={16} /></Link></div><div><span className="mono">EXPLORE</span>{navItems.map(([l, h]) => <Link to={h} key={h}>{l}</Link>)}</div><div><span className="mono">WHAT WE DO</span>{services.map(s => <Link to={`/services#service-${s.no}`} key={s.no}>{s.title}</Link>)}</div><div className="footer-bottom mono"><span>© {new Date().getFullYear()} OUTMARK</span><span>INDEPENDENT STUDIO · INDIA / EVERYWHERE</span><span>REACT + JAVASCRIPT</span></div></footer>
}

export default App
