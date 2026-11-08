import { Reveal } from './Reveal'
import { profile } from '../data'

const icons = {
  LinkedIn: (
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
    />
  ),
  GitHub: (
    <path
      fill="currentColor"
      d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  ),
  Resume: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
    </g>
  ),
  Email: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </g>
  ),
}

const cards = [
  { n: '01', label: 'LinkedIn', href: profile.linkedin, hint: 'shrishti-dubey028' },
  { n: '02', label: 'GitHub', href: profile.github, hint: 'shrishtirenu028-design' },
  { n: '03', label: 'Resume', href: profile.resume, hint: 'View PDF' },
  { n: '04', label: 'Email', href: `mailto:${profile.email}`, hint: profile.email },
]

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-h"
      className="mx-auto max-w-5xl px-5 py-28 text-center"
    >
      <Reveal>
        <h2
          id="contact-h"
          className="font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-6xl"
        >
          Let's work together
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-mute">
          Available for remote work. Pick a channel and say hello.
        </p>
      </Reveal>

      <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c, i) => (
          <li key={c.label}>
            <Reveal delay={i * 0.07} className="h-full">
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.label}: ${c.hint}`}
                className="group flex h-full flex-col items-center gap-5 rounded-2xl border border-line bg-panel px-4 py-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-[#22c55e] hover:shadow-[0_0_30px_-6px_rgba(34,197,94,0.55)] focus-visible:-translate-y-1.5 focus-visible:border-[#22c55e]"
              >
                <span className="self-start text-xs text-mute transition-colors group-hover:text-[#22c55e]">
                  {c.n}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-9 w-9 text-neutral-300 transition-colors group-hover:text-[#22c55e]"
                  aria-hidden="true"
                >
                  {icons[c.label]}
                </svg>
                <span className="font-display text-lg font-bold text-white">
                  {c.label}
                </span>
                <span className="w-full truncate text-[11px] text-mute">
                  {c.hint}
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
