import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { especialidades } from '../data/precios'
import { Search } from 'lucide-react'

export default function Especialidades() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [query, setQuery] = useState('')

  const filtered = especialidades.filter((e) =>
    e.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section id="especialidades" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050f05 0%, #071407 50%, #050f05 100%)' }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(46,139,46,1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(46,139,46,0.08)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Especialidades
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            {especialidades.length} especialidades<br />
            <span className="gradient-text">a tu disposición</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
            Atención médica integral con los mejores especialistas del Área Metropolitana de Caracas.
          </p>

          {/* Search */}
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar especialidad..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full glass border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-verde-500/50 transition-colors bg-transparent"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((esp, i) => (
              <motion.div
                key={esp}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: inView && !query ? i * 0.02 : 0 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass border border-white/8 hover:border-verde-500/40 rounded-full px-4 py-2 cursor-default group transition-all duration-200 hover:bg-verde-500/5"
              >
                <span className="text-white/60 group-hover:text-verde-300 text-xs font-medium transition-colors">
                  {esp}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-white/30 text-sm py-8">No se encontró esa especialidad.</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/584241684657?text=Hola,%20quisiera%20agendar%20consulta%20con%20un%20especialista"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-verde-600 hover:bg-verde-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-verde-500/30 hover:-translate-y-1"
          >
            Consultar disponibilidad
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
