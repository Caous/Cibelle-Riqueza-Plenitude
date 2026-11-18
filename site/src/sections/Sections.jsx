import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/scroll'
import { Button, Coin, Icon, Label, Rosette } from '../components/ui'
import { benefits, plan, bonuses, profiles, deliverables, faq } from '../content'

export function Como() {
  return (
    <section className="sec sec-champagne curtain" id="como">
      <div className="wrap">
        <div className="split">
          <div>
            <Label dark>Como irei te ajudar</Label>
            <h2 className="h2" data-reveal>Sua família merece mais do que uma boa renda. Merece segurança, tranquilidade e um futuro planejado.</h2>
          </div>
          <div className="stack-text">
            <p className="lead" data-reveal>Você não precisa continuar vivendo com a sensação de que trabalha tanto, mas o dinheiro nunca é suficiente para realizar seus sonhos.</p>
            <p data-reveal>Na Mentoria Riqueza &amp; Plenitude, você vai aprender a assumir o protagonismo financeiro da sua família e transformar a maneira como administra, planeja e toma decisões sobre o dinheiro.</p>
          </div>
        </div>
        <div className="benefits">
          {benefits.map(([ic, t, d]) => (
            <article className="benefit" key={t} data-reveal>
              <span className="benefit-ic"><Icon name={ic} size={26} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <div className="center" data-reveal><Button variant="navy">Quero construir a segurança financeira da minha família</Button></div>
      </div>
    </section>
  )
}

export function Plano() {
  const root = useRef(null)
  useEffect(() => {
    if (reducedMotion()) { root.current.querySelectorAll('.tl-item').forEach((e) => e.classList.add('on', 'done')); return }
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.tl-item')
      gsap.fromTo('.tl-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.tl', start: 'top 60%', end: 'bottom 60%', scrub: true } })
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el, start: 'top 62%',
          onEnter: () => { el.classList.add('on'); items[i - 1]?.classList.add('done') },
          onLeaveBack: () => { el.classList.remove('on'); items[i - 1]?.classList.remove('done') },
        })
      })
      ScrollTrigger.create({
        trigger: '.tl-end', start: 'top 80%',
        onEnter: () => items[items.length - 1].classList.add('done'),
        onLeaveBack: () => items[items.length - 1].classList.remove('done'),
      })
      gsap.to('.plan-photo img', { yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.plan-photo', start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="sec sec-white curtain" ref={root}>
      <div className="wrap">
        <div className="plan-head">
          <figure className="plan-photo" data-reveal>
            <img src="/img/familia.webp" alt="Casal e dois filhos caminhando de mãos dadas por uma estrada ao pôr do sol" width="1000" height="1250" loading="lazy" />
          </figure>
          <div>
            <Label dark>O entregável central</Label>
            <h2 className="h2" data-reveal>Seu Plano de Segurança Financeira Familiar</h2>
            <p className="lead" data-reveal>Mais do que aprender sobre dinheiro, você vai construir um plano para o futuro da sua família.</p>
            <p data-reveal>A Mentoria Riqueza &amp; Plenitude não foi criada para entregar apenas conhecimento teórico. Ao longo da jornada, você desenvolverá seu próprio Plano de Segurança Financeira Familiar, construído de acordo com sua realidade, seus objetivos e suas prioridades.</p>
          </div>
        </div>
        <ol className="tl">
          <span className="tl-line" aria-hidden="true"><i className="tl-fill" /></span>
          {plan.map((t, i) => (
            <li className="tl-item" key={t}>
              <span className="tl-dot" aria-hidden="true"><Icon name="Check" size={16} /></span>
              <div className="tl-card"><b className="mono">{String(i + 1).padStart(2, '0')}</b><span>{t}</span></div>
            </li>
          ))}
        </ol>
        <div className="tl-end">
          <p className="lead" data-reveal>Ao final de cada módulo, você receberá atividades práticas e um plano de ação para transformar os conhecimentos adquiridos em decisões concretas.</p>
          <p data-reveal>O objetivo é que você termine a mentoria com clareza sobre sua realidade financeira, saiba aonde deseja chegar e tenha um caminho estruturado para continuar avançando.</p>
        </div>
      </div>
    </section>
  )
}

