import { skillCategories } from '../data/skills'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { TechIcon } from './TechIcon'

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="What I work with"
      intro="The languages, frameworks and tools I use across the stack."
      alt
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal
            key={category.title}
            delay={i * 60}
            className={cn(i === 0 && 'lg:col-span-2')}
          >
            <div className="h-full rounded-lg border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-md hover:shadow-black/5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-semibold">{category.title}</h3>
                <span className="font-mono text-xs text-faint">{category.note}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2 rounded-md border border-line px-2.5 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-accent-text"
                  >
                    <TechIcon name={item.icon} className="shrink-0 text-[0.9em]" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
