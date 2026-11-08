import { motion } from 'framer-motion'
import { profile, stats } from '../data'
import MatrixRain from './MatrixRain'

const line = { hidden: { y: '110%' }, show: (i) => ({ y: 0, transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }) }

export default function Hero() {
  return (
    <section id="top" className="grid-bg relative flex min-h-screen items-end overflow-hidden pb-16 pt-32">
      <MatrixRain className="opacity-60 [mask-image:linear-gradient(to_bottom,black,black_35%,transparent_90%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-xs text-mute">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
          {profile.status}
        </motion.p>

        <h1 className="font-display text-[clamp(3.2rem,13vw,10.5rem)] font-bold leading-[0.88] tracking-tighter text-white">
          {['Shrishti', 'Dubey'].map((w, i) => (
            <span key={w} className="block overflow-hidden pb-2">
              <motion.span custom={i} variants={line} initial="hidden" animate="show" className={`block ${i === 1 ? 'stroke-text' : ''}`}>{w}</motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
            <p className="max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              Frontend developer building high-impact, interactive digital experiences. Clean aesthetics, solid engineering.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="rounded-full bg-accent px-7 py-3 text-sm font-bold text-ink transition-transform hover:scale-[1.03]">See my projects</a>
              <a href="#contact" className="rounded-full border border-accent px-7 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-ink">Hire me</a>
            </div>
          </motion.div>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="grid grid-cols-3 gap-4 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.value}>
                <dt className="font-display text-3xl font-bold text-accent sm:text-4xl">{s.value}</dt>
                <dd className="mt-1 text-[11px] leading-snug text-mute">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
