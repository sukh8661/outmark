import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react'
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
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1650)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenu(false)
    const path = location.pathname.slice(1)
    const title = path ? `${path[0].toUpperCase()}${path.slice(1)} — OUTMARK` : 'OUTMARK — Outmark the ordinary.'
    document.title = title
  }, [location.pathname])

  return (
    <>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <CustomCursor />
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Header open={menu} setOpen={setMenu} />
      <MobileMenu open={menu} setOpen={setMenu} />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
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
    const id = setInterval(() => setNumber(n => Math.min(n + Math.ceil((100 - n) / 5), 100)), 65)
    return () => clearInterval(id)
  }, [])
  return (
    <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: .75, ease: [0.76, 0, 0.24, 1] }}>
      <div className="loader-top mono"><span>DIGITAL STUDIO</span><span>LOADING</span></div>
      <div className="loader-center"><LogoMark large /><div className="display loader-word">OUTMARK</div></div>
      <div className="loader-bottom mono"><span>OUTMARK THE ORDINARY.</span><div className="loader-line"><motion.i animate={{ width: `${number}%` }} /></div><span>{String(number).padStart(3, '0')}%</span></div>
    </motion.div>
  )
}

function LogoMark({ large = false }) {
  return <span className={cx('logo-mark', large && 'large')}><i /><i /><i /></span>
}

function Header({ open, setOpen }) {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Outmark home"><LogoMark /><span>OUTMARK</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.slice(0, -1).map(([label, href]) => <NavLink key={href} to={href} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <Link to="/contact" className="pill light">Start a project <ArrowUpRight size={15} /></Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
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

function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const move = e => {
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`
      if (ring.current) ring.current.animate({ transform: `translate3d(${e.clientX}px,${e.clientY}px,0)` }, { duration: 420, fill: 'forwards' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>
}

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const M = motion[as]
  return <M className={className} initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .8, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</M>
}

function SectionIntro({ eyebrow, title, body, compact = false }) {
  return (
    <div className={cx('section-intro', compact && 'compact')}>
      <Reveal className="eyebrow mono"><span />{eyebrow}</Reveal>
      <Reveal as="h2" className="display" delay={.05}>{title}</Reveal>
      {body && <Reveal as="p" delay={.1}>{body}</Reveal>}
    </div>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <section className="pov section-pad">
        <div className="pov-copy">
          <div className="mono eyebrow"><span />THE POINT OF VIEW</div>
          <Reveal as="h2" className="display outline-line">WE DON'T BUILD MORE WEBSITES.</Reveal>
          <Reveal as="h2" className="display filled-line">WE BUILD THE ONES PEOPLE REMEMBER.</Reveal>
          <Reveal as="p">In a world full of templates, sameness is expensive. Outmark combines design, engineering and motion to build digital experiences with a point of view.</Reveal>
        </div>
        <Marquee words="WEB DESIGN · WEB DEVELOPMENT · DIGITAL EXPERIENCES · GROWTH FOUNDATIONS · E-COMMERCE · BRAND SYSTEMS ·" />
      </section>
      <section className="services-home section-pad">
        <SectionIntro eyebrow="CAPABILITIES / 01—04" title="WHAT WE DO" body="Not a list of deliverables. A system for making your business better online." />
        <div className="service-stack">{services.map((s, i) => <ServicePanel key={s.no} service={s} index={i} />)}</div>
      </section>
      <SystemSection />
      <section className="work-home section-pad">
        <SectionIntro eyebrow="SELECTED / CONCEPT WORK" title={<>SELECTED<br />WORK</>} body="New studio. Real ambition. These are honestly-labelled concept projects built to show how we think." />
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  return (
    <section ref={ref} className="hero grid-bg">
      <div className="hero-hud mono"><span>yourbusiness.com</span><span>LCP 0.6S</span><span>MOTION ON</span><span>SEO READY</span></div>
      <motion.img style={{ y }} className="hero-ghost" src="/assets/abstract-wave.jpg" alt="" />
      <div className="hero-windows" aria-hidden="true"><CodeWindow /><BrowserWindow /></div>
      <div className="hero-main">
        <h1 className="display hero-title"><span>OUTMARK</span><em>the</em><b>ORDINARY.</b></h1>
        <div className="hero-lower">
          <div><p>We design and build digital experiences for businesses that refuse to blend in.</p><div className="mono hero-tags">STRATEGY <i /> DESIGN <i /> DEVELOPMENT <i /> GROWTH</div></div>
          <div className="hero-actions"><Link to="/contact" className="pill light">Start a project <ArrowUpRight size={16} /></Link><Link to="/work" className="under-link">Explore our work <ArrowRight size={16} /></Link></div>
        </div>
      </div>
      <div className="scroll-cue mono"><span>01</span><span className="line" /><span>SCROLL</span><ArrowDown size={13} /></div>
      <ModeToggle />
    </section>
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
    ['VISITOR', 'A stranger finds you — through search, social or word of mouth.', 'SEARCH · SOCIAL · REFERRAL'],
    ['EXPERIENCE', 'Clarity, speed and a story worth staying for.', 'WEBSITE · MOBILE · STORY'],
    ['ENQUIRY', 'Reaching you takes one tap — no friction, no dead ends.', 'FORM · WHATSAPP · EMAIL'],
    ['LEAD', 'Captured, routed and organised the moment it arrives.', 'SHEET · EMAIL · NOTIFY'],
    ['GROWTH', 'Measured, refined and scaled — the system compounds.', 'ANALYTICS · SEARCH · ADS'],
  ]
  return <section className="system section-pad grid-bg"><SectionIntro eyebrow="THE BIGGER PICTURE" title={<>NOT JUST A WEBSITE.<br />A DIGITAL SYSTEM.</>} body="Good websites don't end at the screen. They connect attention to action." /><div className="flow-grid">{steps.map((s, i) => <Reveal className="flow-step" key={s[0]} delay={i * .06}><span className="mono">0{i + 1}</span><h3 className="display">{s[0]}</h3><p>{s[1]}</p><small className="mono">{s[2]}</small>{i < steps.length - 1 && <ArrowRight className="flow-arrow" />}</Reveal>)}</div></section>
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
  return <section className={cx('page-hero grid-bg', image && 'with-image')}><div className="page-hero-inner"><div className="eyebrow mono"><span />{eyebrow}</div><motion.h1 className="display" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>{title}</motion.h1>{body && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>{body}</motion.p>}{children}</div>{image && <motion.img initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: .72 }} transition={{ duration: 1.2 }} src={image} alt="" />}</section>
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
