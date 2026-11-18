import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/scroll'
import { Coin, Label } from '../components/ui'
import { modules } from '../content'

export default function Modules() {
  const root = useRef(null)
  const [active, setActive] = useState(reducedMotion() ? modules.length - 1 : -1)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const piggy = root.current.querySelector('.piggy-img')
      const drop = () => {
        gsap.killTweensOf('.drop-coin, .piggy-img, .slot-ring')
        const tl = gsap.timeline()
        tl.fromTo('.drop-coin', { top: '-34%', autoAlpha: 1, scaleY: 1, rotationY: 0 },
          { top: '10.5%', rotationY: 720, duration: 0.85, ease: 'power2.in' })
          .to('.drop-coin', { scaleY: 0.12, autoAlpha: 0, duration: 0.16 })
          .fromTo('.slot-ring', { scale: 0.3, autoAlpha: 0.9 }, { scale: 1.7, autoAlpha: 0, duration: 0.7, ease: 'power2.out' }, '<')
          .to(piggy, { scaleY: 0.93, scaleX: 1.045, duration: 0.12, ease: 'power2.out', transformOrigin: '50% 100%' }, '<')
          .to(piggy, { scaleX: 1, scaleY: 1, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
      }

      root.current.querySelectorAll('.mod').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el, start: 'top 62%', end: 'bottom 62%',
          onEnter: () => { setActive(i); drop() },
          onEnterBack: () => setActive(i),
          onLeaveBack: () => setActive(i - 1),
        })
      })

      gsap.fromTo('.ghost', { xPercent: 12 }, {
        xPercent: -22, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.from('.piggy', { y: 60, opacity: 0, scale: 0.92, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  const n = String(Math.max(active, 0) + 1).padStart(2, '0')

  return (
    <section className="mods" id="modulos" ref={root}>
      <div className="ghost" aria-hidden="true">PATRIMÔNIO</div>
      <div className="mods-grid">
        <div className="scene">
          <figure className="piggy" aria-hidden="true">
            <img className="piggy-img" src="/img/cofre.webp" alt="" width="910" height="780" />
            <Coin className="drop-coin" />
            <i className="slot-ring" />
            <div className="pile">
              {modules.map((_, i) => <Coin key={i} className={i <= active ? 'on' : ''} style={{ '--i': i }} />)}
            </div>
          </figure>
          <p className="scene-count" aria-live="polite">
            <span className="mono">MÓDULO {active < 0 ? '00' : n} DE 06</span>
            <span className="dots">{modules.map((_, i) => <i key={i} className={i <= active ? 'on' : ''} />)}</span>
          </p>
        </div>

        <div className="list">
          <Label>O que você vai aprender</Label>
          <h2 className="h2 light" data-reveal>Uma jornada para transformar a realidade financeira da sua família.</h2>
          <p className="lead light" data-reveal>
            Ao longo de três meses, você será conduzida por uma jornada prática de desenvolvimento financeiro, com acompanhamento
            ao vivo e ferramentas para aplicar os conhecimentos na sua realidade.
          </p>
          {modules.map(([t, d], i) => (
            <article className={`mod ${i === active ? 'is-active' : ''} ${i < active ? 'is-past' : ''}`} key={t}>
              <span className="mod-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
