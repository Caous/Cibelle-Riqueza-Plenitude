import { Fragment, useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/scroll'
import { Button, Coin, Icon, Rosette } from '../components/ui'

const chips = [
  ['Orçamento', 'c1'],
  ['Metas', 'c2'],
  ['Reserva', 'c3'],
  ['Patrimônio', 'c4'],
]

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.05, delay: 0.15 })
      gsap.from('.hero-in', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.7 })
      gsap.from('.hero-arch', { clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)', duration: 1.3, ease: 'power3.inOut', delay: 0.2 })
      gsap.from('.chip', { scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(2)', stagger: 0.12, delay: 1.1 })
      gsap.to('.chip', { y: (i) => (i % 2 ? 10 : -10), duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.3 })
      gsap.set('.hero-thread', { transformOrigin: '50% 0' })
      gsap.fromTo('.hero-thread', { rotation: -3 }, { rotation: 3, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.hero .rosette', { rotation: 360, duration: 220, ease: 'none', repeat: -1 })

      const move = (e) => {
        const x = (e.clientX / innerWidth - 0.5) * 2
        const y = (e.clientY / innerHeight - 0.5) * 2
        gsap.to('.hero-arch-wrap', { x: x * 14, y: y * 10, duration: 1.2, ease: 'power3.out' })
        gsap.to('.hero .rosette', { x: x * -24, y: y * -18, duration: 1.6, ease: 'power3.out' })
      }
      window.addEventListener('pointermove', move)

      const como = document.getElementById('como')
      gsap.to('.hero-stage', {
        scale: 1.06, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: como, start: 'top bottom', end: 'top top', scrub: true },
      })
      gsap.to('.hero-coin', {
        y: 160, rotationY: 540, ease: 'none',
        scrollTrigger: { trigger: como, start: 'top bottom', end: 'top top', scrub: true },
      })
      return () => window.removeEventListener('pointermove', move)
    }, root)
    return () => ctx.revert()
  }, [])

  const words = 'Ajudo mulheres casadas a saírem do caos financeiro e construírem um futuro seguro e próspero para suas famílias.'.split(' ')

  return (
    <header className="hero" ref={root}>
      <div className="hero-stage">
        <Rosette className="rosette-hero" />
        <nav className="nav">
          <a className="logo" href="#top" aria-label="Riqueza & Plenitude">
            <span className="logo-name">Riqueza &amp; Plenitude</span>
            <span className="logo-sub">Mentoria · Cibelle Machado</span>
          </a>
          <a className="nav-link" href="#inscricao">Quero entrar na mentoria</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="label hero-in">Mentoria coletiva · exclusiva para mulheres casadas</p>
            <h1 className="hero-title">
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className="hero-mask"><span className="hero-word">{w}</span></span>{' '}
                </Fragment>
              ))}
            </h1>
            <p className="hero-sub hero-in">
              Uma jornada de transformação financeira familiar para você aprender a administrar o dinheiro com sabedoria,
              alinhar as decisões financeiras no casamento e construir patrimônio para o futuro da sua família.
            </p>
            <div className="hero-in">
              <Button>Quero transformar a vida financeira da minha família</Button>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-thread" aria-hidden="true">
              <i />
              <Coin className="hero-coin" />
            </div>
            <div className="hero-arch-wrap">
              <div className="hero-arch-line" />
              <div className="hero-arch">
                <div className="photo-slot">
                  <Icon name="UserRound" size={64} />
                  <b>Foto real da Cibelle</b>
                  <span>a fornecer pela cliente</span>
                </div>
              </div>
              {chips.map(([t, c]) => (
                <span className={`chip ${c}`} key={t}><i />{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
