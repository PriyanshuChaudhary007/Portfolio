import { useState } from 'react'
import type { Project, ProjectLinkType } from '../data/projects'
import { cn } from '../lib/cn'
import { ArrowUpRight, Check, Copy, Github, Npm } from './icons'

const linkIcon: Record<ProjectLinkType, typeof Github> = {
  github: Github,
  npm: Npm,
  demo: ArrowUpRight,
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable — the command is still visible to copy manually
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-bg-alt px-3 py-2 font-mono text-sm">
      <code className="truncate text-muted">
        <span className="text-faint">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy install command'}
        className="grid size-7 shrink-0 place-items-center rounded text-faint transition-colors hover:text-text"
      >
        {copied ? <Check className="text-sm text-accent-text" /> : <Copy className="text-sm" />}
      </button>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  reversed?: boolean
}

export function ProjectCard({ project, index, reversed }: ProjectCardProps) {
  return (
    <article className="group rounded-xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lg hover:shadow-black/5 sm:p-9">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* meta column */}
        <div className={cn('flex flex-col', reversed && 'lg:order-2')}>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em]">
            <span className="text-accent-text">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-6 origin-left bg-line-strong transition-all duration-300 group-hover:w-10 group-hover:bg-accent" aria-hidden="true" />
            <span className="text-faint">{project.category}</span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold transition-colors group-hover:text-accent-text sm:text-3xl">{project.name}</h3>
          <p className="mt-3 text-muted">{project.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent-text">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            {project.install ? (
              <div className="mb-4">
                <CopyCommand command={project.install} />
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, i) => {
                const Icon = linkIcon[link.type]
                const primary = i === 0
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      'group/link inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                      primary
                        ? 'bg-accent text-on-accent hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/20'
                        : 'border border-line-strong text-text hover:border-accent hover:text-accent-text',
                    )}
                  >
                    <Icon className="text-base transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* content column */}
        <div className={cn(reversed && 'lg:order-1')}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">The problem</p>
          <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>

          <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-faint">What I built</p>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-text">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-muted">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
