import { achievements, certifications, languages } from '../data/certifications'
import { education } from '../data/education'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education & Credentials" title="Background & credentials">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Education + languages */}
        <Reveal className="space-y-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Education</p>
            {education.map((item) => (
              <div key={item.school} className="mt-4 border-l-2 border-accent pl-5">
                <h3 className="text-lg font-semibold">
                  {item.degree}
                  <span className="block text-base font-normal text-muted">{item.field}</span>
                </h3>
                <p className="mt-2 text-muted">{item.school}</p>
                <p className="mt-1 font-mono text-sm text-faint">
                  {item.period} · {item.location}
                </p>
              </div>
            ))}
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

        {/* Certifications + activities */}
        <Reveal delay={80} className="space-y-10">
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
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Activities & achievements</p>
            <ul className="mt-4 space-y-3">
              {achievements.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
