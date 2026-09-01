import { useEffect, useRef, useState } from 'react'

// Tracks whether an element is on screen, and — unlike a one-shot reveal —
// resets once it has scrolled *completely* out of view. That way scrolling back
// up replays the entrance animation instead of landing on already-revealed
// content. Falls back to visible when IntersectionObserver isn't available.
export function useInView<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    // Triggers a little after the element clears the bottom edge, so the motion
    // reads as deliberate rather than starting off-screen.
    const enter = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setInView(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    // Separate observer with no margin: only re-arm once the element is fully
    // off-screen, so nothing ever fades out while it is still partly visible.
    const exit = new IntersectionObserver(
      (entries) => {
        if (entries.every((entry) => !entry.isIntersecting)) setInView(false)
      },
      { threshold: 0 },
    )

    enter.observe(el)
    exit.observe(el)

    return () => {
      enter.disconnect()
      exit.disconnect()
    }
  }, [])

  return { ref, inView }
}
