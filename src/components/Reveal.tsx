import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'

type RevealDirection = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Optional stagger, in ms. */
  delay?: number
  /** Which edge the content eases in from. Defaults to 'up'. */
  direction?: RevealDirection
}

const directionClass: Record<RevealDirection, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

// Thin wrapper that fades + lifts its children into view once. The motion
// itself is defined in CSS and disabled under prefers-reduced-motion.
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
