import { Reveal, SectionTitle } from './Reveal'
import { skillGroups } from '../data'

export default function Skills() {
  const all = skillGroups.flatMap((g) => g.items)
  const tape = [...all, ...all]
  return (
    <section id="stack" aria-labelledby="stack-h" className="py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle id="stack-h" sub="What I use to design, build and ship.">Tech stack</SectionTitle>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06} className="bg-panel p-7">
              <h3 className="mb-5 font-display text-xl font-bold text-white">{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} data-cursor="" className="rounded-full border border-line px-4 py-1.5 text-sm text-neutral-300 transition-colors hover:border-accent hover:text-accent">{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="tape-wrap mt-16 -rotate-1 overflow-hidden border-y border-accent bg-accent py-4" aria-hidden="true">
        <div className="tape flex w-max whitespace-nowrap">
          {tape.map((s, i) => (
            <span key={i} className="mx-6 font-display text-2xl font-bold text-ink sm:text-3xl">{s}<span className="ml-12">/</span></span>
          ))}
        </div>
      </div>
    </section>
  )
}
