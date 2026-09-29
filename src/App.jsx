import React from 'react'

import { useEffect, useRef, useState } from 'react'

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

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect() } }, { threshold: 0.12 })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </div>
  )
}

function Img({ src, alt, className = '', style }) {
  const [bad, setBad] = useState(false)
  if (bad) return <div className={`bg-gradient-to-br from-sky/40 to-deep/70 ${className}`} style={style} role="img" aria-label={alt} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} style={style} />
}

const Btn = ({ href = '#contact', children, ghost }) => (
  <a href={href} className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${ghost ? 'border border-deep/25 bg-white text-deep hover:border-deep hover:shadow-soft' : 'bg-deep text-white shadow-soft hover:bg-[#0a3278] hover:shadow-lift'}`}>{children}</a>
)

const Head = ({ tag, title, text, center = true }) => (
  <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    {tag && <p className="mb-3 text-sm font-semibold tracking-wide text-sky">{tag}</p>}
    <h2 className="text-3xl font-semibold leading-tight text-deep sm:text-4xl">{title}</h2>
    {text && <p className="mt-4 leading-relaxed text-ink/70">{text}</p>}
  </Reveal>
)

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? 'bg-white/85 shadow-soft backdrop-blur-md' : 'bg-white'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#home" className="text-xl font-bold tracking-tight text-deep">ROOM<span className="text-sky">SPACE</span></a>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([n, id]) => <a key={id} href={`#${id}`} className="text-sm font-medium text-ink/70 transition hover:text-deep">{n}</a>)}
        </nav>
        <div className="hidden lg:block"><Btn>Get a Free Consultation</Btn></div>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-xl p-2 text-deep lg:hidden">
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M6 6l14 14M20 6L6 20" /> : <path d="M4 8h18M4 13h18M4 18h18" />}</svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-mist bg-white px-5 pb-6 lg:hidden">
          {nav.map(([n, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-mist py-3 font-medium text-ink/80">{n}</a>)}
          <div className="mt-4"><Btn>Get a Free Consultation</Btn></div>
        </div>
      )}
    </header>
  )
}

function BeforeAfter() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lift">
      <Img src={IMG.living} alt="After: redesigned living room" className="absolute inset-0 h-full w-full object-cover" />
      <Img src={IMG.living} alt="Before: cluttered living room" className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, filter: 'grayscale(1) brightness(.7) contrast(.9)' }} />
      <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-semibold text-white">BEFORE</span>
      <span className="absolute right-4 top-4 rounded-full bg-sky px-4 py-1.5 text-xs font-semibold text-white">AFTER</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-deep shadow-lift">⇄</div>
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
        <Reveal key={q} delay={k * 60}>
          <div className="rounded-2xl bg-white shadow-soft">
            <button onClick={() => setI(i === k ? -1 : k)} aria-expanded={i === k} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-deep">
              {q}<span className={`text-2xl leading-none text-sky transition-transform duration-300 ${i === k ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`grid transition-all duration-300 ${i === k ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden px-5 text-ink/70"><span className="block pb-5 leading-relaxed">{a}</span></p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const f = 'w-full rounded-xl border border-deep/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20'
  return (
    <section id="contact" className="bg-mist py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <h2 className="text-3xl font-semibold text-deep sm:text-4xl">Let's Plan Your Space.</h2>
          <p className="mt-4 leading-relaxed text-ink/70">Have a room that needs a makeover or a building that needs better space planning? Tell us what you're looking for.</p>
          <ul className="mt-8 space-y-4 font-medium text-deep">
            <li>📞 +91 XXX XXX XXXX</li><li>✉️ hello@roomspace.com</li><li>📍 New Delhi, India</li>
          </ul>
        </Reveal>
        <Reveal className="lg:col-span-3" delay={100}>
          {sent ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-soft">
              <p className="text-xl font-semibold text-deep">Request received.</p>
              <p className="mt-2 text-ink/70">Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="grid gap-4 rounded-3xl bg-white p-6 shadow-soft sm:grid-cols-2 sm:p-8">
              <input required className={f} placeholder="Full Name" />
              <input required type="tel" className={f} placeholder="Phone Number" />
              <input required type="email" className={`${f} sm:col-span-2`} placeholder="Email Address" />
              <select required defaultValue="" className={f}>
                <option value="" disabled>Project Type</option>
                {['Living Room', 'Bedroom', 'Home Office', 'Kitchen', 'Small Space', 'Commercial Space', 'Full Building'].map((o) => <option key={o}>{o}</option>)}
              </select>
              <input className={f} placeholder="Space Size (e.g. 12 x 14 ft)" />
              <textarea rows="4" className={`${f} sm:col-span-2`} placeholder="Your Requirements" />
              <button className="rounded-full bg-deep px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:col-span-2">Submit Project Request</button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section id="home" className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
            <Reveal>
              <span className="inline-block rounded-full bg-sky/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-deep">SMART SPACE • BETTER LIVING</span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-deep sm:text-5xl lg:text-6xl">Transform Your Space Into a Place You'll Love.</h1>
              <p className="mt-6 max-w-xl leading-relaxed text-ink/70">Make the most of every room with smart space planning, modern design and practical solutions tailored to your lifestyle. We help you turn empty, unused or outdated spaces into beautiful and functional interiors.</p>
              <div className="mt-8 flex flex-wrap gap-4"><Btn>Start Your Project</Btn><Btn href="#services" ghost>Explore Our Services</Btn></div>
              <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
                {[['150+', 'Spaces Transformed'], ['50+', 'Happy Clients'], ['5+', 'Years Experience']].map(([n, l]) => (
                  <div key={l}><p className="text-3xl font-bold text-deep">{n}</p><p className="mt-1 text-xs text-ink/60">{l}</p></div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150} className="relative">
              <Img src={IMG.hero} alt="Modern living room interior" className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-lift sm:aspect-[5/4]" />
              <div className="floaty absolute -bottom-5 -left-3 rounded-2xl bg-white/90 p-4 shadow-lift backdrop-blur sm:-left-8">
                <p className="text-2xl font-bold text-deep">150+</p><p className="text-xs text-ink/60">Spaces transformed</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Problems */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Head title="Is Your Space Not Working For You?" text="A room doesn't have to be bigger to feel better. With the right planning and design, even a small or unused space can become comfortable, organized and highly functional." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((p, i) => (
                <Reveal key={p} delay={i * 70}>
                  <div className="flex items-center gap-4 rounded-2xl border border-deep/10 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mist font-bold text-sky">!</span>
                    <span className="font-medium text-deep">{p}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-mist py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
            <Reveal><Img src={IMG.about} alt="Designed home exterior and interior" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" /></Reveal>
            <Reveal delay={120}>
              <p className="mb-3 text-sm font-semibold tracking-wide text-sky">WHO WE ARE</p>
              <h2 className="text-3xl font-semibold leading-tight text-deep sm:text-4xl">We Create More Possibilities From Every Square Foot.</h2>
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
                <Reveal key={t} delay={i * 70}>
                  <div className="group h-full rounded-3xl border border-deep/10 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-2xl transition group-hover:scale-110 group-hover:bg-sky/20">{ic}</span>
                    <h3 className="mt-5 text-lg font-semibold text-deep">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="bg-deep py-24 text-white">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Designed Around You. Built Around Your Needs.</h2></Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {why.map(([t, d], i) => (
                <Reveal key={t} delay={i * 70}>
                  <div className="h-full rounded-3xl bg-white/10 p-7 ring-1 ring-white/15 transition duration-300 hover:bg-white/15">
                    <p className="text-3xl font-bold text-sky">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Head title="From Empty Space to Your Dream Space." />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map(([t, d], i) => (
                <Reveal key={t} delay={i * 70}>
                  <div className="relative h-full rounded-3xl bg-mist p-7 pt-10">
                    <span className="absolute -top-5 left-7 flex h-11 w-11 items-center justify-center rounded-full bg-deep font-semibold text-white shadow-soft">{i + 1}</span>
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
                <Reveal key={t} delay={i * 70}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
                    <Img src={src} alt={t} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-transparent to-transparent" />
                    <p className="absolute bottom-5 left-5 text-lg font-semibold text-white">{t}</p>
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
            <Reveal className="mt-12"><BeforeAfter /></Reveal>
            <div className="mt-10 text-center"><Btn href="#projects" ghost>See More Transformations</Btn></div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Head title="What Our Clients Say" />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reviews.map(([q, n, r], i) => (
                <Reveal key={n} delay={i * 90}>
                  <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <p className="text-yellow-400" aria-label="5 stars">★★★★★</p>
                    <blockquote className="mt-4 flex-1 leading-relaxed text-ink/80">“{q}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-deep font-semibold text-white">{n[0]}</span>
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
          <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-deep to-[#1565c0] px-6 py-16 text-center text-white shadow-lift sm:px-12">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky/30 blur-3xl" />
            <p className="relative text-sm font-semibold tracking-wide text-sky">READY TO TRANSFORM YOUR SPACE?</p>
            <h2 className="relative mx-auto mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">Your Space Has More Potential. Let's Unlock It.</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">Tell us about your room, building or workspace and discover how smart planning can turn it into something better.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <a href="#contact" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-deep transition hover:-translate-y-0.5 hover:shadow-lift">Get Free Consultation</a>
              <a href="#contact" className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10">Talk to Our Team</a>
            </div>
          </Reveal>
        </section>

        <Contact />
      </main>

      <footer className="bg-ink text-white/80">
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
