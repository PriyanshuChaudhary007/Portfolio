import { exploring } from '../data/exploring'
import { ArrowUpRight } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Exploring() {
  return (
    <Section
      id="exploring"
      index="06"
      eyebrow="Currently Exploring"
      title="What I'm digging into right now"
      intro="Not a finished list — just where my attention goes when I'm learning, and what tends to feed back into what I build."
      alt
    >
      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {exploring.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <div className="group border-t border-line-strong pt-5 transition-colors hover:border-accent">
              <div className="flex items-start gap-3">
                <ArrowUpRight className="mt-1 text-sm text-accent-text transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
