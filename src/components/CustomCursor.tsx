import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    document.body.style.cursor = 'none'

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') !== null || el.closest('button') !== null
      )
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', over)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  useEffect(() => {
    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      setTrail((prev) => ({
        x: lerp(prev.x, pos.x, 0.12),
        y: lerp(prev.y, pos.y, 0.12),
      }))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [pos])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed z-[9998] pointer-events-none rounded-full bg-verde-400 mix-blend-difference"
        style={{ left: pos.x - 4, top: pos.y - 4, width: 8, height: 8 }}
        animate={{ scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed z-[9997] pointer-events-none rounded-full border border-verde-400/50"
        style={{
          left: trail.x - (hovering ? 20 : 14),
          top: trail.y - (hovering ? 20 : 14),
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
        }}
        animate={{ opacity: clicking ? 0.3 : 0.6 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
