import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [target, setTarget] = useState({ hover: false, label: '' })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 140, damping: 16, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 140, damping: 16, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest?.('a,button,input,textarea,[data-cursor]')
      const label = el?.dataset?.cursor || ''
      const hover = !!el
      setTarget((s) => (s.hover === hover && s.label === label ? s : { hover, label }))
    }
    const leave = () => x.set(-100)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null
  const size = target.label ? 88 : target.hover ? 56 : 34

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
      </motion.div>
      <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        <motion.div
          animate={{ width: size, height: size, backgroundColor: target.hover ? 'rgba(61,255,139,1)' : 'rgba(61,255,139,0)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent mix-blend-difference"
        >
          {target.label && <span className="text-[11px] font-bold text-ink">{target.label}</span>}
        </motion.div>
      </motion.div>
    </div>
  )
}