export function Bonus() {
  const root = useRef(null)
  useEffect(() => {
    if (reducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const track = root.current.querySelector('.bonus-track')
      const dist = () => track.scrollWidth - window.innerWidth + 96
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist() * 1.1, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      })
      gsap.to('.bonus-ghost', { xPercent: -30, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist() * 1.1, scrub: true } })
      gsap.to('.bonus-bar i', { scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist() * 1.1, scrub: true } })
    })
    return () => mm.revert()
  }, [])
  return (
    <section className="bonus curtain" ref={root}>
      <div className="bonus-ghost" aria-hidden="true">BÔNUS</div>
      <div className="bonus-in">
        <div className="bonus-head">
          <Label>Bônus exclusivos</Label>
          <h2 className="h2 light" data-reveal>Sua transformação financeira não termina nos encontros.</h2>
          <p className="lead light" data-reveal>Além de todo o conteúdo principal, você receberá materiais e aulas complementares para aprofundar seus conhecimentos e facilitar a aplicação prática.</p>
        </div>
        <div className="bonus-track">
          {bonuses.map(([ic, t, d], i) => (
            <article className="bonus-card" key={t}>
              <span className="bonus-tag mono">BÔNUS {i + 1}</span>
              <span className="bonus-ic"><Icon name={ic} size={30} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <div className="bonus-bar" aria-hidden="true"><i /></div>
      </div>
    </section>
  )
}

export function ParaQuem() {
  return (
    <section className="sec sec-champagne curtain">
      <div className="wrap split split-sticky">
        <div className="sticky-col">
          <Label dark>Para quem é a mentoria</Label>
          <h2 className="h2" data-reveal>Para mulheres que desejam prosperar sem abrir mão do que realmente importa.</h2>
          <figure className="blob-photo" data-reveal>
            <img src="/img/casal-maos.webp" alt="Mãos de um casal sobre uma mesa com caderno, caneta e calculadora" width="1000" height="1250" loading="lazy" />
          </figure>
        </div>
        <ul className="profiles">
          {profiles.map(([t, d]) => (
            <li key={t} data-reveal>
              <span className="check"><Icon name="Check" size={18} /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Depoimentos() {
  return (
    <section className="sec sec-navy curtain">
      <div className="wrap">
        <Label>Depoimentos</Label>
        <h2 className="h2 light" data-reveal>Histórias de quem decidiu transformar sua vida financeira.</h2>
        <div className="quotes">
          {[0, 1, 2].map((i) => (
            <figure className="quote" key={i} data-reveal>
              <Icon name="Quote" size={30} />
              <figcaption>
                <b>Depoimento real e autorizado</b>
                <span>Nome, foto e relato de uma mentorada serão inseridos aqui assim que a cliente enviar. Nenhum depoimento fictício.</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Quem() {
  return (
    <section className="sec sec-champagne curtain">
      <div className="wrap quem">
        <div className="quem-art" data-reveal>
          <div className="hero-arch-line" />
          <div className="quem-arch"><div className="photo-slot"><Icon name="UserRound" size={56} /><b>Foto real da Cibelle</b><span>em ambiente profissional</span></div></div>
        </div>
        <div>
          <Label dark>Quem é Cibelle Machado</Label>
          <h2 className="h2" data-reveal>Muito prazer, sou Cibelle Machado.</h2>
          <p className="lead" data-reveal>Sou educadora financeira, planejadora financeira, especialista em planejamento financeiro pessoal e familiar, mentora e palestrante. Também sou esposa, mãe de dois filhos e cristã.</p>
          <p data-reveal>Acredito que o dinheiro não é um fim em si mesmo, mas um instrumento para proporcionar segurança, liberdade e tranquilidade para viver aquilo que realmente importa. Minha missão é ajudar famílias a construírem uma relação mais saudável com o dinheiro, transformando conhecimento financeiro em decisões práticas e conscientes.</p>
          <p data-reveal>Criei a Mentoria Riqueza &amp; Plenitude porque acredito que uma mulher financeiramente consciente pode exercer um papel fundamental na construção da segurança de sua família. Meu propósito é ajudar você a deixar de viver na insegurança financeira e começar a construir, com sabedoria e estratégia, o futuro que deseja para aqueles que ama.</p>
        </div>
      </div>
    </section>
  )
}

export function Experiencia() {
  const root = useRef(null)
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.num-v').forEach((el) => {
        const to = Number(el.dataset.to)
        const o = { v: 0 }
        gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v) },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
      })
      gsap.fromTo('.horizon img', { yPercent: -10, scale: 1.12 }, { yPercent: 8, scale: 1.02, ease: 'none',
        scrollTrigger: { trigger: '.horizon', start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="sec sec-white curtain" ref={root}>
      <div className="wrap">
        <div className="split">
          <div>
            <Label dark>Sua experiência na mentoria</Label>
            <h2 className="h2" data-reveal>Você não precisa descobrir tudo sozinha.</h2>
          </div>
          <p className="lead" data-reveal>Durante três meses, você terá acesso a uma experiência de aprendizado, direcionamento e implementação financeira.</p>
        </div>
        <div className="nums">
          {[[3, 'meses de mentoria'], [12, 'encontros coletivos ao vivo'], [12, 'meses de acesso às gravações'], [1, 'Plano de Segurança Financeira Familiar']].map(([n, l]) => (
            <div className="num" key={l}><b className="num-v" data-to={n}>{n}</b><span>{l}</span></div>
          ))}
        </div>
        <ul className="pills">
          {deliverables.map((d) => <li key={d} data-reveal><Icon name="Check" size={16} />{d}</li>)}
        </ul>
        <figure className="horizon" data-reveal>
          <img src="/img/horizonte.webp" alt="Nascer do sol sobre o mar calmo, com céu azul-marinho e luz dourada" width="1800" height="1007" loading="lazy" />
          <figcaption>Uma jornada para você desenvolver conhecimento, clareza e autonomia para continuar construindo a segurança financeira da sua família.</figcaption>
        </figure>
      </div>
    </section>
  )
}

export function Investimento() {
  return (
    <section className="sec sec-navy price-sec curtain" id="inscricao">
      <Rosette className="rosette-price" />
      <div className="wrap price-grid">
        <div>
          <Label>Investimento</Label>
          <h2 className="h2 light" data-reveal>O futuro financeiro da sua família merece ser planejado.</h2>
          <p className="lead light" data-reveal>Chegou a hora de transformar a preocupação com o dinheiro em decisões conscientes e começar a construir o futuro que você deseja para sua família.</p>
        </div>
        <div className="price" data-reveal>
          <p className="mono">MENTORIA RIQUEZA &amp; PLENITUDE</p>
          <p className="price-l">Investimento</p>
          <p className="price-v">R$ 7.000,00</p>
          <Button>Quero fazer parte da mentoria</Button>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="sec sec-champagne curtain">
      <div className="wrap split split-sticky">
        <div className="sticky-col">
          <Label dark>Perguntas frequentes</Label>
          <h2 className="h2" data-reveal>Antes de decidir, tire suas dúvidas.</h2>
        </div>
        <div className="faq">
          {faq.map(([q, a], i) => (
            <details key={q} open={i === 0} data-reveal>
              <summary><span>{q}</span><i aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Final() {
  const root = useRef(null)
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.final-piggy', { scale: 0.7, y: 120 }, { scale: 1.05, y: 0, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true } })
      gsap.fromTo('.wordmark', { xPercent: 8 }, { xPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <footer className="final curtain" ref={root}>
      <div className="final-cta">
        <img className="final-piggy" src="/img/cofre.webp" alt="" aria-hidden="true" width="910" height="780" loading="lazy" />
        <h2 className="h2 light center-text" data-reveal>Porque prosperar também é cuidar de quem você ama.</h2>
        <div data-reveal><Button>Quero construir um futuro seguro para minha família</Button></div>
      </div>
      <div className="foot">
        <div className="wordmark" aria-hidden="true">Riqueza &amp; Plenitude</div>
        <p className="foot-line"><b>Riqueza &amp; Plenitude</b> · Mentoria de Cibelle Machado</p>
        <p className="legal">Conteúdo educacional. Não constitui recomendação de investimento, consultoria de valores mobiliários nem promessa de resultado financeiro.</p>
      </div>
    </footer>
  )
}

export function FloatingCta() {
  const ref = useRef(null)
  useEffect(() => {
    const on = () => ref.current?.classList.toggle('show', window.scrollY > window.innerHeight * 0.9)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <a ref={ref} className="float-cta" href="#inscricao">
      <Icon name="MessageCircle" size={20} /> <span>Falar sobre a mentoria</span>
    </a>
  )
}
