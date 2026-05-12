import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Precios', href: '#precios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 md:top-[33px] inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050f05]/90 backdrop-blur-xl border-b border-verde-600/20 shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18 py-4">
          <a href="#inicio" className="flex items-center gap-2 group" />

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-sm text-white/60 hover:text-verde-300 transition-colors font-medium relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-verde-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+584241684657"
              className="flex items-center gap-2 text-verde-300 text-sm font-medium hover:text-verde-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +58 424 168 4657
            </a>
            <a
              href="https://wa.me/584241684657?text=Hola,%20quisiera%20agendar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-verde-600 hover:bg-verde-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-verde-500/30 hover:-translate-y-0.5"
            >
              Agendar cita
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[66px] md:top-[99px] z-40 bg-[#050f05]/95 backdrop-blur-xl border-b border-verde-600/20 lg:hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[44px] py-2 text-white/70 hover:text-verde-300 transition-colors font-medium text-sm border-b border-white/5 cursor-pointer"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://wa.me/584241684657"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 bg-verde-600 text-white text-sm font-semibold px-5 py-3 rounded-full text-center"
              >
                Agendar cita por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
