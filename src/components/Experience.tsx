import { experience } from '../data/experience'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" index="04" eyebrow="Experience" title="Where I've worked" alt>
      <ol className="space-y-10">
        {experience.map((item, i) => {
          const isLast = i === experience.length - 1
          return (
            <li key={`${item.company}-${item.period}`}>
              <Reveal delay={i * 80}>
                <div className="grid grid-cols-[auto_1fr] gap-x-5">
                  {/* marker rail */}
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'relative mt-1.5 grid size-3 place-items-center rounded-full border-2 border-accent',
                        item.current ? 'bg-accent' : 'bg-bg-alt',
                      )}
                      aria-hidden="true"
                    >
                      {item.current ? (
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                      ) : null}
                    </span>
                    {!isLast ? <span className="mt-2 w-px grow bg-line" aria-hidden="true" /> : null}
                  </div>

                  <div className="pb-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold">{item.role}</h3>
                      <span className="inline-flex items-center gap-2 font-mono text-sm text-faint">
                        {item.current ? (
                          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent-text">
                            Current
                          </span>
                        ) : null}
                        {item.period}
                      </span>
                    </div>

                    <p className="mt-1 text-muted">
                      <span className="text-text">{item.company}</span>
                      <span className="text-faint"> · {item.location}</span>
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 leading-relaxed">
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-line-strong" aria-hidden="true" />
                          <span className="text-muted">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
