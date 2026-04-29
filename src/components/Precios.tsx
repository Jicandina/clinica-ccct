import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, Info, Activity, ScanLine, Brain, FlaskConical, ClipboardList, RefreshCw } from 'lucide-react'
import {
  ecosonogramas, radiografias, tomografias, laboratorio,
  bs, type Servicio,
} from '../data/precios'
import { useBCVRate } from '../hooks/useBCVRate'

const categorias = [
  { key: 'eco', label: 'Ecosonogramas', icon: Activity,     data: ecosonogramas },
  { key: 'rx',  label: 'Radiografías',  icon: ScanLine,     data: radiografias },
  { key: 'tc',  label: 'Tomografías',   icon: Brain,        data: tomografias },
  { key: 'lab', label: 'Laboratorio',   icon: FlaskConical, data: laboratorio },
]

export default function Precios() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [cat, setCat] = useState('eco')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const { tasa, fecha, loading, error, refresh } = useBCVRate()

  const actual = categorias.find((c) => c.key === cat)!
  const filtered = actual.data.filter((s) =>
    s.nombre.toLowerCase().includes(query.toLowerCase())
  )

  const fechaLabel = fecha
    ? new Date(fecha).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })
    : null

  return (
    <section id="precios" className="py-24 bg-[#050f05] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(26,92,26,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(46,139,46,0.08)_0%,transparent_60%)]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Tarifario
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Precios <span className="gradient-text">transparentes</span>
          </h2>

          {/* Tasa BCV en vivo */}
          <div className="inline-flex items-center gap-3 mt-2 px-5 py-2.5 rounded-2xl glass border border-white/8">
            {loading ? (
              <span className="text-white/30 text-sm">Cargando tasa BCV...</span>
            ) : error ? (
              <>
                <span className="text-white/30 text-sm">Tasa BCV no disponible</span>
                <button onClick={refresh} className="text-verde-400 hover:text-verde-300 transition-colors cursor-pointer" aria-label="Reintentar">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-verde-400 animate-pulse" />
                  <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">Tasa BCV</span>
                </span>
                <span className="text-verde-400 font-bold text-lg tabular-nums">
                  {tasa.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs/$
                </span>
                {fechaLabel && (
                  <span className="text-white/25 text-[11px]">· {fechaLabel}</span>
                )}
                <button
                  onClick={refresh}
                  className="text-white/20 hover:text-verde-400 transition-colors cursor-pointer ml-1"
                  aria-label="Actualizar tasa"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-6"
        >
          {categorias.map((c) => {
            const Icon = c.icon
            return (
              <button
                key={c.key}
                onClick={() => { setCat(c.key); setQuery(''); setExpanded(null) }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer min-h-[44px] ${
                  cat === c.key
                    ? 'bg-verde-600 text-white shadow-lg shadow-verde-600/30'
                    : 'glass border border-white/10 text-white/50 hover:text-white hover:border-verde-500/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {c.label}
              </button>
            )
          })}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative max-w-md mx-auto mb-6"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder={`Buscar en ${actual.label}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full glass border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-verde-500/50 transition-colors bg-transparent"
          />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="rounded-2xl overflow-hidden border border-white/8"
        >
          <div className="grid grid-cols-12 px-5 py-3 bg-verde-900/40 border-b border-white/8">
            <span className="col-span-7 text-[11px] font-semibold text-white/40 uppercase tracking-widest">Estudio / Examen</span>
            <span className="col-span-2 text-right text-[11px] font-semibold text-white/40 uppercase tracking-widest">USD</span>
            <span className="col-span-3 text-right text-[11px] font-semibold text-white/40 uppercase tracking-widest">Bolívares</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={cat + query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0 && (
                <div className="py-12 text-center text-white/25 text-sm">No se encontraron resultados.</div>
              )}
              {filtered.map((s, i) => (
                <FilaServicio
                  key={s.nombre}
                  servicio={s}
                  tasa={tasa}
                  zebra={i % 2 === 0}
                  expanded={expanded === s.nombre}
                  onToggle={() => setExpanded(expanded === s.nombre ? null : s.nombre)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-[11px] text-white/20 mt-4"
        >
          * Precios referenciales. Haz clic en el ícono ℹ para ver preparación previa del examen.
        </motion.p>
      </div>
    </section>
  )
}

function FilaServicio({ servicio, tasa, zebra, expanded, onToggle }: {
  servicio: Servicio; tasa: number; zebra: boolean; expanded: boolean; onToggle: () => void
}) {
  const hasReq = !!servicio.requerimientos
  return (
    <div className={`border-b border-white/5 last:border-0 ${zebra ? 'bg-white/[0.01]' : ''}`}>
      <div
        onClick={hasReq ? onToggle : undefined}
        className={`grid grid-cols-12 px-5 py-3.5 items-center group ${hasReq ? 'cursor-pointer hover:bg-verde-500/5' : ''} transition-colors`}
      >
        <div className="col-span-7 flex items-center gap-2">
          <span className="text-white/70 text-sm group-hover:text-white transition-colors leading-snug">{servicio.nombre}</span>
          {hasReq && (
            <Info className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${expanded ? 'text-verde-400' : 'text-white/20 group-hover:text-verde-400/60'}`} />
          )}
        </div>
        <div className="col-span-2 text-right">
          <span className="text-verde-400 font-bold text-sm">${servicio.precio}</span>
        </div>
        <div className="col-span-3 text-right">
          <span className="text-white/40 text-xs">{bs(servicio.precio, tasa)} Bs.</span>
        </div>
      </div>
      <AnimatePresence>
        {expanded && servicio.requerimientos && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-3 pt-0">
              <div className="flex items-start gap-2 bg-verde-500/8 border border-verde-500/15 rounded-xl px-4 py-3">
                <ClipboardList className="w-3.5 h-3.5 text-verde-400 mt-0.5 flex-shrink-0" />
                <p className="text-verde-300/80 text-xs leading-relaxed">
                  <span className="font-semibold text-verde-400">Preparación: </span>
                  {servicio.requerimientos}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
