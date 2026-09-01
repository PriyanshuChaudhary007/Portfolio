import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { ArrowUpRight, Github, Linkedin, Mail } from './icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-md border border-line-strong font-display text-sm font-semibold text-accent-text">
                PC
              </span>
              <span className="font-display text-[0.95rem] font-semibold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.role} based in {profile.location}, working across the MERN stack and generative AI.
            </p>
            <div className="mt-5 flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-9 place-items-center rounded-md text-lg text-muted transition-colors hover:text-text"
              >
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-9 place-items-center rounded-md text-lg text-muted transition-colors hover:text-text"
              >
                <Linkedin />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="grid size-9 place-items-center rounded-md text-lg text-muted transition-colors hover:text-text"
              >
                <Mail />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
            >
              Résumé <ArrowUpRight className="text-xs" />
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}</p>
          <p className="font-mono text-xs">Built with React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
