import { useEffect, useRef, useState } from 'react'

// The sword replaces the native bar where there is a real pointer to grab it with
// and a gutter wide enough to hold it at full size. Everywhere else — phones,
// tablets, narrow windows — it still hangs there and still reads the position, but
// compact and untouchable; that is [data-compact] in index.css. The query there
// that hides the native scrollbar has to stay in step with this one.
const INTERACTIVE = '(pointer: fine) and (min-width: 1024px)'

// Where scroll() timelines exist, index.css hangs the sword's position, the
// trail's fill and the rune charge straight off the document's scroll offset, so
// the compositor moves them with the page and there is nothing here to draw. A
// scroll event plus rAF can only ever put the sword where the page was a frame
// ago, which is exactly what stuttering is; this is the fallback, not the plan.
const CSS_DRIVEN = CSS.supports('animation-timeline', 'scroll(root block)')

// Scroll progress drawn as a sword hanging in the right gutter: the sheath line
// is the track, the sword is the thumb, and the trail behind it fills as you go
// down the page. Dragging the sword scrolls and clicking the rail jumps, where
// there is a pointer to do either with. All of it is decorative duplication of the
// scrollbar, so it is hidden from the accessibility tree and the page still scrolls
// by wheel, keys and touch.
export function SwordScrollbar() {
  const [interactive, setInteractive] = useState(() => window.matchMedia(INTERACTIVE).matches)
  const railRef = useRef<HTMLDivElement>(null)
  const swordRef = useRef<HTMLDivElement>(null)
  const sheathRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mq = window.matchMedia(INTERACTIVE)
    const onChange = (event: MediaQueryListEvent) => setInteractive(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const rail = railRef.current
    const sword = swordRef.current
    const sheath = sheathRef.current
    if (!rail || !sword || !sheath) return
    // Scroll state lives on <html>: the sword and the progress bar across the top
    // are nowhere near each other in the DOM, and this is the one ancestor both of
    // them have.
    const root = document.documentElement

    let frame = 0
    let idle = 0
    let grabbedAt = 0
    let scrolledFrom = 0
    // Measured, not read per frame: scrollHeight and clientHeight both force a
    // layout flush, and doing that on every scrolled pixel is the other half of
    // why a hand-drawn scrollbar judders. Neither changes until the window or
    // the page itself resizes, which is what re-measures them below.
    let max = 0
    let travel = 0

    const measure = () => {
      max = document.documentElement.scrollHeight - document.documentElement.clientHeight
      // Travel comes off the sheath rather than a repeated constant, so the sword
      // always stops exactly where the track does.
      travel = sheath.clientHeight - sword.offsetHeight
      if (max <= 0 || travel <= 0) rail.dataset.inactive = 'true'
      else delete rail.dataset.inactive
    }

    // In the CSS-driven case this only has the end-of-page ignition left to do,
    // and that is a class toggle — no reads, no writes to the sword itself.
    const draw = () => {
      frame = 0
      if (max <= 0 || travel <= 0) return
      const progress = Math.min(1, Math.max(0, window.scrollY / max))
      root.classList.toggle('is-drawn', progress > 0.995)
      if (CSS_DRIVEN) return
      // One write for both readouts: --p is inherited, and the CSS falls back to
      // reading it wherever a scroll() timeline is not available to animate it.
      root.style.setProperty('--p', String(progress))
      sword.style.transform = `translate3d(0, ${progress * travel}px, 0)`
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const remeasure = () => {
      measure()
      schedule()
    }

    // `is-scrolling` is what wakes the aura, the embers and the bar's flare up; it
    // lapses shortly after the last scroll event so both settle again when you stop.
    const onScroll = () => {
      schedule()
      root.classList.add('is-scrolling')
      window.clearTimeout(idle)
      idle = window.setTimeout(() => root.classList.remove('is-scrolling'), 700)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (max <= 0 || travel <= 0) return
      event.preventDefault()
      sword.setPointerCapture(event.pointerId)
      grabbedAt = event.clientY
      scrolledFrom = window.scrollY
      rail.classList.add('is-dragging')
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!sword.hasPointerCapture(event.pointerId) || travel <= 0) return
      // `instant` matters: html carries scroll-behavior: smooth, and letting a
      // drag animate to every intermediate position makes it feel like mush.
      window.scrollTo({
        top: scrolledFrom + ((event.clientY - grabbedAt) * max) / travel,
        behavior: 'instant',
      })
    }

    const onPointerUp = (event: PointerEvent) => {
      if (sword.hasPointerCapture(event.pointerId)) sword.releasePointerCapture(event.pointerId)
      rail.classList.remove('is-dragging')
    }

    // Clicking the empty rail behaves like clicking a scrollbar track: jump there.
    const onRailPointerDown = (event: PointerEvent) => {
      if (sword.contains(event.target as Node) || max <= 0) return
      const box = sheath.getBoundingClientRect()
      const ratio = (event.clientY - box.top - sword.offsetHeight / 2) / (box.height - sword.offsetHeight)
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: Math.min(1, Math.max(0, ratio)) * max, behavior: smooth ? 'smooth' : 'auto' })
    }

    measure()
    draw()
    // The page grows and shrinks under its own animations and lazy images, and a
    // stale height would put the sword in the wrong place, so watch the document
    // box rather than only the window.
    const observer = new ResizeObserver(remeasure)
    observer.observe(document.documentElement)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', remeasure)
    // Only a hovering pointer gets to grab the sword. A 20px handle at the very
    // edge of a phone screen sits where the system's own edge gestures live, and
    // the page already scrolls perfectly well by finger, so on touch the sword is
    // there to be read and nothing else.
    if (interactive) {
      sword.addEventListener('pointerdown', onPointerDown)
      sword.addEventListener('pointermove', onPointerMove)
      sword.addEventListener('pointerup', onPointerUp)
      sword.addEventListener('pointercancel', onPointerUp)
      rail.addEventListener('pointerdown', onRailPointerDown)
    }

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.clearTimeout(idle)
      observer.disconnect()
      // State parked on <html> outlives this component, so it has to be cleared.
      root.classList.remove('is-scrolling')
      root.classList.remove('is-drawn')
      root.style.removeProperty('--p')
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', remeasure)
      sword.removeEventListener('pointerdown', onPointerDown)
      sword.removeEventListener('pointermove', onPointerMove)
      sword.removeEventListener('pointerup', onPointerUp)
      sword.removeEventListener('pointercancel', onPointerUp)
      rail.removeEventListener('pointerdown', onRailPointerDown)
    }
  }, [interactive])

  return (
    <div
      ref={railRef}
      className="sword-rail"
      // Written during render rather than from the effect, so a phone never gets a
      // frame of the full-size sword before it shrinks.
      data-compact={interactive ? undefined : ''}
      aria-hidden="true"
    >
      <span ref={sheathRef} className="sword-sheath" />
      <span className="sword-trail" />
      <div ref={swordRef} className="sword">
        <div className="sword-body">
          <span className="sword-aura" />
          <span className="sword-pulse" />
          <span className="sword-pommel" />
          <span className="sword-grip" />
          <span className="sword-guard" />
          <span className="sword-blade" />
          <span className="sword-embers">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    </div>
  )
}
