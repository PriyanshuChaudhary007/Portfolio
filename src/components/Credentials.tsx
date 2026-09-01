import { achievements, certifications, languages } from '../data/certifications'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Credentials() {
  return (
    <Section
      id="credentials"
      index="06"
      eyebrow="Credentials"
      title="Certifications and activities"
      alt
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="space-y-10" direction="left">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Certifications</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {certifications.map((cert) => (
                <li key={`${cert.name}-${cert.issuer}`} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-text">{cert.name}</span>
                  <span className="text-right font-mono text-xs text-faint">{cert.issuer}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Languages</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {languages.map((language) => (
                <li key={language} className="rounded-md border border-line px-3 py-1.5 text-sm text-muted">
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80} direction="right">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Activities & achievements</p>
          <ul className="mt-4 space-y-3">
            {achievements.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
