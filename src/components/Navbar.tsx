import { useEffect, useMemo, useState } from 'react'
import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { cn } from '../lib/cn'
import { ArrowUpRight, Close, Menu } from './icons'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const sectionIds = useMemo(() => navItems.map((item) => item.href.slice(1)), [])
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-md border border-line-strong font-display text-sm font-semibold text-accent-text transition-colors group-hover:border-accent">
            PC
          </span>
          {/* Six links plus the résumé button leave no room for the full name in
              the md-to-lg band; the PC mark still links home. */}
          <span className="font-display text-[0.95rem] font-semibold tracking-tight md:hidden lg:inline">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-active={isActive}
                  className={cn(
                    'link-underline relative rounded-md px-3 py-2 text-sm transition-colors',
                    isActive ? 'text-text' : 'text-muted hover:text-text',
                  )}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent-text sm:inline-flex"
          >
            Résumé <ArrowUpRight className="text-[0.9rem]" />
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-md border border-line text-text transition-colors hover:border-line-strong md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close className="text-[1.15rem]" /> : <Menu className="text-[1.15rem]" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-3 text-base text-muted transition-colors hover:text-text"
                  >
                    {item.label}
                    <ArrowUpRight className="text-sm text-faint" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium"
            >
              Download résumé <ArrowUpRight className="text-[0.9rem]" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
