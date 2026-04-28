import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, ShieldCheck, MapPin, Timer, Award, Users } from 'lucide-react'

const razones = [
  {
    icon: Award,
    titulo: 'Equipo certificado',
    desc: 'Médicos especialistas con años de experiencia y certificaciones nacionales e internacionales.',
    stat: '34+', statLabel: 'especialistas',
  },
  {
    icon: Zap,
    titulo: 'Tecnología de punta',
    desc: 'Equipos de diagnóstico por imágenes de última generación para resultados precisos y rápidos.',
    stat: '3', statLabel: 'modalidades de imagen',
  },
  {
    icon: MapPin,
    titulo: 'Ubicación premium',
    desc: 'En el corazón de Caracas, dentro del CCCT, con estacionamiento y acceso fácil desde toda la ciudad.',
    stat: 'C1', statLabel: 'Nivel CCCT',
  },
  {
    icon: Timer,
    titulo: 'Resultados el mismo día',
    desc: 'La mayoría de nuestros exámenes de laboratorio y estudios de imagen están listos el mismo día.',
    stat: '24h', statLabel: 'o menos',
  },
  {
    icon: ShieldCheck,
    titulo: 'Confidencialidad total',
    desc: 'Tu información médica está protegida bajo estrictos protocolos de privacidad y ética médica.',
    stat: '100%', statLabel: 'privado y seguro',
  },
  {
    icon: Users,
    titulo: 'Atención personalizada',
    desc: 'Cada paciente recibe atención individual. Sin filas interminables, con citas puntuales y trato humano.',
    stat: '1:1', statLabel: 'médico–paciente',
  },
]

export default function PorQueNosotros() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050f05 0%, #040c04 100%)' }}>
      {/* Left glow */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-verde-600/10 blur-[100px]" />
      {/* Right glow */}
      <div className="absolute -right-40 top-1/3 w-80 h-80 rounded-full bg-verde-500/8 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            La diferencia la hace<br />
            <span className="gradient-text">quién te cuida</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            No somos solo una clínica. Somos el lugar donde tu salud es la prioridad absoluta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {razones.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.titulo}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative glass border border-white/8 hover:border-verde-500/30 rounded-2xl p-6 group transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-6xl font-black text-white/[0.02] leading-none select-none pr-4 pt-2">
                  {r.stat}
                </div>

                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-verde-500/15 border border-verde-500/20 flex items-center justify-center group-hover:bg-verde-500/25 transition-colors">
                    <Icon className="w-5 h-5 text-verde-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-verde-400 leading-none">{r.stat}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{r.statLabel}</p>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base mb-2">{r.titulo}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>

                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-verde-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
