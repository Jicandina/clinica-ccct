import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const categorias = ['Todos', 'Instalaciones', 'Equipos', 'Laboratorio']

const fotos = [
  // Instalaciones
  { src: '/fotos/img_2570.webp', label: 'Área de hospitalización', cat: 'Instalaciones' },
  { src: '/fotos/img_2572.webp', label: 'Pasillo clínico',         cat: 'Instalaciones' },
  { src: '/fotos/img_2575.webp', label: 'Sala de espera',          cat: 'Instalaciones' },
  { src: '/fotos/img_2580.webp', label: 'Habitación',              cat: 'Instalaciones' },
  { src: '/fotos/img_2582.webp', label: 'Habitación individual',   cat: 'Instalaciones' },
  { src: '/fotos/img_2584.webp', label: 'Pasillo de acceso',       cat: 'Instalaciones' },
  { src: '/fotos/img_2645.webp', label: 'Acceso principal',        cat: 'Instalaciones' },
  { src: '/fotos/img_2647.webp', label: 'Entrada principal',       cat: 'Instalaciones' },
  { src: '/fotos/img_2650.webp', label: 'Fachada exterior',        cat: 'Instalaciones' },
  { src: '/fotos/img_2653.webp', label: 'Área de consultas',       cat: 'Instalaciones' },
  { src: '/fotos/img_2657.webp', label: 'Sala de consulta',        cat: 'Instalaciones' },
  { src: '/fotos/img_2660.webp', label: 'Área clínica',            cat: 'Instalaciones' },
  { src: '/fotos/img_2663.webp', label: 'Quirófano',               cat: 'Instalaciones' },
  { src: '/fotos/img_2672.webp', label: 'Área de emergencias',     cat: 'Instalaciones' },
  { src: '/fotos/img_2675.webp', label: 'Área de recuperación',    cat: 'Instalaciones' },
  { src: '/fotos/img_2679.webp', label: 'Área de triaje',          cat: 'Instalaciones' },
  { src: '/fotos/img_2684.webp', label: 'Módulo de atención',      cat: 'Instalaciones' },
  { src: '/fotos/img_2686.webp', label: 'Recepción',               cat: 'Instalaciones' },
  { src: '/fotos/img_2701.webp', label: 'Área administrativa',     cat: 'Instalaciones' },
  // Equipos
  { src: '/fotos/img_2594.webp', label: 'Sala de radiología',      cat: 'Equipos' },
  { src: '/fotos/img_2600.webp', label: 'Mamógrafo GE',            cat: 'Equipos' },
  { src: '/fotos/img_2602.webp', label: 'Equipo de diagnóstico',   cat: 'Equipos' },
  { src: '/fotos/img_2611.webp', label: 'Ecosonógrafo',            cat: 'Equipos' },
  { src: '/fotos/img_2613.webp', label: 'Equipo de ultrasonido',   cat: 'Equipos' },
  // Laboratorio
  { src: '/fotos/img_2620.webp', label: 'Toma de muestras',        cat: 'Laboratorio' },
  { src: '/fotos/img_2622.webp', label: 'Equipos de laboratorio',  cat: 'Laboratorio' },
  { src: '/fotos/img_2624.webp', label: 'Estación de trabajo',     cat: 'Laboratorio' },
  { src: '/fotos/img_2626.webp', label: 'Laboratorio clínico',     cat: 'Laboratorio' },
  { src: '/fotos/img_2628.webp', label: 'Área de muestras',        cat: 'Laboratorio' },
]

export default function Galeria() {
  const [catActiva, setCatActiva] = useState('Todos')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtradas = catActiva === 'Todos' ? fotos : fotos.filter(f => f.cat === catActiva)

  function prev() {
    if (lightbox === null) return
    setLightbox((lightbox - 1 + filtradas.length) % filtradas.length)
  }
  function next() {
    if (lightbox === null) return
    setLightbox((lightbox + 1) % filtradas.length)
  }

  return (
    <section id="galeria" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #040c04 0%, #050f05 100%)' }}>
      <div className="absolute -right-40 top-1/2 w-96 h-96 rounded-full bg-verde-600/8 blur-[120px]" />

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
            Nuestras instalaciones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Conoce la <span className="gradient-text">Clínica CCCT</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Instalaciones modernas, equipos de última generación y espacios diseñados para tu comodidad.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => { setCatActiva(cat); setLightbox(null) }}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={catActiva === cat
                ? { background: 'linear-gradient(135deg, #2e8b2e, #1a5c1a)', color: '#fff', boxShadow: '0 4px 16px rgba(46,139,46,0.35)' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div key={catActiva} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtradas.map((foto, i) => (
            <motion.div
              key={foto.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="cursor-pointer group relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3/4' }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={foto.src}
                alt={foto.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-semibold">{foto.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X size={20} />
            </button>

            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl max-h-[85vh] px-16"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtradas[lightbox].src}
                alt={filtradas[lightbox].label}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-white/60 text-sm text-center mt-4">{filtradas[lightbox].label}</p>
            </motion.div>

            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs">
              {lightbox + 1} / {filtradas.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
