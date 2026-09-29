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
:root{--deep:#0b3d91;--ink:#172b4d;--sky:#38bdf8;--mist:#f1f7fc}
html{scroll-behavior:smooth;scroll-padding-top:88px}
body{overflow-x:clip}
*{box-sizing:border-box}
img{max-width:100%}
:focus-visible{outline:3px solid var(--sky);outline-offset:3px}
@keyframes rs-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes rs-shine{to{background-position:200% center}}
@keyframes rs-marq{to{transform:translateX(-50%)}}
@keyframes rs-blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-22px) scale(1.12)}}
@keyframes rs-ring{0%{transform:scale(1);opacity:.4}100%{transform:scale(1.8);opacity:0}}
@keyframes rs-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.rs-float{animation:rs-float 6s ease-in-out infinite}.rs-float2{animation:rs-float 7s ease-in-out -2s infinite}
.rs-shine{background-size:200% auto;animation:rs-shine 6s linear infinite}
.rs-marq{animation:rs-marq 34s linear infinite}.rs-marq:hover{animation-play-state:paused}
.rs-blob{animation:rs-blob 14s ease-in-out infinite}.rs-ring{animation:rs-ring 2.4s ease-out infinite}
.rs-in{animation:rs-in .8s cubic-bezier(.2,.7,.2,1) both}
.rs-grid{background-image:linear-gradient(to right,rgba(11,61,145,.055) 1px,transparent 1px),linear-gradient(to bottom,rgba(11,61,145,.055) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%);mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%)}
.ns-section{padding-block:clamp(4.5rem,8vw,7rem)}
.ns-container{width:min(100% - 2rem,78rem);margin-inline:auto}
.ns-card{border:1px solid rgba(11,61,145,.10);box-shadow:0 12px 40px rgba(15,43,76,.07),inset 0 1px rgba(255,255,255,.9)}
.ns-card:hover{box-shadow:0 22px 54px rgba(15,43,76,.13)}
.ns-image{border:6px solid rgba(255,255,255,.85);box-shadow:0 24px 70px rgba(11,61,145,.17)}
.ns-nav{background:rgba(255,255,255,.92);border-bottom:1px solid rgba(11,61,145,.08);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.ns-nav-link{border-radius:999px;padding:.55rem .7rem;transition:background .2s,color .2s}
.ns-nav-link:hover,.ns-nav-link:focus-visible{background:var(--mist);color:var(--deep)}
.ns-reveal{transition:opacity .7s ease,transform .7s ease,filter .7s ease}
.ns-project{aspect-ratio:4/3}
@media(max-width:639px){.ns-project{aspect-ratio:5/4}.ns-hero-stats{gap:.25rem;padding:.75rem}.ns-hero-stats p:first-child{font-size:1.4rem}.ns-mobile-menu{max-height:calc(100dvh - 75px);overflow-y:auto}}

/* Neerajspace visual system */
@keyframes ns-nav-enter{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes ns-item-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes ns-aura{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(3%,-4%,0) scale(1.1)}}
.ns-nav{isolation:isolate;animation:ns-nav-enter .65s cubic-bezier(.2,.75,.2,1) both;background:rgba(255,255,255,.78);border-bottom:1px solid rgba(255,255,255,.85);box-shadow:0 5px 24px rgba(11,61,145,.045);backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);transition:background .3s,box-shadow .3s}
.ns-nav.is-scrolled{background:rgba(255,255,255,.94);box-shadow:0 12px 35px rgba(11,61,145,.10)}
.ns-brand-mark{display:grid;place-items:center;width:40px;height:40px;border-radius:14px;background:linear-gradient(145deg,#0b3d91 10%,#1d6fd6 65%,#38bdf8);box-shadow:0 7px 18px rgba(11,61,145,.22),inset 0 1px rgba(255,255,255,.3);transition:transform .3s,box-shadow .3s}
.ns-brand:hover .ns-brand-mark{transform:rotate(-8deg) scale(1.06);box-shadow:0 10px 24px rgba(11,61,145,.28)}
.ns-brand-mark-inner{font-size:22px;font-weight:900;line-height:1;color:white;font-family:Georgia,serif;font-style:italic}
.ns-desktop-nav{padding:5px;border:1px solid rgba(11,61,145,.07);border-radius:100px;background:rgba(241,247,252,.7)}
.ns-nav-link{white-space:nowrap;position:relative;padding:10px 11px;border-radius:100px;color:rgba(23,43,77,.75);font-size:12px;font-weight:700;transition:background .25s,color .25s,box-shadow .25s,transform .25s}
.ns-nav-link:hover{background:white;color:#0b3d91;transform:translateY(-1px)}
.ns-nav-link.is-active{background:white;color:#0b3d91;box-shadow:0 4px 13px rgba(11,61,145,.1)}
.ns-nav-cta{background:linear-gradient(110deg,#0b3d91,#1765c0 68%,#38bdf8)}
.ns-menu-button{transition:background .3s,transform .3s,border-color .3s}.ns-menu-button:hover{background:#e7f4fe;transform:translateY(-2px)}
.ns-menu-button.is-open{background:#0b3d91;color:white}
.ns-menu-lines{position:relative;display:block;width:20px;height:18px}.ns-menu-lines span{position:absolute;left:0;width:20px;height:2px;border-radius:2px;background:currentColor;transform-origin:center;transition:top .35s cubic-bezier(.2,.75,.2,1),transform .35s cubic-bezier(.2,.75,.2,1),opacity .2s}
.ns-menu-lines span:nth-child(1){top:2px}.ns-menu-lines span:nth-child(2){top:8px;width:15px}.ns-menu-lines span:nth-child(3){top:14px}
.ns-menu-button.is-open .ns-menu-lines span:nth-child(1){top:8px;transform:rotate(45deg)}.ns-menu-button.is-open .ns-menu-lines span:nth-child(2){opacity:0;transform:translateX(10px)}.ns-menu-button.is-open .ns-menu-lines span:nth-child(3){top:8px;transform:rotate(-45deg)}
.ns-menu-backdrop{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .35s,visibility .35s}.ns-menu-backdrop.is-open{opacity:1;visibility:visible;pointer-events:auto}
.ns-mobile-panel{max-height:min(74dvh,670px);overscroll-behavior:contain;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-14px) scale(.97);transform-origin:top center;transition:opacity .38s cubic-bezier(.2,.75,.2,1),transform .38s cubic-bezier(.2,.75,.2,1),visibility .38s}
.ns-mobile-panel.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0) scale(1)}
.ns-mobile-link{transition:background .25s,color .25s,transform .25s}.ns-mobile-link:hover{background:#fff;color:#0b3d91;transform:translateX(3px)}
.ns-mobile-panel.is-open .ns-mobile-link{animation:ns-item-enter .5s cubic-bezier(.2,.75,.2,1) both;animation-delay:calc(var(--item,7) * 35ms + 100ms)}
.ns-hero{isolation:isolate;background:radial-gradient(circle at 82% 18%,rgba(56,189,248,.19),transparent 30%),radial-gradient(circle at 4% 82%,rgba(11,61,145,.10),transparent 30%),linear-gradient(160deg,#f1f7fc,#fff 72%)}
.ns-hero::before{content:'';position:absolute;top:-120px;right:-10%;width:min(60vw,800px);aspect-ratio:1;border:1px solid rgba(56,189,248,.14);border-radius:50%;pointer-events:none}
.ns-eyebrow{border:1px solid rgba(56,189,248,.35);letter-spacing:.13em;text-transform:uppercase}
.ns-hero-stats{box-shadow:0 20px 55px rgba(11,61,145,.10),inset 0 1px #fff;position:relative;overflow:hidden}
.ns-hero-stats::before{content:'';position:absolute;left:0;top:0;height:3px;width:100%;background:linear-gradient(90deg,#0b3d91,#38bdf8,transparent)}
.ns-hero-stats>div:not(:first-child){border-left:1px solid rgba(11,61,145,.1);padding-left:clamp(.35rem,1vw,1.1rem)}
.ns-image{border:7px solid rgba(255,255,255,.94);box-shadow:0 30px 80px rgba(11,61,145,.2),0 0 0 1px rgba(56,189,248,.12);filter:saturate(1.05)}
.ns-mist-section{background:radial-gradient(circle at 90% 0,rgba(56,189,248,.08),transparent 28%),#f1f7fc}
.ns-white-section{background-image:radial-gradient(circle at 2% 0,rgba(56,189,248,.045),transparent 26%)}
.ns-card{position:relative;isolation:isolate;border:1px solid rgba(11,61,145,.09);box-shadow:0 12px 40px rgba(15,43,76,.06),inset 0 1px white;transition:transform .3s,box-shadow .3s,border-color .3s}
.ns-card::before{content:'';position:absolute;inset:0;border-radius:inherit;z-index:-1;pointer-events:none;background:linear-gradient(135deg,rgba(56,189,248,.12),transparent 48%);opacity:0;transition:opacity .3s}
.ns-card:hover::before{opacity:1}.ns-card:hover{border-color:rgba(56,189,248,.4);box-shadow:0 22px 55px rgba(11,61,145,.13)}
.ns-why{background:radial-gradient(circle at 12% 14%,rgba(56,189,248,.22),transparent 28%),radial-gradient(circle at 92% 90%,rgba(56,189,248,.12),transparent 27%),#0b3d91}
.ns-why-card{border:1px solid rgba(255,255,255,.18);box-shadow:inset 0 1px rgba(255,255,255,.12),0 16px 40px rgba(0,18,67,.08);transition:transform .3s,background .3s,box-shadow .3s}
.ns-why-card:hover{transform:translateY(-5px);background:rgba(255,255,255,.16);box-shadow:0 22px 45px rgba(0,18,67,.15)}
.ns-project{box-shadow:0 20px 50px rgba(11,61,145,.13)}.ns-project:hover{box-shadow:0 28px 65px rgba(11,61,145,.22)}
.ns-cta{background:radial-gradient(circle at 85% 20%,rgba(56,189,248,.3),transparent 32%),linear-gradient(130deg,#0b3d91,#1765c0)}
@media(max-width:1279px){.ns-nav-link{padding:9px 8px;font-size:11px}}
@media(max-width:1023px){.ns-nav{z-index:50}.ns-nav-inner{min-height:68px}}
@media(max-width:639px){.ns-brand-mark{width:36px;height:36px;border-radius:12px}.ns-mobile-panel{max-height:calc(100dvh - 92px)}.ns-hero-stats>div:not(:first-child){padding-left:.4rem}.ns-hero-stats p:first-child{font-size:clamp(1.2rem,6vw,1.5rem)}.ns-image{border-width:5px}}
@media(prefers-reduced-motion:reduce){.ns-nav,.ns-mobile-panel.is-open .ns-mobile-link{animation:none!important}.ns-menu-button,.ns-menu-lines span,.ns-mobile-panel,.ns-menu-backdrop,.ns-card,.ns-card::before,.ns-why-card,.ns-brand-mark{transition-duration:.01ms!important}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.rs-float,.rs-float2,.rs-shine,.rs-marq,.rs-blob,.rs-ring,.rs-in{animation:none!important}.ns-reveal{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}*{scroll-behavior:auto!important}}
`



/* ---------- HOOKS ---------- */

function useInView(threshold = 0.12) {

  const ref = useRef(null)

  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {

    const el = ref.current

    if (!el) return

    if (typeof IntersectionObserver === 'undefined') { setOn(true); return }
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

      className={`ns-reveal transition-all duration-1000 ease-[cubic-bezier(.2,.7,.2,1)] ${on ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0' : hidden[from]} ${className}`}>

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

  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} className={className} style={style} />

}



const Btn = ({ href = '#contact', children, ghost }) => (

  <a href={href} className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-sky/30 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full ${ghost ? 'border border-deep/25 bg-white text-deep hover:border-deep hover:shadow-soft' : 'bg-deep text-white shadow-soft hover:bg-[#0a3278] hover:shadow-lift'}`}>

    <span className="relative">{children}</span>

    <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>

  </a>

)



const Head = ({ tag, title, text, center = true }) => (

  <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>

    {tag && <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[.2em] text-sky"><span className="h-px w-8 bg-sky" />{tag}<span className="h-px w-8 bg-sky" /></p>}

    <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.15] tracking-tight text-deep">{title}</h2>

    <div className={`mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-deep to-sky ${center ? 'mx-auto' : ''}`} />

    {text && <p className="mt-5 leading-relaxed text-ink/70">{text}</p>}

  </Reveal>

)



/* 3D tilt + spotlight wrapper for cards */

function Tilt({ children, className = '', max = 3 }) {

  const ref = useRef(null)

  const [s, setS] = useState({ x: 0, y: 0, mx: 0, my: 0, h: false })

  const move = (e) => {

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return
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
  const [active, setActive] = useState('home')
  const menuButton = useRef(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const sections = nav.map(([, id]) => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-22% 0px -65% 0px', threshold: [0, .1, .3] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    const closeOnResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnResize)
    }
  }, [open])

  const closeMenu = () => setOpen(false)
  return (
    <>
      <div className={`ns-menu-backdrop fixed inset-0 z-40 bg-ink/35 backdrop-blur-[5px] lg:hidden ${open ? 'is-open' : ''}`} onClick={closeMenu} aria-hidden="true" />
      <header className={`ns-nav sticky top-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="ns-nav-inner mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:py-3.5">
          <a href="#home" onClick={closeMenu} className="ns-brand group inline-flex shrink-0 items-center gap-2.5" aria-label="Neerajspace home">
            <span aria-hidden="true" className="ns-brand-mark"><span className="ns-brand-mark-inner">N</span></span>
            <span className="text-xl font-extrabold tracking-[-.055em] text-deep sm:text-[1.55rem]">Neeraj<span className="text-sky">space</span><span className="text-sky">.</span></span>
          </a>
          <nav aria-label="Main navigation" className="ns-desktop-nav hidden items-center gap-0.5 lg:flex">
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'page' : undefined} className={`ns-nav-link ${active === id ? 'is-active' : ''}`}>{label}</a>
            ))}
          </nav>
          <a href="#contact" className="ns-nav-cta hidden shrink-0 items-center gap-2 rounded-full bg-deep px-5 py-3 text-[13px] font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift xl:inline-flex">Let's Talk <span aria-hidden="true">↗</span></a>
          <button ref={menuButton} type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className={`ns-menu-button relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-deep/10 bg-mist text-deep lg:hidden ${open ? 'is-open' : ''}`}>
            <span className="ns-menu-lines" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
        <div id="mobile-navigation" aria-hidden={!open} className={`ns-mobile-panel absolute left-4 right-4 top-full mt-2 overflow-y-auto rounded-[26px] border border-white/90 bg-white/95 p-2 shadow-lift backdrop-blur-2xl lg:hidden ${open ? 'is-open' : ''}`}>
          <div className="rounded-[21px] bg-gradient-to-br from-mist via-white to-sky/10 p-3">
            <p className="px-3 pb-2 pt-1 text-[11px] font-extrabold uppercase tracking-[.2em] text-deep/50">Explore Neerajspace</p>
            {nav.map(([label, id], index) => (
              <a key={id} href={`#${id}`} onClick={closeMenu} tabIndex={open ? 0 : -1} style={{ '--item': index }} className={`ns-mobile-link flex items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold ${active === id ? 'bg-white text-deep shadow-soft' : 'text-ink/80'}`}>
                <span>{label}</span><span className="text-sky" aria-hidden="true">↗</span>
              </a>
            ))}
            <a href="#contact" onClick={closeMenu} tabIndex={open ? 0 : -1} className="ns-mobile-link mt-3 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-deep via-[#1765c0] to-sky px-5 text-sm font-bold text-white shadow-lift">Get a Free Consultation <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </header>
    </>
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

      <Img src={IMG.living} alt="Design inspiration reference" className="absolute inset-0 h-full w-full object-cover" />

      <Img src={IMG.small} alt="Existing space reference" className="absolute inset-0 h-full w-full object-cover"

        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, filter: 'grayscale(1) brightness(.7) contrast(.9)' }} />

      <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">EXISTING</span>

      <span className="absolute right-4 top-4 rounded-full bg-sky px-4 py-1.5 text-xs font-semibold text-white">INSPIRATION</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lift" style={{ left: `${pos}%` }}>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

          <span className="rs-ring absolute inset-0 rounded-full bg-white" />

          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-deep shadow-lift">⇄</div>

        </div>

      </div>

      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Compare existing space and design inspiration"

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
  const sendRequest = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const details = ['name', 'phone', 'email', 'project', 'size', 'requirements'].map((key) => `${key[0].toUpperCase() + key.slice(1)}: ${data.get(key) || '—'}`).join('\n')
    window.location.href = `mailto:Neerajkuamr977376@gmail.com?subject=${encodeURIComponent('Neerajspace project enquiry')}&body=${encodeURIComponent(details)}`
    setSent(true)
  }

  const f = 'w-full rounded-xl border border-deep/15 bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:-translate-y-0.5 focus:border-sky focus:shadow-soft focus:ring-4 focus:ring-sky/20'

  return (

    <section id="contact" className="ns-section ns-mist-section relative overflow-hidden bg-mist">

      <div className="rs-blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-5">

        <Reveal className="lg:col-span-2" from="left">

          <h2 className="text-3xl font-semibold text-deep sm:text-4xl lg:text-[2.75rem]">Let's Plan Your Space.</h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-deep to-sky" />

          <p className="mt-5 leading-relaxed text-ink/70">Have a room that needs a makeover or a building that needs better space planning? Tell us what you're looking for.</p>

          <ul className="mt-8 space-y-4 font-medium text-deep">

            {[['📞', '+91 9773768835', 'tel:+919773768835'], ['✉️', 'Neerajkuamr977376@gmail.com', 'mailto:Neerajkuamr977376@gmail.com'], ['📍', 'New Delhi, India', null]].map(([ic, t, href]) => (

              <li key={t} className="group flex min-w-0 items-center gap-4">

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">{ic}</span>
                {href ? <a href={href} className="min-w-0 break-all hover:text-sky sm:break-normal">{t}</a> : <span>{t}</span>}

              </li>

            ))}

          </ul>

        </Reveal>

        <Reveal className="lg:col-span-3" delay={100} from="right">

          {sent ? (

            <div className="rs-in rounded-3xl bg-white p-10 text-center shadow-lift">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky/15 text-3xl text-sky">✓</div>

              <p className="mt-4 text-xl font-semibold text-deep">Your email draft is ready.</p>

              <p className="mt-2 text-ink/70">Send the prepared email in your mail app to complete your request.</p>

            </div>

          ) : (

            <form onSubmit={sendRequest} className="grid gap-4 rounded-3xl bg-white p-6 shadow-lift ring-1 ring-deep/5 sm:grid-cols-2 sm:p-8">

              <input required name="name" autoComplete="name" aria-label="Full name" className={f} placeholder="Full Name" />

              <input required name="phone" type="tel" autoComplete="tel" aria-label="Phone number" className={f} placeholder="Phone Number" />

              <input required name="email" type="email" autoComplete="email" aria-label="Email address" className={`${f} sm:col-span-2`} placeholder="Email Address" />

              <select required name="project" defaultValue="" aria-label="Project type" className={f}>

                <option value="" disabled>Project Type</option>

                {['Living Room', 'Bedroom', 'Home Office', 'Kitchen', 'Small Space', 'Commercial Space', 'Full Building'].map((o) => <option key={o}>{o}</option>)}

              </select>

              <input name="size" aria-label="Space size" className={f} placeholder="Space Size (e.g. 12 x 14 ft)" />

              <textarea name="requirements" aria-label="Your requirements" rows="4" className={`${f} sm:col-span-2`} placeholder="Your Requirements" />

              <button className="group relative overflow-hidden rounded-full bg-deep px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift active:scale-95 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full sm:col-span-2"><span className="relative">Prepare Email Request →</span></button>

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

        <section id="home" onMouseMove={onHeroMove} onMouseLeave={() => setPar({ x: 0, y: 0 })} className="ns-hero relative overflow-hidden bg-gradient-to-b from-mist to-white">

          <div className="rs-grid pointer-events-none absolute inset-0" />

          <div className="rs-blob pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-sky/25 blur-3xl" />

          <div className="rs-blob pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-deep/15 blur-3xl" style={{ animationDelay: '-6s' }} />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-28">

            <div>

              <span className="ns-eyebrow rs-in inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-deep shadow-soft ring-1 ring-sky/30 backdrop-blur">

                <span className="relative flex h-2 w-2"><span className="rs-ring absolute inset-0 rounded-full bg-sky" /><span className="relative h-2 w-2 rounded-full bg-sky" /></span>

                SMART SPACE • BETTER LIVING

              </span>

              <h1 className="rs-in mt-6 max-w-2xl text-[clamp(2.55rem,5vw,4.65rem)] font-extrabold leading-[1.08] tracking-[-.045em] text-deep" style={{ animationDelay: '.15s' }}>

                Transform Your Space Into a{' '}

                <span className="rs-shine bg-gradient-to-r from-deep via-sky to-deep bg-clip-text text-transparent">Place You'll Love.</span>

              </h1>

              <p className="rs-in mt-6 max-w-xl leading-relaxed text-ink/70" style={{ animationDelay: '.3s' }}>Make the most of every room with smart space planning, modern design and practical solutions tailored to your lifestyle. We help you turn empty, unused or outdated spaces into beautiful and functional interiors.</p>

              <div className="rs-in mt-8 flex flex-wrap gap-4" style={{ animationDelay: '.45s' }}><Btn>Start Your Project</Btn><Btn href="#services" ghost>Explore Our Services</Btn></div>

              <div className="ns-hero-stats rs-in mt-10 grid max-w-lg grid-cols-3 gap-4 rounded-2xl border border-white/80 bg-white/75 p-5 shadow-soft ring-1 ring-deep/5 backdrop-blur-xl" style={{ animationDelay: '.6s' }}>

                {[[150, '+', 'Spaces Transformed'], [50, '+', 'Happy Clients'], [5, '+', 'Years Experience']].map(([n, s, l]) => (

                  <div key={l}><p className="text-3xl font-bold text-deep"><Counter value={n} suffix={s} /></p><p className="mt-1 text-xs text-ink/60">{l}</p></div>

                ))}

              </div>

            </div>



            <Reveal delay={150} from="zoom" className="relative">

              <div className="pointer-events-none absolute -inset-3 rounded-[36px] border border-sky/30" />

              <div style={{ transform: `translate(${par.x * -14}px, ${par.y * -14}px) scale(1.02)`, transition: 'transform .3s ease-out' }}>

                <Img src={IMG.hero} alt="Modern living room interior" className="ns-image relative aspect-[4/4.2] w-full rounded-[30px] object-cover sm:aspect-[5/4] lg:aspect-[4/4.6]" />

              </div>

              <div className="rs-float absolute -bottom-6 left-2 rounded-2xl border border-white bg-white/90 p-3 shadow-lift backdrop-blur-xl sm:-left-5 sm:p-4">

                <p className="text-2xl font-bold text-deep"><Counter value={150} suffix="+" /></p><p className="text-xs text-ink/60">Spaces transformed</p>

              </div>

              <div className="rs-float2 absolute right-2 top-5 flex items-center gap-2 rounded-2xl border border-white bg-white/90 p-2.5 shadow-lift backdrop-blur-xl sm:-right-5 sm:gap-3 sm:p-3">

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

        <section className="ns-section ns-white-section">

          <div className="mx-auto max-w-7xl px-5">

            <Head title="Is Your Space Not Working For You?" text="A room doesn't have to be bigger to feel better. With the right planning and design, even a small or unused space can become comfortable, organized and highly functional." />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {problems.map((p, i) => (

                <Reveal key={p} delay={i * 80} from={i % 2 ? 'right' : 'left'}>

                  <div className="ns-card group flex h-full items-center gap-4 rounded-2xl bg-white p-5 transition duration-300 hover:-translate-y-1.5 hover:border-sky/50 hover:shadow-lift">

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mist font-bold text-sky transition duration-300 group-hover:rotate-[360deg] group-hover:bg-deep group-hover:text-white">!</span>

                    <span className="font-medium text-deep">{p}</span>

                  </div>

                </Reveal>

              ))}

            </div>

          </div>

        </section>



        {/* About */}

        <section id="about" className="ns-section ns-mist-section relative overflow-hidden bg-mist">

          <div className="rs-blob pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">

            <Reveal from="left" className="relative">

              <div className="absolute -bottom-3 right-0 h-full w-full rounded-3xl border-2 border-sky/40 sm:-right-3" />

              <Img src={IMG.about} alt="Designed home exterior and interior" className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />

              <div className="rs-float absolute -bottom-5 left-4 rounded-2xl bg-deep px-4 py-3 text-white shadow-lift sm:left-6 sm:px-5 sm:py-4">

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

        <section id="services" className="ns-section ns-white-section">

          <div className="mx-auto max-w-7xl px-5">

            <Head title="Everything You Need to Make Your Space Better." text="From planning and design to final execution, we provide complete solutions for transforming your space." />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {services.map(([ic, t, d], i) => (

                <Reveal key={t} delay={i * 80} from="zoom">

                  <Tilt className="ns-card group h-full rounded-3xl bg-white p-7 transition-shadow duration-300 hover:border-sky/40 hover:shadow-lift">

                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-2xl transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-sky/20">{ic}</span>

                    <h3 className="mt-5 text-lg font-semibold text-deep">{t}</h3>

                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{d}</p>

                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-deep transition duration-300 group-hover:translate-x-1">Thoughtful design →</span>

                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-deep to-sky transition-all duration-500 group-hover:w-full" />

                  </Tilt>

                </Reveal>

              ))}

            </div>

          </div>

        </section>



        {/* Why */}

        <section className="ns-section ns-why relative overflow-hidden bg-deep text-white">

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

                  <Tilt className="ns-why-card group h-full rounded-3xl bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur transition duration-300 hover:bg-white/15 hover:ring-sky/50" max={6}>

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

        <section id="how" className="ns-section ns-white-section">

          <div className="mx-auto max-w-7xl px-5">

            <Head title="From Empty Space to Your Dream Space." />

            <div className="relative mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

              {steps.map(([t, d], i) => (

                <Reveal key={t} delay={i * 90}>

                  <div className="group relative h-full rounded-3xl bg-mist p-6 pt-10 sm:p-7 sm:pt-10 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-lift hover:ring-1 hover:ring-sky/40">

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

        <section id="projects" className="ns-section ns-mist-section bg-mist">

          <div className="mx-auto max-w-7xl px-5">

            <Head tag="OUR WORK" title="Spaces We've Transformed" text="Explore some of our recent space planning and interior transformation projects." />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {projects.map(([t, src], i) => (

                <Reveal key={t} delay={i * 80} from="zoom">

                  <div className="ns-project group relative overflow-hidden rounded-3xl border-[5px] border-white shadow-soft transition duration-500 hover:shadow-lift">

                    <Img src={src} alt={t} className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1" />

                    <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/10 to-transparent transition-opacity duration-500 group-hover:from-deep/95" />

                    

                    <div className="absolute bottom-5 left-5 right-5 translate-y-3 transition duration-500 group-hover:translate-y-0">

                      <p className="text-lg font-semibold text-white">{t}</p>

                      <span className="mt-2 block h-0.5 w-8 bg-sky transition-all duration-500 group-hover:w-20" />

                    </div>

                  </div>

                </Reveal>

              ))}

            </div>

            

          </div>

        </section>



        {/* Before / After */}

        <section className="ns-section ns-white-section">

          <div className="mx-auto max-w-5xl px-5">

            <Head title="Explore the Difference Thoughtful Design Makes." text="A well-designed space isn't only about appearance. It's about creating better movement, better organization and better everyday living." />

            <Reveal className="mt-12" from="zoom"><BeforeAfter /><p className="mt-4 text-center text-xs text-ink/60">Illustrative comparison of two reference spaces; images are not from the same project.</p></Reveal>

            

          </div>

        </section>



        {/* Testimonials */}

        <section id="testimonials" className="ns-section ns-mist-section relative overflow-hidden bg-mist">

          <div className="pointer-events-none absolute left-6 top-6 select-none text-[14rem] font-bold leading-none text-sky/10">“</div>

          <div className="relative mx-auto max-w-7xl px-5">

            <Head title="What Our Clients Say" />

            <div className="mt-12 grid gap-6 md:grid-cols-3">

              {reviews.map(([q, n, r], i) => (

                <Reveal key={n} delay={i * 100}>

                  <figure className="ns-card group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-lift">

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

        <section className="ns-section ns-white-section">

          <div className="mx-auto max-w-7xl px-5"><Head title="Frequently Asked Questions" /><Faq /></div>

        </section>



        {/* CTA */}

        <section className="px-5 pb-24">

          <Reveal from="zoom" className="ns-cta relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-deep to-[#1565c0] px-6 py-20 text-center text-white shadow-lift sm:px-12">

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

            <div><p className="text-xl font-bold text-white">Neeraj<span className="text-sky">space</span></p><p className="mt-2 text-sm">Smart Spaces. Better Living.</p></div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">

              {[['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Projects', '#projects'], ['Contact', '#contact']].map(([n, h]) => <li key={n}><a href={h} className="transition hover:text-sky">{n}</a></li>)}

            </ul>

          </div>

          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row">

            <p>© {new Date().getFullYear()} Neerajspace. All rights reserved.</p>

            <a href="mailto:Neerajkuamr977376@gmail.com" className="break-all transition hover:text-sky">Email Neerajspace</a>

          </div>

        </div>

      </footer>

    </>

  )

}