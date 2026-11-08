import { useCallback, useState } from 'react'
import { Reveal, SectionTitle } from './Reveal'
import ProjectModal from './ProjectModal'
import { projects } from '../data'

function Card({ p, index, onOpen }) {
  // Clicking anywhere on the card opens the showcase, except the external links.
  const open = (e) => { if (!e.target.closest('a')) onOpen(p) }
  return (
    <Reveal delay={(index % 2) * 0.08} className={p.featured ? 'md:col-span-2' : ''}>
      <article onClick={open} data-cursor="View" className={`group h-full overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-accent/60 ${p.featured ? 'md:grid md:grid-cols-2' : ''}`}>
        <div className={`relative overflow-hidden bg-panel ${p.featured ? 'aspect-[16/10] md:aspect-auto md:min-h-full' : 'aspect-[16/9]'}`}>
          <img src={p.cover} alt={`${p.title} screenshot`} width="1280" height="800" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">{p.desc}</p>
          <p className="mt-3 text-sm leading-relaxed text-mute">{p.role}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {p.tags.map((t) => <li key={t} className="rounded-full bg-ink px-3 py-1 text-xs text-accent">{t}</li>)}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
            <button type="button" aria-label={`View demo showcase for ${p.title}`} className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-ink">View demo showcase</button>
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-ink">Live demo</a>}
            <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`} className="rounded-full border border-line px-5 py-2 text-sm text-neutral-300 transition-colors hover:border-accent hover:text-accent">GitHub</a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  return (
    <section id="projects" aria-labelledby="projects-h" className="mx-auto max-w-6xl px-5 py-28">
      <SectionTitle id="projects-h" sub="Open any project for its walkthrough, details and links.">Projects</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => <Card key={p.slug} p={p} index={i} onOpen={setActive} />)}
      </div>
      <ProjectModal project={active} onClose={close} />
    </section>
  )
}
