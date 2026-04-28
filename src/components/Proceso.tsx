import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, CalendarCheck, FlaskConical, CheckCircle } from 'lucide-react'

const pasos = [
  {
    num: '01',
    icon: MessageCircle,
    titulo: 'Escríbenos por WhatsApp',
    desc: 'Cuéntanos qué necesitas. Te respondemos en minutos y te orientamos con el especialista o examen adecuado.',
  },
  {
    num: '02',
    icon: CalendarCheck,
    titulo: 'Ven a tu cita',
    desc: 'Llega a nuestra sede en el Nivel C1 del CCCT. Atención puntual, trato humano, sin esperas innecesarias.',
  },
  {
    num: '03',
    icon: FlaskConical,
    titulo: 'Realizamos tu estudio',
    desc: 'Nuestros especialistas realizan tu consulta, examen o estudio con equipos de última generación.',
  },
  {
    num: '04',
    icon: CheckCircle,
    titulo: 'Recibe tus resultados',
    desc: 'La mayoría de resultados están listos el mismo día. Los recibes directamente y con explicación médica.',
  },
]

export default function Proceso() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 relative overflow-hidden bg-[#040c04]">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(46,139,46,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(26,92,26,0.1)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Cómo funciona
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Simple, rápido<br />
            <span className="gradient-text">y sin complicaciones</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-verde-600/30 to-transparent hidden lg:block" />

          {pasos.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center group"
              >
                {/* Step circle */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <motion.div
                    animate={inView ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                    className="w-full h-full rounded-full glass-green border border-verde-500/30 flex items-center justify-center group-hover:border-verde-400/60 transition-colors"
                  >
                    <Icon className="w-7 h-7 text-verde-400" />
                  </motion.div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-verde-600 border-2 border-[#040c04] flex items-center justify-center">
                    <span className="text-[9px] font-black text-white">{p.num}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm mb-3 leading-snug">{p.titulo}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/584241684657?text=Hola,%20quisiera%20comenzar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-verde-600 hover:bg-verde-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-verde-500/30 hover:-translate-y-1"
          >
            Comenzar ahora
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
