import { useEffect, useRef, useState } from 'react'

const INTERACTIVE =
  'a, button, input, textarea, select, label, summary, [role="button"], [tabindex]:not([tabindex="-1"])'

// A lightweight custom cursor: an accent dot pinned to the pointer plus a
// larger ring that trails behind it (position eased in a rAF loop) and swells
// over interactive elements. Only mounts on fine pointers with motion allowed,
// so touch and reduced-motion users keep the native cursor untouched.
export function CursorGlow() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && motionOk)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let visible = false
    let raf = 0

    ring.style.visibility = 'hidden'
    dot.style.visibility = 'hidden'

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      if (!visible) {
        ringX = mouseX
        ringY = mouseY
        visible = true
        ring.style.visibility = 'visible'
        dot.style.visibility = 'visible'
      }
    }

    const onOver = (event: MouseEvent) => {
      const hovering = !!(event.target as Element)?.closest?.(INTERACTIVE)
      ring.classList.toggle('is-hovering', hovering)
      dot.classList.toggle('is-hovering', hovering)
    }

    const onDown = () => ring.classList.add('is-pressed')
    const onUp = () => ring.classList.remove('is-pressed')
    const onLeave = () => {
      ring.style.visibility = 'hidden'
      dot.style.visibility = 'hidden'
      visible = false
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
