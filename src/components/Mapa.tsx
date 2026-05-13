import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Navigation } from 'lucide-react'

export default function Mapa() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-[#040c04] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(26,92,26,0.1)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Dónde estamos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Fácil de encontrar,<br />
            <span className="gradient-text">difícil de olvidar</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass border border-white/8 rounded-2xl p-5 hover:border-verde-500/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-verde-500/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-verde-400" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-1">Dirección</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Centro Ciudad Comercial Tamanaco (CCCT),<br />
                    Nivel C1, Chuao, Estado Miranda,<br />
                    Área Metropolitana de Caracas
                  </p>
                </div>
              </div>
            </div>

            <div className="glass border border-white/8 rounded-2xl p-5 hover:border-verde-500/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-verde-500/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-verde-400" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-3">Horario</p>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm py-1 border-b border-white/5">
                      <span className="text-white/60">Lunes – Viernes</span>
                      <span className="text-verde-400 font-semibold">7:00 – 19:00</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-white/5">
                      <span className="text-white/60">Sábado</span>
                      <span className="text-verde-400 font-semibold">7:00 – 19:00</span>
                    </div>
                    <div className="flex justify-between text-sm py-1">
                      <span className="text-white/60">Domingo</span>
                      <span className="text-white/30">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Clínica+CCCT+Caracas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-verde-600 hover:bg-verde-500 text-white font-semibold py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-verde-500/30 text-sm"
            >
              <Navigation className="w-4 h-4" />
              Abrir en Google Maps
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/8 h-80 lg:h-auto min-h-[320px] relative"
          >
            <div className="absolute inset-0 bg-verde-900/20 z-10 pointer-events-none rounded-2xl" />
            <iframe
              title="Clínica CCCT en Google Maps"
              src="https://maps.google.com/maps?q=Cl%C3%ADnica+CCCT+Caracas&output=embed&z=17"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(140deg) saturate(0.4) brightness(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
