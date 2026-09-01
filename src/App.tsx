import { About } from './components/About'
import { Contact } from './components/Contact'
import { Credentials } from './components/Credentials'
import { CursorGlow } from './components/CursorGlow'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Exploring } from './components/Exploring'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { SwordScrollbar } from './components/SwordScrollbar'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <CursorGlow />

      {/* Reading position, drawn as a rule across the top of the page. */}
      <div className="scroll-progress" aria-hidden="true" />

      <SwordScrollbar />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to content
      </a>

      <Navbar theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Credentials />
        <Exploring />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
