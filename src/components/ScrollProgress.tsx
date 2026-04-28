import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      const p = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setProgress(p * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-transparent pointer-events-none">
      <motion.div
        style={{ width: `${progress}%` }}
        className="h-full bg-gradient-to-r from-verde-600 via-verde-400 to-verde-300 shadow-sm shadow-verde-400/50"
      />
    </div>
  )
}
