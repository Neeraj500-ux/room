import React, { useEffect, useRef, useState } from 'react'

/* ---------- DATA (unchanged content) ---------- */
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
const IMG = {
  hero: u('photo-1618221195710-dd6b41faaea6', 1600),
  about: u('photo-1600210492486-724fe5c67fb0'),
  living: u('photo-1616486338812-3dadae4b4ace'),
  bedroom: u('photo-1616594039964-ae9021a400a0'),
  office: u('photo-1524758631624-e2822e304c36'),
  kitchen: u('photo-1556909114-f6e7ad7d3136'),
  small: u('photo-1586023492125-27b2c045efd7'),
  commercial: u('photo-1497366216548-37526070297c'),
}

const nav = [['Home', 'home'], ['About Us', 'about'], ['Services', 'services'], ['How It Works', 'how'], ['Projects', 'projects'], ['Testimonials', 'testimonials'], ['Contact', 'contact']]
const problems = ['Limited space', 'Poor room layout', 'Unused corners', 'Lack of storage', 'Outdated interiors', 'Difficult furniture placement']
const services = [
  ['🏠', 'Room Planning', 'Smart layouts designed to make your room feel more spacious, comfortable and functional.'],
  ['📐', 'Space Optimization', 'We identify unused areas and turn them into practical spaces without unnecessary construction.'],
  ['🛋️', 'Interior Design', 'Modern and elegant interiors designed around your lifestyle, preferences and requirements.'],
  ['📦', 'Smart Storage', 'Creative storage solutions that help keep your space organized while maintaining a clean look.'],
  ['💡', 'Lighting & Ambience', 'Well-planned lighting solutions that improve the appearance and atmosphere of every room.'],
  ['🏢', 'Building Space Planning', 'Efficient planning for residential and commercial buildings to maximize usability and comfort.'],
]
const why = [
  ['Personalized Planning', 'Every project starts with understanding your space, requirements and goals.'],
  ['Functional Design', "We don't design spaces just to look good. Every element has a purpose."],
  ['Modern Aesthetics', 'Clean, contemporary designs that remain practical and timeless.'],
  ['Space Efficiency', 'We help you get more functionality from the space you already have.'],
  ['Transparent Process', 'Clear communication, straightforward planning and no unnecessary complexity.'],
  ['Quality Focused', 'We pay attention to materials, details, finishes and overall execution.'],
]
const steps = [
  ['Tell Us About Your Space', 'Share your requirements, room dimensions, photos and ideas.'],
  ['Space Assessment', 'Our team studies your space and identifies opportunities for improvement.'],
  ['Design & Planning', 'We create a practical layout and design direction based on your needs.'],
  ['Review & Refine', 'You review the proposed concept and share your feedback.'],
  ['Execution', 'Once everything is approved, the transformation begins.'],
  ['Enjoy Your New Space', 'A smarter, more comfortable and better-utilized space is ready for you.'],
]
const projects = [['Living Room', IMG.living], ['Bedroom', IMG.bedroom], ['Home Office', IMG.office], ['Kitchen', IMG.kitchen], ['Small Spaces', IMG.small], ['Commercial Spaces', IMG.commercial]]
const reviews = [
  ['They completely changed the way we use our living space. The room feels bigger, cleaner and much more comfortable.', 'Rahul Mehta', 'Homeowner'],
  ['The planning was simple, professional and exactly what we needed. They made excellent use of every corner.', 'Priya Sharma', 'Client'],
  ['Our unused room is now a beautiful home office. The entire process was smooth and well organized.', 'Amit Verma', 'Client'],
]
const faqs = [
  ['Can you help with small rooms?', 'Yes. We specialize in making small and challenging spaces more functional through smart planning, furniture placement and storage solutions.'],
  ['Do you work on existing rooms?', 'Yes. We can redesign existing spaces without requiring a complete rebuild.'],
  ['Can you work within a specific budget?', 'Yes. We discuss your budget at the beginning and create solutions according to your priorities.'],
  ['Do you provide complete interior solutions?', 'Yes. Depending on the project, we can assist with planning, design, furniture, storage, lighting and execution.'],
  ['How can I start a project?', "Simply contact us and share basic details about your space. We'll guide you through the next steps."],
]

