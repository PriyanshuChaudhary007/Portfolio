import { useState } from 'react'
import { profile } from '../data/profile'
import { ContactForm } from './ContactForm'
import { Check, Copy, Github, Linkedin, Mail } from './icons'
import { Reveal } from './Reveal'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable — the address is still visible to copy manually
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="group/copy inline-flex items-center gap-2 font-mono text-sm text-faint transition-colors hover:text-text"
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
    >
      {profile.email}
      {copied ? (
        <Check className="text-sm text-accent-text" />
      ) : (
        <Copy className="text-sm opacity-0 transition-opacity group-hover/copy:opacity-100" />
      )}
    </button>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-12 sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="hero-aura pointer-events-none absolute -top-24 right-0 size-[24rem] rounded-full"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              {/* left — intro + direct links */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-accent-text">08</span>
                  <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Contact</span>
                </div>

                <h2 id="contact-heading" className="mt-5 max-w-md text-3xl sm:text-4xl md:text-[2.6rem]">
                  Let's build something together
                </h2>
                <p className="mt-5 max-w-md text-lg text-muted">
                  Have a project, a role, or a question about something I've built? Send a message and I'll get back to
                  you.
                </p>

                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Prefer to reach out directly</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${profile.email}`}
                      className="group/link inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent-text"
                    >
                      <Mail className="text-base" /> Email
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent-text"
                    >
                      <Linkedin className="text-base" /> LinkedIn
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent-text"
                    >
                      <Github className="text-base" /> GitHub
                    </a>
                  </div>
                  <div className="mt-4">
                    <CopyEmail />
                  </div>
                </div>
              </div>

              {/* right — the form */}
              <div className="rounded-xl border border-line bg-bg-alt p-6 sm:p-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
