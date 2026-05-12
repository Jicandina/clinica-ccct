import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Star, HeartPulse, ScanSearch, Microscope, Stethoscope, Bot } from 'lucide-react'

const OrbScene = lazy(() =>
  window.innerWidth >= 768
    ? import('./3d/OrbScene')
    : Promise.resolve({ default: () => React.createElement(React.Fragment) })
)

function useCounter(target: number, duration = 1800, active = true) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return value
}

function AnimatedStat({ icon: Icon, value, suffix, label }: { icon: any; value: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCounter(value, 1600, inView)
  return (
    <div ref={ref} className="text-center lg:text-left">
      <Icon className="w-4 h-4 text-verde-400 mb-2 mx-auto lg:mx-0" />
      <p className="text-2xl font-bold text-white tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-[11px] text-white/40 leading-tight mt-0.5">{label}</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-[#050f05]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Medical photo with heavy dark overlay */}
        <img
          src="/fotos/img_2580.webp"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(26,92,26,0.28)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(46,139,46,0.12)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-verde-600/40 to-transparent" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(46,139,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,139,46,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 md:pt-36 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Left text */}
          <div className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-verde-400 animate-pulse" />
              <span className="text-verde-300 text-xs font-semibold tracking-widest uppercase">Clínica CCCT · Chuao, Caracas</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="flex items-center gap-3 mb-6 justify-center lg:justify-start"
            >
              <div className="bg-white rounded-lg px-2 py-0.5 flex items-center">
                <img src="/logo.png" alt="Clínica CCCT" className="h-7 w-auto" />
              </div>
              <button
                onClick={() => window.dispatchEvent(new Event('openChat'))}
                className="flex items-center gap-1.5 glass border border-white/10 hover:border-verde-500/40 rounded-full px-3 py-1.5 text-verde-300 text-xs font-medium hover:bg-verde-500/10 transition-all duration-200"
              >
                <Bot className="w-4 h-4" />
                Chat IA
              </button>
              <a
                href="https://wa.me/584241684657"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 glass border border-white/10 hover:border-verde-500/40 rounded-full px-3 py-1.5 text-verde-300 text-xs font-medium hover:bg-verde-500/10 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp DM
              </a>
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

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0"
            >
              <AnimatedStat icon={HeartPulse} value={34} label="Especialidades" />
              <AnimatedStat icon={Star} value={15} suffix="+" label="Años de exp." />
              <AnimatedStat icon={Shield} value={100} suffix="%" label="Comprometidos" />
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-5 flex flex-col gap-1.5 justify-center lg:justify-start"
            >
              {[
                { icon: ScanSearch, text: 'Diagnóstico por imágenes de alta precisión' },
                { icon: Microscope, text: 'Laboratorio clínico — resultados mismo día' },
                { icon: Stethoscope, text: '34 especialidades médicas · Atención integral' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-white/40 text-[11px]">
                  <Icon className="w-3 h-3 text-verde-500 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </motion.ul>
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
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-verde-400 transition-colors"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">Descubrir</span>
        <div className="w-5 h-8 border border-current rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-current rounded-full animate-bounce" />
        </div>
      </motion.a>
    </section>
  )
}