/* ---------- GLOBAL EFFECT STYLES (kept inside this file) ---------- */
const css = `
html{scroll-behavior:smooth}
@keyframes rs-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes rs-shine{to{background-position:200% center}}
@keyframes rs-marq{to{transform:translateX(-50%)}}
@keyframes rs-blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.18)}}
@keyframes rs-ring{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.9);opacity:0}}
@keyframes rs-spin{to{transform:rotate(360deg)}}
@keyframes rs-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.rs-float{animation:rs-float 6s ease-in-out infinite}
.rs-float2{animation:rs-float 7.5s ease-in-out -2s infinite}
.rs-shine{background-size:200% auto;animation:rs-shine 5s linear infinite}
.rs-marq{animation:rs-marq 32s linear infinite}
.rs-marq:hover{animation-play-state:paused}
.rs-blob{animation:rs-blob 13s ease-in-out infinite}
.rs-ring{animation:rs-ring 2.4s ease-out infinite}
.rs-spin{animation:rs-spin 22s linear infinite}
.rs-in{animation:rs-in .9s cubic-bezier(.2,.7,.2,1) both}
.rs-grid{background-image:linear-gradient(to right,rgba(10,50,120,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(10,50,120,.06) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%);mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%)}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`

/* ---------- HOOKS ---------- */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect() } }, { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, on]
}

/* ---------- SMALL COMPONENTS ---------- */
const hidden = {
  up: 'opacity-0 translate-y-10 blur-sm',
  left: 'opacity-0 -translate-x-10 blur-sm',
  right: 'opacity-0 translate-x-10 blur-sm',
  zoom: 'opacity-0 scale-90 blur-sm',
}

function Reveal({ children, className = '', delay = 0, from = 'up' }) {
  const [ref, on] = useInView()
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(.2,.7,.2,1)] ${on ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0' : hidden[from]} ${className}`}>
      {children}
    </div>
  )
}

function Counter({ value, suffix = '', duration = 1800 }) {
  const [ref, on] = useInView(0.3)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return
    let raf, t0
    const tick = (t) => {
      t0 = t0 || t
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 4)) * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [on, value, duration])
  return <span ref={ref}>{n}{suffix}</span>
}

function Img({ src, alt, className = '', style }) {
  const [bad, setBad] = useState(false)
  if (bad) return <div className={`bg-gradient-to-br from-sky/40 to-deep/70 ${className}`} style={style} role="img" aria-label={alt} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} style={style} />
}

