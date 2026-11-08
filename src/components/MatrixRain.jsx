import { useEffect, useRef } from 'react'

// Falling green digits on a transparent canvas. Columns near the pointer speed up and glow.
export default function MatrixRain({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const size = 18
    const mouse = { x: -9999, y: -9999 }
    let w = 0, h = 0, cols = 0, drops = [], speeds = [], raf = 0, last = 0, visible = true

    const digit = () => String(Math.floor(Math.random() * 10))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${size - 4}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      cols = Math.ceil(w / size)
      drops = Array.from({ length: cols }, () => Math.random() * (h / size))
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.7)
      if (reduce) paintStatic()
    }

    const paintStatic = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(61,255,139,0.35)'
      for (let i = 0; i < cols; i++) {
        const rows = Math.floor(Math.random() * 6)
        for (let r = 0; r < rows; r++) ctx.fillText(digit(), i * size + size / 2, drops[i] * size - r * size)
      }
    }

    const frame = (t) => {
      raf = requestAnimationFrame(frame)
      if (!visible || t - last < 45) return
      last = t
      // Fade previous frame to leave trails while keeping the canvas transparent.
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.14)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      for (let i = 0; i < cols; i++) {
        const x = i * size + size / 2
        const y = drops[i] * size
        const near = Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / 180)
        ctx.fillStyle = near > 0.05 ? `rgba(200,255,225,${0.7 + near * 0.3})` : 'rgba(61,255,139,0.75)'
        ctx.fillText(digit(), x, y)
        drops[i] += speeds[i] * (1 + near * 3)
        if (y > h && Math.random() > 0.975) drops[i] = 0
      }
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(canvas)
    resize()
    window.addEventListener('resize', resize)
    if (!reduce) {
      window.addEventListener('mousemove', onMove)
      raf = requestAnimationFrame(frame)
    }
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
