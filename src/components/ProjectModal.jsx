import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function Dialog({ project: p, onClose }) {
  const [i, setI] = useState(0)
  const root = useRef(null)
  const closeBtn = useRef(null)
  const opener = useRef(document.activeElement)
  const n = p.shots.length

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') setI((v) => (v + 1) % n)
      else if (e.key === 'ArrowLeft') setI((v) => (v - 1 + n) % n)
      else if (e.key === 'Tab') {
        const f = root.current.querySelectorAll('a[href],button:not([disabled])')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener.current?.focus?.()
    }
  }, [n, onClose])

  const shot = p.shots[i]

  return (
    <motion.div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[90] overflow-y-auto bg-ink"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/85 px-5 py-4 backdrop-blur-md">
        <span className="font-display text-lg font-bold text-white">Demo showcase</span>
        <button ref={closeBtn} type="button" onClick={onClose} className="rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-ink">
          Close
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-panel">
            <AnimatePresence mode="wait">
              <motion.img
                key={shot.src}
                src={shot.src}
                alt={`${p.title} walkthrough: ${shot.caption}`}
                width="1280" height="800"
                className="aspect-[16/10] w-full object-cover"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            {n > 1 && (
              <>
                <button type="button" aria-label="Previous screenshot" onClick={() => setI((i - 1 + n) % n)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-xl text-accent hover:bg-accent hover:text-ink">‹</button>
                <button type="button" aria-label="Next screenshot" onClick={() => setI((i + 1) % n)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-xl text-accent hover:bg-accent hover:text-ink">›</button>
              </>
            )}
          </div>
          <p aria-live="polite" className="mt-4 text-sm text-neutral-300">
            <span className="text-accent">Step {i + 1} of {n}:</span> {shot.caption}
          </p>
          <ul className="mt-5 grid grid-cols-3 gap-3" aria-label="Walkthrough screenshots">
            {p.shots.map((s, k) => (
              <li key={s.src}>
                <button type="button" onClick={() => setI(k)} aria-label={`Show step ${k + 1}: ${s.caption}`} aria-current={k === i} className={`block w-full overflow-hidden rounded-lg border-2 transition-colors ${k === i ? 'border-accent' : 'border-line hover:border-accent/60'}`}>
                  <img src={s.src} alt="" width="320" height="200" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 id="modal-title" className="font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl">{p.title}</h2>
          <p className="mt-6 leading-relaxed text-neutral-300">{p.desc}</p>
          <p className="mt-4 leading-relaxed text-mute">{p.role}</p>

          <h3 className="mb-3 mt-8 font-display text-lg font-bold text-white">Key features</h3>
          <ul className="space-y-1.5 text-sm text-neutral-300">
            {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-accent">+</span>{f}</li>)}
          </ul>

          <h3 className="mb-3 mt-8 font-display text-lg font-bold text-white">Built with</h3>
          <ul className="flex flex-wrap gap-2">
            {p.tags.map((t) => <li key={t} className="rounded-full bg-panel px-3 py-1 text-xs text-accent">{t}</li>)}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {p.live ? (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink">Open live demo</a>
            ) : (
              <span className="rounded-full border border-line px-6 py-3 text-sm text-mute">{p.note || 'Live demo coming soon'}</span>
            )}
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-accent px-6 py-3 text-sm text-accent transition-colors hover:bg-accent hover:text-ink">View on GitHub</a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectModal({ project, onClose }) {
  return <AnimatePresence>{project && <Dialog key={project.slug} project={project} onClose={onClose} />}</AnimatePresence>
}