const Btn = ({ href = '#contact', children, ghost }) => (
  <a href={href} className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:scale-95 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full ${ghost ? 'border border-deep/25 bg-white text-deep hover:border-deep hover:shadow-soft' : 'bg-deep text-white shadow-soft hover:bg-[#0a3278] hover:shadow-lift'}`}>
    <span className="relative">{children}</span>
    <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
  </a>
)

const Head = ({ tag, title, text, center = true }) => (
  <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    {tag && <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[.2em] text-sky"><span className="h-px w-8 bg-sky" />{tag}<span className="h-px w-8 bg-sky" /></p>}
    <h2 className="text-3xl font-semibold leading-tight text-deep sm:text-4xl lg:text-[2.75rem]">{title}</h2>
    <div className={`mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-deep to-sky ${center ? 'mx-auto' : ''}`} />
    {text && <p className="mt-5 leading-relaxed text-ink/70">{text}</p>}
  </Reveal>
)

/* 3D tilt + spotlight wrapper for cards */
function Tilt({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const [s, setS] = useState({ x: 0, y: 0, mx: 0, my: 0, h: false })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setS({ x: (0.5 - py) * max, y: (px - 0.5) * max, mx: e.clientX - r.left, my: e.clientY - r.top, h: true })
  }
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setS({ x: 0, y: 0, mx: 0, my: 0, h: false })}
      style={{ transform: `perspective(900px) rotateX(${s.x}deg) rotateY(${s.y}deg) translateZ(0)`, transition: s.h ? 'transform .08s linear' : 'transform .6s cubic-bezier(.2,.7,.2,1)' }}
      className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/25 blur-2xl transition-opacity duration-300"
        style={{ left: s.mx, top: s.my, opacity: s.h ? 1 : 0 }} />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

function ScrollProgress() {
  const [p, setP] = useState(0)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? (window.scrollY / h) * 100 : 0)
      setShow(window.scrollY > 600)
    }
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <div className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-deep via-sky to-deep" style={{ width: `${p}%` }} />
      <a href="#home" aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-deep text-white shadow-lift transition-all duration-500 hover:-translate-y-1 hover:bg-sky ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>↑</a>
    </>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 shadow-soft backdrop-blur-xl' : 'bg-white'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4'}`}>
        <a href="#home" className="text-xl font-bold tracking-tight text-deep">ROOM<span className="text-sky">SPACE</span></a>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([n, id]) => (
            <a key={id} href={`#${id}`} className="group relative text-sm font-medium text-ink/70 transition hover:text-deep">
              {n}<span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-sky transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden lg:block"><Btn>Get a Free Consultation</Btn></div>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-xl p-2 text-deep lg:hidden">
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M6 6l14 14M20 6L6 20" /> : <path d="M4 8h18M4 13h18M4 18h18" />}</svg>
        </button>
      </div>
      <div className={`grid bg-white transition-all duration-500 lg:hidden ${open ? 'grid-rows-[1fr] border-t border-mist' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden px-5">
          <div className="pb-6">
            {nav.map(([n, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-mist py-3 font-medium text-ink/80">{n}</a>)}
            <div className="mt-4"><Btn>Get a Free Consultation</Btn></div>
          </div>
        </div>
      </div>
    </header>
  )
}

function BeforeAfter() {
  const [pos, setPos] = useState(15)
  const [ref, on] = useInView(0.4)
  useEffect(() => {
    if (!on) return
    let raf, t0
    const tick = (t) => {
      t0 = t0 || t
      const p = Math.min((t - t0) / 1400, 1)
      setPos(Math.round(15 + (50 - 15) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [on])
  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lift ring-1 ring-deep/10">
      <Img src={IMG.living} alt="After: redesigned living room" className="absolute inset-0 h-full w-full object-cover" />
      <Img src={IMG.living} alt="Before: cluttered living room" className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, filter: 'grayscale(1) brightness(.7) contrast(.9)' }} />
      <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">BEFORE</span>
      <span className="absolute right-4 top-4 rounded-full bg-sky px-4 py-1.5 text-xs font-semibold text-white">AFTER</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lift" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="rs-ring absolute inset-0 rounded-full bg-white" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-deep shadow-lift">⇄</div>
        </div>
      </div>
      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

function Faq() {
  const [i, setI] = useState(0)
  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-3">
      {faqs.map(([q, a], k) => (
        <Reveal key={q} delay={k * 70}>
          <div className={`rounded-2xl bg-white transition-all duration-300 ${i === k ? 'shadow-lift ring-1 ring-sky/40' : 'shadow-soft hover:shadow-lift'}`}>
            <button onClick={() => setI(i === k ? -1 : k)} aria-expanded={i === k} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-deep">
              {q}<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none transition-all duration-300 ${i === k ? 'rotate-45 bg-sky text-white' : 'bg-mist text-sky'}`}>+</span>
            </button>
            <div className={`grid transition-all duration-500 ${i === k ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden px-5 text-ink/70"><p className="pb-5 leading-relaxed">{a}</p></div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const f = 'w-full rounded-xl border border-deep/15 bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:-translate-y-0.5 focus:border-sky focus:shadow-soft focus:ring-4 focus:ring-sky/20'
  return (
    <section id="contact" className="relative overflow-hidden bg-mist py-24">
      <div className="rs-blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2" from="left">
          <h2 className="text-3xl font-semibold text-deep sm:text-4xl lg:text-[2.75rem]">Let's Plan Your Space.</h2>
          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-deep to-sky" />
          <p className="mt-5 leading-relaxed text-ink/70">Have a room that needs a makeover or a building that needs better space planning? Tell us what you're looking for.</p>
          <ul className="mt-8 space-y-4 font-medium text-deep">
            {[['📞', '+91 9773768835'], ['✉️', 'neerajsharma977376@gmail.com'], ['📍', 'New Delhi, India']].map(([ic, t]) => (
              <li key={t} className="group flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:bg-deep group-hover:shadow-lift">{ic}</span>{t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="lg:col-span-3" delay={100} from="right">
          {sent ? (
            <div className="rs-in rounded-3xl bg-white p-10 text-center shadow-lift">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky/15 text-3xl text-sky">✓</div>
              <p className="mt-4 text-xl font-semibold text-deep">Request received.</p>
              <p className="mt-2 text-ink/70">Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="grid gap-4 rounded-3xl bg-white p-6 shadow-lift ring-1 ring-deep/5 sm:grid-cols-2 sm:p-8">
              <input required className={f} placeholder="Full Name" />
              <input required type="tel" className={f} placeholder="Phone Number" />
              <input required type="email" className={`${f} sm:col-span-2`} placeholder="Email Address" />
              <select required defaultValue="" className={f}>
                <option value="" disabled>Project Type</option>
                {['Living Room', 'Bedroom', 'Home Office', 'Kitchen', 'Small Space', 'Commercial Space', 'Full Building'].map((o) => <option key={o}>{o}</option>)}
              </select>
              <input className={f} placeholder="Space Size (e.g. 12 x 14 ft)" />
              <textarea rows="4" className={`${f} sm:col-span-2`} placeholder="Your Requirements" />
              <button className="group relative overflow-hidden rounded-full bg-deep px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift active:scale-95 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full sm:col-span-2"><span className="relative">Submit Project Request →</span></button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- APP ---------- */
export default function App() {
  const [par, setPar] = useState({ x: 0, y: 0 })
  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPar({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
  }
  const marquee = [...problems, ...problems]

  return (
    <>
      <style>{css}</style>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero */}
        <section id="home" onMouseMove={onHeroMove} onMouseLeave={() => setPar({ x: 0, y: 0 })} className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
          <div className="rs-grid pointer-events-none absolute inset-0" />
          <div className="rs-blob pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-sky/25 blur-3xl" />
          <div className="rs-blob pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-deep/15 blur-3xl" style={{ animationDelay: '-6s' }} />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-28">
            <div>
              <span className="rs-in inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-deep shadow-soft ring-1 ring-sky/30 backdrop-blur">
                <span className="relative flex h-2 w-2"><span className="rs-ring absolute inset-0 rounded-full bg-sky" /><span className="relative h-2 w-2 rounded-full bg-sky" /></span>
                SMART SPACE • BETTER LIVING
              </span>
              <h1 className="rs-in mt-6 text-4xl font-bold leading-[1.08] text-deep sm:text-5xl lg:text-6xl" style={{ animationDelay: '.15s' }}>
                Transform Your Space Into a{' '}
                <span className="rs-shine bg-gradient-to-r from-deep via-sky to-deep bg-clip-text text-transparent">Place You'll Love.</span>
              </h1>
              <p className="rs-in mt-6 max-w-xl leading-relaxed text-ink/70" style={{ animationDelay: '.3s' }}>Make the most of every room with smart space planning, modern design and practical solutions tailored to your lifestyle. We help you turn empty, unused or outdated spaces into beautiful and functional interiors.</p>
              <div className="rs-in mt-8 flex flex-wrap gap-4" style={{ animationDelay: '.45s' }}><Btn>Start Your Project</Btn><Btn href="#services" ghost>Explore Our Services</Btn></div>
              <div className="rs-in mt-12 grid max-w-md grid-cols-3 gap-4 rounded-2xl bg-white/70 p-5 shadow-soft ring-1 ring-deep/5 backdrop-blur" style={{ animationDelay: '.6s' }}>
                {[[150, '+', 'Spaces Transformed'], [50, '+', 'Happy Clients'], [5, '+', 'Years Experience']].map(([n, s, l]) => (
                  <div key={l}><p className="text-3xl font-bold text-deep"><Counter value={n} suffix={s} /></p><p className="mt-1 text-xs text-ink/60">{l}</p></div>
                ))}
              </div>
            </div>

            <Reveal delay={150} from="zoom" className="relative">
              <div className="rs-spin pointer-events-none absolute -inset-4 rounded-[36px] border border-dashed border-sky/50" />
              <div style={{ transform: `translate(${par.x * -14}px, ${par.y * -14}px) scale(1.02)`, transition: 'transform .3s ease-out' }}>
                <Img src={IMG.hero} alt="Modern living room interior" className="relative aspect-[4/5] w-full rounded-[28px] object-cover shadow-lift sm:aspect-[5/4]" />
              </div>
              <div className="rs-float absolute -bottom-6 -left-3 rounded-2xl bg-white/90 p-4 shadow-lift backdrop-blur sm:-left-8">
                <p className="text-2xl font-bold text-deep"><Counter value={150} suffix="+" /></p><p className="text-xs text-ink/60">Spaces transformed</p>
              </div>
              <div className="rs-float2 absolute -right-2 top-8 flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-lift backdrop-blur sm:-right-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-deep text-white">★</span>
                <span><span className="block text-sm font-semibold text-deep">5.0 Rated</span><span className="text-xs text-ink/60">By our clients</span></span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden border-y border-deep/10 bg-deep py-4 text-white">
          <div className="rs-marq flex w-max gap-10 whitespace-nowrap">
            {marquee.map((p, i) => <span key={i} className="flex items-center gap-10 text-sm font-medium tracking-wide">{p}<span className="text-sky">✦</span></span>)}
          </div>
        </div>

        {/* Problems */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Head title="Is Your Space Not Working For You?" text="A room doesn't have to be bigger to feel better. With the right planning and design, even a small or unused space can become comfortable, organized and highly functional." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((p, i) => (
                <Reveal key={p} delay={i * 80} from={i % 2 ? 'right' : 'left'}>
                  <div className="group flex items-center gap-4 rounded-2xl border border-deep/10 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-sky/50 hover:shadow-lift">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mist font-bold text-sky transition duration-300 group-hover:rotate-[360deg] group-hover:bg-deep group-hover:text-white">!</span>
                    <span className="font-medium text-deep">{p}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative overflow-hidden bg-mist py-24">
          <div className="rs-blob pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
            <Reveal from="left" className="relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-sky/40" />
              <Img src={IMG.about} alt="Designed home exterior and interior" className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
              <div className="rs-float absolute -bottom-6 left-6 rounded-2xl bg-deep px-5 py-4 text-white shadow-lift">
                <p className="text-2xl font-bold"><Counter value={5} suffix="+" /></p><p className="text-xs text-white/80">Years of experience</p>
              </div>
            </Reveal>
            <Reveal delay={120} from="right">
              <p className="mb-3 text-sm font-semibold tracking-[.2em] text-sky">WHO WE ARE</p>
              <h2 className="text-3xl font-semibold leading-tight text-deep sm:text-4xl">We Create More Possibilities From Every Square Foot.</h2>
              <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-deep to-sky" />
              <p className="mt-5 leading-relaxed text-ink/70">We believe every space has untapped potential. Our approach combines thoughtful planning, modern aesthetics and practical functionality to create spaces that look beautiful and work effortlessly.</p>
              <p className="mt-4 leading-relaxed text-ink/70">From a single room makeover to complete building space planning, we focus on understanding your needs before creating a solution that fits your lifestyle, budget and vision.</p>
              <div className="mt-8"><Btn href="#how">Discover Our Approach</Btn></div>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Head title="Everything You Need to Make Your Space Better." text="From planning and design to final execution, we provide complete solutions for transforming your space." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(([ic, t, d], i) => (
                <Reveal key={t} delay={i * 80} from="zoom">
                  <Tilt className="group h-full rounded-3xl border border-deep/10 bg-white p-7 shadow-soft transition-shadow duration-300 hover:border-sky/40 hover:shadow-lift">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-2xl transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-sky/20">{ic}</span>
                    <h3 className="mt-5 text-lg font-semibold text-deep">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{d}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">Learn more →</span>
                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-deep to-sky transition-all duration-500 group-hover:w-full" />
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="relative overflow-hidden bg-deep py-24 text-white">
          <div className="rs-blob pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-sky/25 blur-3xl" />
          <div className="rs-blob pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-sky/15 blur-3xl" style={{ animationDelay: '-5s' }} />
          <div className="relative mx-auto max-w-7xl px-5">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">Designed Around You. Built Around Your Needs.</h2>
              <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-sky" />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {why.map(([t, d], i) => (
                <Reveal key={t} delay={i * 80}>
                  <Tilt className="group h-full rounded-3xl bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur transition duration-300 hover:bg-white/15 hover:ring-sky/50" max={6}>
                    <p className="text-4xl font-bold text-sky transition duration-500 group-hover:scale-110 group-hover:origin-left">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{d}</p>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Head title="From Empty Space to Your Dream Space." />
            <div className="relative mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map(([t, d], i) => (
                <Reveal key={t} delay={i * 90}>
                  <div className="group relative h-full rounded-3xl bg-mist p-7 pt-10 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-lift hover:ring-1 hover:ring-sky/40">
                    <span className="absolute -top-5 left-7">
                      <span className="rs-ring absolute inset-0 rounded-full bg-sky" />
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-deep font-semibold text-white shadow-soft transition duration-300 group-hover:scale-110 group-hover:bg-sky">{i + 1}</span>
                    </span>
                    <h3 className="text-lg font-semibold text-deep">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Head tag="OUR WORK" title="Spaces We've Transformed" text="Explore some of our recent space planning and interior transformation projects." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map(([t, src], i) => (
                <Reveal key={t} delay={i * 80} from="zoom">
                  <div className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl shadow-soft transition duration-500 hover:shadow-lift">
                    <Img src={src} alt={t} className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/10 to-transparent transition-opacity duration-500 group-hover:from-deep/95" />
                    <span className="absolute right-4 top-4 flex h-10 w-10 -translate-y-3 items-center justify-center rounded-full bg-white text-deep opacity-0 shadow-lift transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">↗</span>
                    <div className="absolute bottom-5 left-5 right-5 translate-y-3 transition duration-500 group-hover:translate-y-0">
                      <p className="text-lg font-semibold text-white">{t}</p>
                      <span className="mt-2 block h-0.5 w-8 bg-sky transition-all duration-500 group-hover:w-20" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center"><Btn href="#projects">View All Projects</Btn></div>
          </div>
        </section>

        {/* Before / After */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-5">
            <Head title="See the Difference Smart Planning Makes." text="A well-designed space isn't only about appearance. It's about creating better movement, better organization and better everyday living." />
            <Reveal className="mt-12" from="zoom"><BeforeAfter /></Reveal>
            <div className="mt-10 text-center"><Btn href="#projects" ghost>See More Transformations</Btn></div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="relative overflow-hidden bg-mist py-24">
          <div className="pointer-events-none absolute left-6 top-6 select-none text-[14rem] font-bold leading-none text-sky/10">“</div>
          <div className="relative mx-auto max-w-7xl px-5">
            <Head title="What Our Clients Say" />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reviews.map(([q, n, r], i) => (
                <Reveal key={n} delay={i * 100}>
                  <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-lift">
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-deep to-sky transition-transform duration-500 group-hover:scale-x-100" />
                    <p className="text-yellow-400" aria-label="5 stars">★★★★★</p>
                    <blockquote className="mt-4 flex-1 leading-relaxed text-ink/80">“{q}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-deep to-sky font-semibold text-white">{n[0]}</span>
                      <span><span className="block font-semibold text-deep">{n}</span><span className="text-sm text-ink/60">{r}</span></span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5"><Head title="Frequently Asked Questions" /><Faq /></div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-24">
          <Reveal from="zoom" className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-deep to-[#1565c0] px-6 py-20 text-center text-white shadow-lift sm:px-12">
            <div className="rs-blob absolute -right-16 -top-16 h-72 w-72 rounded-full bg-sky/30 blur-3xl" />
            <div className="rs-blob absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" style={{ animationDelay: '-4s' }} />
            <div className="rs-grid absolute inset-0 opacity-30" />
            <p className="relative text-sm font-semibold tracking-[.2em] text-sky">READY TO TRANSFORM YOUR SPACE?</p>
            <h2 className="relative mx-auto mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Your Space Has More Potential. Let's Unlock It.</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">Tell us about your room, building or workspace and discover how smart planning can turn it into something better.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <a href="#contact" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-deep transition duration-300 hover:-translate-y-0.5 hover:shadow-lift active:scale-95">Get Free Consultation</a>
              <a href="#contact" className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95">Talk to Our Team</a>
            </div>
          </Reveal>
        </section>

        <Contact />
      </main>

      <footer className="relative overflow-hidden bg-ink text-white/80">
        <div className="h-1 bg-gradient-to-r from-deep via-sky to-deep" />
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div><p className="text-xl font-bold text-white">ROOM<span className="text-sky">SPACE</span></p><p className="mt-2 text-sm">Smart Spaces. Better Living.</p></div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Projects', '#projects'], ['Contact', '#contact'], ['Privacy Policy', '#'], ['Terms & Conditions', '#']].map(([n, h]) => <li key={n}><a href={h} className="transition hover:text-sky">{n}</a></li>)}
            </ul>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row">
            <p>© 2026 ROOMSPACE. All Rights Reserved.</p>
            <ul className="flex gap-5">{['Instagram', 'Facebook', 'LinkedIn', 'Pinterest'].map((s) => <li key={s}><a href="#" className="transition hover:text-sky">{s}</a></li>)}</ul>
          </div>
        </div>
      </footer>
    </>
  )
}