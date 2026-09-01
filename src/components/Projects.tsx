import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { ArrowUpRight, Github } from './icons'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title="Things I've designed and shipped"
      intro="Three projects I've taken from idea to a working, published product. All of them are full-stack, and two lean on generative AI."
    >
      <div className="space-y-6">
        {projects.map((project, i) => (
          <Reveal key={project.id} direction={i % 2 === 1 ? 'right' : 'left'}>
            <ProjectCard project={project} index={i} reversed={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group/more mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent-text"
        >
          <Github className="text-base" />
          More on my GitHub
          <ArrowUpRight className="text-sm transition-transform duration-300 group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5" />
        </a>
      </Reveal>
    </Section>
  )
}
