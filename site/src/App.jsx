import { useEffect } from 'react'
import { gsap, ScrollTrigger, initScroll, reducedMotion } from './lib/scroll'
import Hero from './sections/Hero'
import Modules from './sections/Modules'
import { Como, Plano, Bonus, ParaQuem, Depoimentos, Quem, Experiencia, Investimento, Faq, Final, FloatingCta } from './sections/Sections'

export default function App() {
  useEffect(() => {
    const kill = initScroll()
    let ctx
    if (!reducedMotion()) {
      ctx = gsap.context(() => {
        gsap.set('[data-reveal]', { y: 40, opacity: 0 })
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%', once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true }),
        })
      })
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => { clearTimeout(t); ctx?.revert(); kill() }
  }, [])

  return (
    <div id="top">
      <Hero />
      <main>
        <Como />
        <Modules />
        <Plano />
        <Bonus />
        <ParaQuem />
        <Depoimentos />
        <Quem />
        <Experiencia />
        <Investimento />
        <Faq />
      </main>
      <Final />
      <FloatingCta />
    </div>
  )
}
