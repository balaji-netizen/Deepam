import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = 'power3.out'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scans for `data-anim` elements and builds one ScrollTrigger each.
 *
 *   fade   — rises and fades in
 *   mask   — clip-path wipe, for imagery
 *   line   — per-line headline reveal (.line-mask > .line-inner)
 *   float  — slow parallax drift tied to scroll
 *
 * The hidden start state is applied here in JS rather than in CSS, so an element
 * this scan never reaches simply stays visible instead of disappearing forever.
 * Elements are tagged once processed, making repeat calls cheap and idempotent.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const triggers: ScrollTrigger[] = []

    const scan = () => {
      gsap.utils.toArray<HTMLElement>('[data-anim]').forEach(el => {
        if (el.dataset.animReady === '1') return
        el.dataset.animReady = '1'

        const kind = el.dataset.anim
        const delay = parseFloat(el.dataset.delay || '0')
        const start = 'top 88%'

        if (kind === 'fade') {
          gsap.set(el, { opacity: 0, y: 26 })
          const tw = gsap.to(el, {
            opacity: 1, y: 0, duration: 1.15, delay, ease: EASE,
            scrollTrigger: { trigger: el, start, once: true },
          })
          if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
        }

        if (kind === 'mask') {
          gsap.set(el, { clipPath: 'inset(0 0 100% 0)' })
          const tw = gsap.to(el, {
            clipPath: 'inset(0 0 0% 0)', duration: 1.5, delay, ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start, once: true },
          })
          if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
        }

        if (kind === 'line') {
          const inner = el.querySelectorAll('.line-inner')
          gsap.set(inner, { yPercent: 108 })
          const tw = gsap.to(inner, {
            yPercent: 0, duration: 1.25, delay, ease: EASE, stagger: 0.09,
            scrollTrigger: { trigger: el, start, once: true },
          })
          if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
        }

        if (kind === 'float') {
          const dist = parseFloat(el.dataset.floatDist || '70')
          const tw = gsap.fromTo(el, { y: dist * 0.5 }, {
            y: -dist * 0.5, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
          })
          if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
        }
      })

      /* Decorative mandalas turn very slowly — one revolution takes minutes, so
         it reads as ambient craft rather than a spinning graphic. Paused while
         off-screen so it costs nothing when not visible. */
      gsap.utils.toArray<HTMLElement>('.mandala-spin').forEach(el => {
        if (el.dataset.spinReady === '1') return
        el.dataset.spinReady = '1'
        /* 180s, not 240 (2026-08-12 brief: "slightly increase the speed"). One
           revolution still takes three minutes — 1.5°/s against 0.75 — so it
           stays ambient craft rather than a spinning graphic. Direction, easing
           and the off-screen pause are unchanged. */
        const spin = gsap.to(el, { rotate: 360, duration: 180, ease: 'none', repeat: -1 })
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: self => (self.isActive ? spin.play() : spin.pause()),
        })
        triggers.push(st)
      })

      ScrollTrigger.refresh()
    }

    // Wait a frame so freshly-mounted nodes are laid out before measuring.
    const raf = requestAnimationFrame(scan)

    // Trigger positions go stale whenever the page height changes — late-loading
    // images, webfont swap, or an accordion opening. Without these refreshes an
    // element whose trigger was mismeasured stays at opacity 0 permanently.
    let debounce: number
    const refresh = () => {
      window.clearTimeout(debounce)
      debounce = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    }

    window.addEventListener('load', refresh)
    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)
    document.fonts?.ready.then(refresh)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(debounce)
      window.removeEventListener('load', refresh)
      ro.disconnect()
      triggers.forEach(t => t.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Nudges an element toward the cursor. Pointer-fine devices only. */
export function useMagnetic(strength = 0.32) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const cleanups: Array<() => void> = []

    gsap.utils.toArray<HTMLElement>('.magnetic').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })

      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * strength)
        yTo((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const reset = () => { xTo(0); yTo(0) }

      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', reset)
      cleanups.push(() => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', reset)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [strength])
}

export { gsap, ScrollTrigger }
