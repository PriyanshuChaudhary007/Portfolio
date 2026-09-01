import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'

type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'sweep-left' | 'sweep-right' | 'gate'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Optional stagger, in ms. */
  delay?: number
  /**
   * Which edge the content eases in from. Defaults to 'up'. The `sweep-*`
   * variants travel much further and add a tilt — meant for whole cards.
   * `gate` opens outward from a smaller, heavily blurred state.
   */
  direction?: RevealDirection
}

const directionClass: Record<RevealDirection, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  'sweep-left': 'reveal-sweep-left',
  'sweep-right': 'reveal-sweep-right',
  gate: 'reveal-gate',
}

// Thin wrapper that fades, lifts and un-blurs its children into view whenever
// they enter the viewport. The motion itself is defined in CSS and disabled
// under prefers-reduced-motion.
export function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('reveal', directionClass[direction], inView && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
