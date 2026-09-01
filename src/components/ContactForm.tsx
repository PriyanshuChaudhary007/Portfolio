import { useRef, useState } from 'react'
import { profile } from '../data/profile'
import { Check } from './icons'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'w-full rounded-md border border-line bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-faint transition-colors focus:border-accent focus:outline-none'
const labelClass = 'mb-1.5 block font-mono text-xs uppercase tracking-[0.12em] text-faint'

// Contact form wired to FormSubmit (no backend, no API key). On submit it POSTs
// the fields to FormSubmit's AJAX endpoint for profile.email, which forwards
// them to that inbox. The very first submission triggers a one-time activation
// email you must confirm; after that, messages arrive automatically.
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const data = new FormData(form)
    data.append('_subject', `Portfolio message from ${data.get('name') || 'a visitor'}`)
    data.append('_template', 'table')
    data.append('_captcha', 'false')

    setStatus('submitting')
    setMessage('')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const result = await res.json()
      if (result.success === true || result.success === 'true') {
        setStatus('success')
        setMessage("Thanks — your message is on its way. I'll get back to you soon.")
        form.reset()
      } else {
        setStatus('error')
        setMessage(result.message || 'Something went wrong. Please try again or email me directly.')
      }
    } catch {
      setStatus('error')
      setMessage(`Network error — please try again, or email me directly at ${profile.email}.`)
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="text-left">
      {/* honeypot — hidden from people, catches bots */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 …"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-email" className={labelClass}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="A line about what you're working on or looking for."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      <div aria-live="polite" className="mt-4 min-h-[1.25rem]">
        {status === 'success' ? (
          <p className="inline-flex items-center gap-2 text-sm text-accent-text">
            <Check className="text-base" /> {message}
          </p>
        ) : null}
        {status === 'error' ? <p className="text-sm text-muted">{message}</p> : null}
      </div>
    </form>
  )
}
