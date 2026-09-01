import { heroStack, profile } from '../data/profile'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from './icons'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* faint texture, top-right, masked so it fades out */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(120%_80%_at_85%_0%,black,transparent_60%)]"
      />
      {/* slow-drifting accent aura, top-right */}
      <div
        aria-hidden="true"
        className="hero-aura pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 font-mono text-sm text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Full Stack Developer Intern · Correm Advisory
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl">
            Full stack developer building <span className="text-accent-text">practical web applications</span> — and
            exploring how <span className="text-accent-text">generative AI</span> fits into real products.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {heroStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent-text"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group/btn inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/20"
            >
              View projects{' '}
              <ArrowDown className="text-[0.95rem] transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent-text"
            >
              Get in touch
            </a>

            <div className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />

            <div className="flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-10 place-items-center rounded-md text-lg text-muted transition-colors hover:text-text"
              >
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center rounded-md text-lg text-muted transition-colors hover:text-text"
              >
                <Linkedin />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="grid size-10 place-items-center rounded-md text-lg text-muted transition-colors hover:text-text"
              >
                <Mail />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <dl className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-sm text-faint">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Based in</dt>
              <dd>Noida, India</dd>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <dt className="sr-only">Focus</dt>
              <dd>MERN stack + Generative AI</dd>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <dt className="sr-only">Education</dt>
              <dd>B.Tech CSE · Gautam Buddha University</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* link to next section, doubles as a scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="group/scroll relative mx-auto mb-8 hidden w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-faint transition-colors hover:text-text md:flex"
      >
        Scroll
        <ArrowUpRight className="float-hint rotate-45 text-sm" />
      </a>
    </section>
  )
}
