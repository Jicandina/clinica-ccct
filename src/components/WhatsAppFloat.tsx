import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'

const opciones = [
  { label: 'Agendar cita', msg: 'Hola, quisiera agendar una cita médica' },
  { label: 'Consultar precio de examen', msg: 'Hola, quisiera consultar el precio de un examen' },
  { label: 'Requisitos de examen', msg: 'Hola, quisiera saber los requisitos para un examen' },
  { label: 'Hablar con alguien', msg: 'Hola, necesito información sobre sus servicios' },
]

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass border border-white/10 rounded-2xl p-4 w-64 shadow-2xl shadow-black/50"
          >
            <p className="text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-3">
              ¿En qué te ayudamos?
            </p>
            <div className="space-y-2">
              {opciones.map((o) => (
                <a
                  key={o.label}
                  href={`https://wa.me/584241684657?text=${encodeURIComponent(o.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl bg-white/5 hover:bg-verde-500/20 border border-white/5 hover:border-verde-500/30 text-white/70 hover:text-white text-xs font-medium transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-verde-400 flex-shrink-0" />
                  {o.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-verde-500 hover:bg-verde-400 shadow-xl shadow-verde-500/40 flex items-center justify-center transition-colors duration-300"
      >
        {/* Pulse rings */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-verde-500/50 animate-ping" style={{ animationDuration: '2s' }} />
            <span className="absolute inset-[-4px] rounded-full border border-verde-400/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
          </>
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
