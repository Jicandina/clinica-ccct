import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, CreditCard, MessageCircle, CalendarCheck, HelpCircle } from 'lucide-react'

const wa = (msg: string) => `https://wa.me/584241684657?text=${encodeURIComponent(msg)}`

const acciones = [
  {
    icon: CalendarCheck,
    label: 'Agendar cita',
    sub: 'Elige tu especialidad y horario',
    href: wa('Hola, quisiera agendar una cita médica'),
    primary: true,
  },
  {
    icon: CreditCard,
    label: 'Consultar precio',
    sub: 'Tarifas de exámenes y consultas',
    href: wa('Hola, quisiera consultar el precio de un examen'),
    primary: false,
  },
  {
    icon: HelpCircle,
    label: 'Requisitos de examen',
    sub: 'Preparación previa y ayunos',
    href: wa('Hola, quisiera saber los requisitos para un examen'),
    primary: false,
  },
]

export default function Contacto() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contacto" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050f05 0%, #071407 100%)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(46,139,46,0.12)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-verde-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-verde-400" />
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Estamos aquí<br />
            <span className="gradient-text">para cuidarte</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-3"
          >
            {[
              {
                icon: MapPin,
                titulo: 'Ubicación',
                texto: 'Centro Ciudad Comercial Tamanaco (CCCT), Nivel C1, Chuao, Estado Miranda, Área Metropolitana de Caracas',
              },
              {
                icon: Phone,
                titulo: 'WhatsApp',
                texto: '+58 424 168 4657',
                href: wa('Hola'),
              },
              {
                icon: Clock,
                titulo: 'Horario de atención',
                texto: 'Lunes a Sábado · 7:00 am – 7:00 pm',
              },
              {
                icon: CreditCard,
                titulo: 'RIF',
                texto: 'J-30642067-3',
              },
            ].map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.titulo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="glass border border-white/8 rounded-2xl p-4 flex items-start gap-4 hover:border-verde-500/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-verde-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-verde-500/25 transition-colors">
                    <Icon className="w-5 h-5 text-verde-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/30 text-[11px] font-semibold uppercase tracking-widest mb-0.5">{card.titulo}</p>
                    {card.href ? (
                      <a href={card.href} target="_blank" rel="noopener noreferrer"
                        className="text-verde-300 font-semibold text-sm hover:text-verde-200 transition-colors">
                        {card.texto}
                      </a>
                    ) : (
                      <p className="text-white/70 text-sm leading-relaxed">{card.texto}</p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden border border-verde-600/30"
            style={{ background: 'linear-gradient(135deg, rgba(26,92,26,0.35) 0%, rgba(14,54,14,0.6) 100%)' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(76,191,76,0.1)_0%,transparent_60%)]" />

            <div className="relative z-10 p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-verde-500/20 border border-verde-500/30 flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7 text-verde-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Escríbenos por WhatsApp</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                Respuesta rápida. Sin filas. Sin espera. Agenda, consulta precios o pregunta lo que necesites.
              </p>

              <div className="space-y-3">
                {acciones.map((a, i) => {
                  const Icon = a.icon
                  return (
                    <motion.a
                      key={a.label}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-4 w-full px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                        a.primary
                          ? 'bg-verde-500 hover:bg-verde-400 text-white shadow-lg shadow-verde-500/30'
                          : 'glass border border-white/10 text-white/70 hover:text-white hover:border-verde-500/30'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <div className="text-left">
                        <p className="font-semibold text-sm leading-none">{a.label}</p>
                        <p className={`text-[11px] mt-0.5 ${a.primary ? 'text-verde-100/70' : 'text-white/30'}`}>{a.sub}</p>
                      </div>
                      <span className="ml-auto opacity-60">→</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
