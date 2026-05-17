import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: '¿Necesito cita previa para ser atendido?',
    a: 'Para consultas con especialistas recomendamos agendar cita previa por WhatsApp para garantizar tu turno. Para laboratorio y algunos estudios de imagen puedes llegar directamente en nuestro horario de atención.',
  },
  {
    q: '¿Cuánto tiempo tarda en estar listo mi resultado?',
    a: 'Los exámenes de laboratorio de rutina están listos el mismo día. Las pruebas especiales de laboratorio pueden tomar entre 7 y 12 días hábiles. Los estudios de imagen (ecosonogramas, radiografías, tomografías) se entregan de forma inmediata. El informe escrito del radiólogo está listo en 72 horas hábiles.',
  },
  {
    q: '¿Aceptan seguros médicos o HCM?',
    a: 'Trabajamos con las principales aseguradoras del mercado venezolano. Te recomendamos consultar directamente por WhatsApp para verificar si tu seguro o HCM aplica para los servicios que necesitas.',
  },
  {
    q: '¿Cómo me preparo para un examen de laboratorio?',
    a: 'Depende del examen. La mayoría requieren ayuno de 8 a 12 horas. En la sección de Precios puedes hacer clic en cada examen para ver los requisitos específicos. También puedes consultarnos por WhatsApp.',
  },
  {
    q: '¿En qué parte del CCCT están ubicados?',
    a: 'Estamos en el Nivel C1 del Centro Ciudad Comercial Tamanaco (CCCT), en Chuao, Estado Miranda, Área Metropolitana de Caracas. Hay estacionamiento disponible en el centro comercial.',
  },
  {
    q: '¿Cuál es el horario de atención?',
    a: 'Laboratorio e Imagenología: lunes a domingo de 7:00 am a 6:00 pm. Consultas médicas: lunes a sábado de 7:00 am a 7:00 pm. Emergencia: 24 horas todos los días. Puedes escribirnos por WhatsApp fuera del horario y te responderemos apenas abramos.',
  },
  {
    q: '¿Puedo pagar en dólares o en bolívares?',
    a: 'Aceptamos ambas monedas. Los precios están expresados en USD y en bolívares a la tasa BCV del día. Consulta los métodos de pago disponibles directamente en recepción o por WhatsApp.',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-[#050f05] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(26,92,26,0.1)_0%,transparent_60%)]" />

      <div className="max-w-3xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Preguntas frecuentes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Todo lo que quieres<br />
            <span className="gradient-text">saber</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? 'border-verde-500/40 bg-verde-500/5'
                  : 'border-white/8 glass hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left group"
              >
                <span className={`font-semibold text-sm leading-snug transition-colors ${open === i ? 'text-verde-300' : 'text-white/80 group-hover:text-white'}`}>
                  {f.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${open === i ? 'bg-verde-500/30 text-verde-300' : 'bg-white/5 text-white/40'}`}>
                  {open === i
                    ? <Minus className="w-3 h-3" />
                    : <Plus className="w-3 h-3" />
                  }
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <p className="text-white/30 text-sm mb-4">¿No encontraste tu respuesta?</p>
          <a
            href="https://wa.me/584241684657?text=Hola,%20tengo%20una%20pregunta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-verde-500/40 text-verde-300 hover:text-white hover:bg-verde-500/10 font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm"
          >
            Pregúntanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
