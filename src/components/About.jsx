import { Reveal, SectionTitle } from './Reveal'
import { profile } from '../data'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="mx-auto max-w-6xl px-5 py-28">
      <SectionTitle id="about-h">About me</SectionTitle>
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-2xl border border-line bg-panel" data-cursor="Hi">
            <img src={profile.photo} alt="Portrait of Shrishti Dubey" width="800" height="1000" loading="lazy" className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-6 text-base leading-[1.8] text-neutral-300">
            <p className="font-display text-2xl leading-snug text-white sm:text-3xl">
              I'm a computer engineering student who builds things that look sharp and hold up under the hood.
            </p>
            <p>My journey started with the core web fundamentals. That curiosity grew into a passion for crafting interactive, responsive interfaces and scalable web products.</p>
            <p>I care about both sides of the work: the visual craft of micro-interactions, accessibility and modern layouts, and a clean code structure behind them.</p>
            <p>Away from the keyboard I train in sports and martial arts. The discipline, consistency and focus carry straight into how I ship.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
