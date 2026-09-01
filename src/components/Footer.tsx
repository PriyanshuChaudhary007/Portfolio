import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { FileText, Github, Linkedin, Mail } from './icons'

const columnLabel = 'font-mono text-xs uppercase tracking-[0.2em] text-faint'
const iconButton =
  'grid size-10 place-items-center rounded-lg border border-line-strong text-base text-muted transition-colors hover:border-accent hover:text-accent-text'

// Three columns across the footer: who I am, where to go, how to reach me.
// The link column runs two-up so the footer stays wide and shallow instead of
// growing one tall stack down the right-hand edge.
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-8">
        {/* Three across once there is room for them; in the tablet band the brand
            takes a full row of its own and the two link columns sit under it, which
            keeps the Connect row from wrapping its last icon. */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          {/* brand */}
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <a href="#home" className="group flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-md border border-line-strong font-display text-sm font-semibold text-accent-text transition-colors group-hover:border-accent">
                PC
              </span>
              <span className="font-display text-[0.95rem] font-semibold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.role} based in {profile.location}, working across the MERN stack and generative AI.
            </p>
          </div>

          {/* navigate */}
          <div>
            <h2 className={columnLabel}>Navigate</h2>
            <nav aria-label="Footer" className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* connect */}
          <div>
            <h2 className={columnLabel}>Connect</h2>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className={iconButton}
              >
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className={iconButton}
              >
                <Linkedin />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" title="Email" className={iconButton}>
                <Mail />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Résumé (PDF)"
                title="Résumé (PDF)"
                className={iconButton}
              >
                <FileText />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs">Built with React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
