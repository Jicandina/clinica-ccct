import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Shield, Star, HeartPulse } from 'lucide-react'

const OrbScene = lazy(() => import('./3d/OrbScene'))

const stats = [
  { icon: HeartPulse, value: '34', label: 'Especialidades médicas' },
  { icon: Star,       value: '15+', label: 'Años de experiencia' },
  { icon: Shield,     value: '100%', label: 'Comprometidos contigo' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-[#050f05]">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(26,92,26,0.25)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(46,139,46,0.12)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-verde-600/40 to-transparent" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(46,139,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,139,46,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute left-6 top-1/3 hidden xl:block z-20"
      >
        <FloatingBadge icon="🏥" title="Diagnóstico" sub="Imagen de alta precisión" delay={0} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute right-6 top-1/3 hidden xl:block z-20"
      >
        <FloatingBadge icon="🧬" title="Laboratorio" sub="Resultados mismo día" delay={1} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute left-10 bottom-1/3 hidden xl:block z-20"
      >
        <FloatingBadge icon="💊" title="Farmacia" sub="Nivel C1 · CCCT" delay={2} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Left text */}
          <div className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-verde-400 animate-pulse" />
              <span className="text-verde-300 text-xs font-semibold tracking-widest uppercase">Clínica CCCT · Chuao, Caracas</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 text-shadow"
            >
              Tu salud está<br />
              en las mejores<br />
              <span className="gradient-text">manos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white/50 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              34 especialidades médicas, diagnóstico por imágenes de última generación y laboratorio clínico en el corazón de Caracas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14"
            >
              <a
                href="https://wa.me/584241684657?text=Hola,%20quisiera%20agendar%20una%20cita"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 bg-verde-600 hover:bg-verde-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-verde-500/30 hover:-translate-y-1"
              >
                <span>Agendar cita</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#precios"
                className="flex items-center justify-center gap-2 border border-white/15 text-white/80 hover:text-white hover:border-verde-500/50 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-verde-500/5"
              >
                Ver tarifario
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <Icon className="w-4 h-4 text-verde-400 mb-2 mx-auto lg:mx-0" />
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-[11px] text-white/40 leading-tight mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px]"
          >
            <Suspense fallback={
              <div className="w-full h-full rounded-full border border-verde-600/20 bg-verde-900/10 animate-pulse-slow flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-verde-600/20 animate-ping" />
              </div>
            }>
              <OrbScene />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-verde-400 transition-colors group"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">Descubrir</span>
        <div className="w-5 h-8 border border-current rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-current rounded-full animate-bounce" />
        </div>
      </motion.a>
    </section>
  )
}

function FloatingBadge({ icon, title, sub, delay }: { icon: string; title: string; sub: string; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl shadow-black/40 min-w-[180px]"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-white text-sm font-semibold leading-none">{title}</p>
        <p className="text-white/40 text-[11px] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  )
}
