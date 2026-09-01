import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  /** Renders the section on the subtle alternate background. */
  alt?: boolean
}

// Shared shell so every section has the same rhythm: a mono index + label
// kicker, a display heading, an optional intro, then its content.
export function Section({ id, index, eyebrow, title, intro, children, className, alt }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-24 py-20 sm:py-28', alt && 'bg-bg-alt border-y border-line', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-accent-text">{index}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{eyebrow}</span>
          </div>
          <h2 id={`${id}-heading`} className="mt-4 max-w-2xl text-3xl sm:text-4xl md:text-[2.6rem]">
            {title}
          </h2>
          {intro ? <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p> : null}
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}
