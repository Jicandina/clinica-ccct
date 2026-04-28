import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Scan, FlaskConical, Stethoscope, Microscope, MessageCircle, Activity } from 'lucide-react'

const servicios = [
  {
    icon: Activity,
    titulo: 'Ecosonogramas',
    desc: 'Diagnóstico por ultrasonido de alta resolución. Abdominal, pélvico, tiroideo, mamas, renal y más.',
    color: 'from-verde-600/20 to-verde-500/5',
    border: 'border-verde-600/30',
    iconColor: 'text-verde-400',
    iconBg: 'bg-verde-500/15',
  },
  {
    icon: Scan,
    titulo: 'Radiología (RX)',
    desc: 'Más de 50 tipos de estudios radiológicos, incluyendo mamografía bilateral y densitometría ósea.',
    color: 'from-emerald-600/20 to-emerald-500/5',
    border: 'border-emerald-600/30',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
  },
  {
    icon: Microscope,
    titulo: 'Tomografía (TC)',
    desc: 'Tomografías multicorte de cráneo, columna, tórax, abdomen, pelvis y extremidades con y sin contraste.',
    color: 'from-teal-600/20 to-teal-500/5',
    border: 'border-teal-600/30',
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/15',
  },
  {
    icon: FlaskConical,
    titulo: 'Laboratorio Clínico',
    desc: 'Análisis de sangre, orina y estudios especializados. Resultados rápidos el mismo día.',
    color: 'from-lime-600/20 to-lime-500/5',
    border: 'border-lime-600/30',
    iconColor: 'text-lime-400',
    iconBg: 'bg-lime-500/15',
  },
  {
    icon: Stethoscope,
    titulo: 'Consultas Médicas',
    desc: '34 especialidades médicas con profesionales de alto nivel. Desde medicina general hasta subespecialidades.',
    color: 'from-green-600/20 to-green-500/5',
    border: 'border-green-600/30',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/15',
  },
  {
    icon: MessageCircle,
    titulo: 'Atención por WhatsApp',
    desc: 'Consulta precios, requerimientos y agenda tu cita en segundos directamente desde tu celular.',
    color: 'from-verde-700/20 to-verde-600/5',
    border: 'border-verde-700/30',
    iconColor: 'text-verde-300',
    iconBg: 'bg-verde-600/15',
  },
]

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Servicios() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" className="py-24 bg-[#050f05] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(26,92,26,0.15)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Todo lo que necesitas,<br />
            <span className="gradient-text">bajo un mismo techo</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Diagnóstico, imágenes, laboratorio y consulta especializada en el Centro Ciudad Comercial Tamanaco.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {servicios.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.titulo}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`relative rounded-2xl p-6 border ${s.border} bg-gradient-to-br ${s.color} backdrop-blur-sm cursor-default group transition-all duration-300 hover:shadow-xl hover:shadow-black/40`}
              >
                <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{s.titulo}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>

                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-verde-500/50 group-hover:bg-verde-400 transition-colors" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
