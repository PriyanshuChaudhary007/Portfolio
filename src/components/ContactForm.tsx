import { useState } from 'react'
import { profile } from '../data/profile'
import { Check } from './icons'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'phone' | 'message'
type Errors = Partial<Record<FieldName, string>>

const fieldBase =
  'w-full rounded-md border bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-faint transition-colors focus:outline-none'
const labelClass = 'mb-1.5 block font-mono text-xs uppercase tracking-[0.12em] text-faint'

// An invalid field holds the accent border so it reads as one unit with the
// message under it; a valid field only picks the accent up on focus.
const field = (invalid: boolean) => `${fieldBase} ${invalid ? 'border-accent' : 'border-line focus:border-accent'}`

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+()\d\s-]{7,20}$/

// Name, email and message are required. Phone is the one optional field, but a
// value that is there has to look like a phone number.
function validate(data: FormData): Errors {
  const read = (key: FieldName) => String(data.get(key) ?? '').trim()
  const errors: Errors = {}

  const name = read('name')
  if (!name) errors.name = 'Please add your name.'
  else if (name.length < 2) errors.name = 'That is too short to be a name.'

  const phone = read('phone')
  if (phone && !PHONE.test(phone)) errors.phone = 'Digits, spaces, + and - only.'

  const email = read('email')
  if (!email) errors.email = 'I need an email address to reply to.'
  else if (!EMAIL.test(email)) errors.email = 'That does not look like an email address.'

  const message = read('message')
  if (!message) errors.message = 'Add a line about what you are after.'
  else if (message.length < 10) errors.message = 'A little more detail, please.'

  return errors
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-xs text-accent-text">
      {children}
    </p>
  )
}

// Contact form wired to FormSubmit (no backend, no API key). Submitting runs the
// checks above first and only POSTs a complete form to FormSubmit's AJAX
// endpoint for profile.email, which forwards it to that inbox. The very first
// submission triggers a one-time activation email you must confirm; after that,
// messages arrive automatically.
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  // Drop a field's error the moment it is edited, so the form stops nagging
  // about something the visitor is already fixing.
  const onInput = (event: React.FormEvent<HTMLFormElement>) => {
    const name = (event.target as HTMLInputElement).name as FieldName
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const data = new FormData(form)

    const found = validate(data)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setStatus('error')
      setMessage('Please fill in the highlighted fields before sending.')
      // Jump to the first problem in DOM order rather than the first one found.
      const first = (['name', 'phone', 'email', 'message'] as const).find((key) => found[key])
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setErrors({})
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
        setMessage("Thanks - your message is on its way. I'll get back to you soon.")
        form.reset()
      } else {
        setStatus('error')
        setMessage(result.message || 'Something went wrong. Please try again or email me directly.')
      }
    } catch {
      setStatus('error')
      setMessage(`Network error - please try again, or email me directly at ${profile.email}.`)
    }
  }

  return (
    <form onSubmit={onSubmit} onInput={onInput} noValidate className="text-left">
      {/* honeypot — hidden from people, catches bots */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            className={field(Boolean(errors.name))}
          />
          <FieldError id="cf-name-error">{errors.name}</FieldError>
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 …"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
            className={field(Boolean(errors.phone))}
          />
          <FieldError id="cf-phone-error">{errors.phone}</FieldError>
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
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
          className={field(Boolean(errors.email))}
        />
        <FieldError id="cf-email-error">{errors.email}</FieldError>
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
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          className={`${field(Boolean(errors.message))} resize-y`}
        />
        <FieldError id="cf-message-error">{errors.message}</FieldError>
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
