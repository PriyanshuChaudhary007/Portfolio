import { cn } from '../lib/cn'
import { Moon, Sun } from './icons'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={cn(
        'grid size-9 place-items-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-text',
        className,
      )}
    >
      {isDark ? <Sun className="text-[1.05rem]" /> : <Moon className="text-[1.05rem]" />}
    </button>
  )
}
