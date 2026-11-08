import { useState } from 'react'
import { Reveal, SectionTitle } from './Reveal'
import { profile } from '../data'

const icons = {
  LinkedIn: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z',
  GitHub: 'M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.98 10.98 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z',
  Email: 'M2 5h20v14H2V5zm2 2v.5l8 5 8-5V7H4zm16 3.8l-8 5-8-5V17h16v-6.2z',
}

const validate = (v) => {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email, like name@example.com.'
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.'
  return e
}

export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) return
    // Placeholder endpoint not replaced yet: fall back to the visitor's email app.
    if (profile.formEndpoint.includes('YOUR_FORM_ID')) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio message from ' + v.name)}&body=${encodeURIComponent(v.message + '\n\n' + v.email)}`
      return
    }
    setStatus('sending')
    try {
      const r = await fetch(profile.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) })
      if (!r.ok) throw new Error()
      setStatus('sent')
      setV({ name: '', email: '', message: '' })
    } catch { setStatus('error') }
  }

  const field = 'w-full rounded-xl border border-line bg-panel px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-mute/60 focus:border-accent aria-[invalid=true]:border-red-400'
  const socials = [['LinkedIn', profile.linkedin], ['GitHub', profile.github], ['Email', `mailto:${profile.email}`]]

  return (
    <section id="contact" aria-labelledby="contact-h" className="mx-auto max-w-6xl px-5 py-28">
      <SectionTitle id="contact-h" sub="Available for remote work. Tell me what you're building.">Let's work together</SectionTitle>
      <div className="grid gap-14 md:grid-cols-2">
        <Reveal>
          <ul className="space-y-4">
            {socials.map(([n, h]) => (
              <li key={n}>
                <a href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={n}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-accent">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-accent" aria-hidden="true"><path d={icons[n]} /></svg>
                  <span><span className="block font-display text-lg font-bold text-white">{n}</span><span className="block break-all text-xs text-mute">{n === 'Email' ? profile.email : h.replace('https://', '')}</span></span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="space-y-5">
            {[['name', 'Name', 'text'], ['email', 'Email', 'email']].map(([k, l, t]) => (
              <div key={k}>
                <label htmlFor={k} className="mb-2 block text-sm text-neutral-300">{l}</label>
                <input id={k} name={k} type={t} value={v[k]} onChange={set(k)} autoComplete={k} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={field} />
                {errors[k] && <p id={`${k}-err`} role="alert" className="mt-1.5 text-xs text-red-400">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-neutral-300">Message</label>
              <textarea id="message" name="message" rows={5} value={v.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} className={field} />
              {errors.message && <p id="message-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
            </div>
            <button type="submit" disabled={status === 'sending'} className="rounded-full bg-accent px-8 py-3 text-sm font-bold text-ink transition-transform hover:scale-[1.03] disabled:opacity-60">
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
            <p aria-live="polite" className="min-h-5 text-sm">
              {status === 'sent' && <span className="text-accent">Message sent. I'll reply soon.</span>}
              {status === 'error' && <span className="text-red-400">Message failed to send. Email me directly at {profile.email}.</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
