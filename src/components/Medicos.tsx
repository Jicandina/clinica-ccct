import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Clock, Search, X } from 'lucide-react'
import { medicos, especialidadesMedicos } from '../data/medicos'

export default function Medicos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [query, setQuery] = useState('')
  const [filtroEsp, setFiltroEsp] = useState('')

  const filtered = medicos.filter(m => {
    const matchQ = !query ||
      m.nombre.toLowerCase().includes(query.toLowerCase()) ||
      m.especialidad.toLowerCase().includes(query.toLowerCase())
    const matchE = !filtroEsp || m.especialidad === filtroEsp
    return matchQ && matchE
  })

  return (
    <section
      id="especialidades"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #071407 0%, #050f05 50%, #071407 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(46,139,46,1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(46,139,46,0.06)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Especialidades · Médicos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            {medicos.length} especialistas<br />
            <span className="gradient-text">a tu disposición</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
            Filtra por especialidad o busca a tu médico para ver su horario de consulta.
          </p>

          {/* Search */}
          <div className="relative max-w-sm mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar médico o especialidad..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full glass border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-verde-500/50 transition-colors bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtro especialidad */}
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            <button
              onClick={() => setFiltroEsp('')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                !filtroEsp
                  ? 'bg-verde-600 text-white'
                  : 'glass border border-white/10 text-white/50 hover:border-verde-500/40 hover:text-verde-300'
              }`}
            >
              Todas
            </button>
            {especialidadesMedicos.map(esp => (
              <button
                key={esp}
                onClick={() => setFiltroEsp(filtroEsp === esp ? '' : esp)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  filtroEsp === esp
                    ? 'bg-verde-600 text-white'
                    : 'glass border border-white/10 text-white/50 hover:border-verde-500/40 hover:text-verde-300'
                }`}
              >
                {esp}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((m, i) => (
                  <motion.div
                    key={m.nombre}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: inView && !query && !filtroEsp ? i * 0.015 : 0 }}
                    className="group glass border border-white/8 hover:border-verde-500/30 rounded-2xl p-4 transition-all duration-200 hover:bg-verde-500/5"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}
                      >
                        <span className="text-verde-400 text-sm font-bold">
                          {m.nombre.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm leading-tight truncate group-hover:text-verde-100 transition-colors">
                          {m.nombre}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-verde-400 bg-verde-400/10 border border-verde-400/20">
                          {m.especialidad}
                        </span>
                        {m.horario && (
                          <div className="flex items-start gap-1.5 mt-2">
                            <Clock className="w-3 h-3 text-white/30 flex-shrink-0 mt-0.5" />
                            <p className="text-white/45 text-[11px] leading-relaxed">{m.horario}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/30 text-sm py-12 text-center"
              >
                No se encontró ningún médico con ese criterio.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
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
            Agendar consulta por WhatsApp
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
