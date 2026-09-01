import { education } from '../data/education'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  return (
    <Section
      id="education"
      index="05"
      eyebrow="Education"
      title="Where I studied"
      intro="A Computer Science degree, and the schooling that led into it."
    >
      <ol className="space-y-8">
        {education.map((item, i) => {
          const isLast = i === education.length - 1
          return (
            <li key={`${item.school}-${item.degree}`}>
              <Reveal delay={i * 80}>
                <div className="grid grid-cols-[auto_1fr] gap-x-5">
                  {/* marker rail */}
                  <div className="flex flex-col items-center">
                    <span
                      className="mt-1.5 size-3 rounded-full border-2 border-accent bg-bg"
                      aria-hidden="true"
                    />
                    {!isLast ? <span className="mt-2 w-px grow bg-line" aria-hidden="true" /> : null}
                  </div>

                  <div className="pb-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold">{item.degree}</h3>
                      {item.period ? (
                        <span className="font-mono text-sm text-faint">{item.period}</span>
                      ) : null}
                    </div>

                    {item.field ? <p className="mt-1 text-muted">{item.field}</p> : null}

                    <p className="mt-2 text-muted">
                      <span className="text-text">{item.school}</span>
                      {item.location ? <span className="text-faint"> · {item.location}</span> : null}
                    </p>
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
