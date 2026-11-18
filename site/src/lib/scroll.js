import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initScroll() {
  if (reducedMotion()) return () => {}
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.4 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    const el = id.length > 1 ? document.querySelector(id) : null
    if (el) {
      e.preventDefault()
      lenis.scrollTo(el, { offset: -20 })
    }
  }
  document.addEventListener('click', onClick)
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return () => {
    document.removeEventListener('click', onClick)
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}

export { gsap, ScrollTrigger }
