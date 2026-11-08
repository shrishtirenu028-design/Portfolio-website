import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ id, children, sub }) {
  return (
    <div className="mb-12 md:mb-16">
      <h2 id={id} className="font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-6xl">{children}</h2>
      {sub && <p className="mt-4 max-w-xl text-sm text-mute">{sub}</p>}
    </div>
  )
}
