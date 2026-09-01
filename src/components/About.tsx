import { certifications, languages } from '../data/certifications'
import { education } from '../data/education'
import { profile } from '../data/profile'
import { Reveal } from './Reveal'
import { Section } from './Section'

const edu = education[0]

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="I build across the stack, from the interface down to the API."
    >
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted" direction="left">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={80} direction="right">
          <div className="rounded-lg border border-line bg-surface p-6 transition-all duration-300 hover:border-line-strong hover:shadow-md hover:shadow-black/5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">At a glance</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-mono text-xs text-faint">Role</dt>
                <dd className="mt-1 text-text">{profile.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-faint">Based in</dt>
                <dd className="mt-1 text-text">{profile.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-faint">Education</dt>
                <dd className="mt-1 text-text">
                  {edu.degree}, {edu.field}
                  <span className="block text-muted">{edu.school}</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-faint">Languages</dt>
                <dd className="mt-1 text-text">{languages.join(' · ')}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-faint">Certifications</dt>
                <dd className="mt-1 text-text">{certifications.length} completed - see below</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
