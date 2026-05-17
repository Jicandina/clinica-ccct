export default function Footer() {
  return (
    <footer className="relative bg-[#030a03] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(26,92,26,0.08)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo + info */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg px-1.5 py-0.5 w-fit">
              <img src="/logo.png" alt="Clínica CCCT" className="h-9 w-auto" />
            </div>
            <p className="text-white/35 text-xs leading-relaxed max-w-[200px]">
              Salud de calidad en el corazón de Caracas. 34 especialidades médicas bajo un mismo techo.
            </p>
            <p className="text-white/20 text-[10px]">RIF: J-30642067-3</p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">Navegación</p>
            <div className="space-y-2">
              {[
                { label: 'Servicios', href: '#servicios' },
                { label: 'Especialidades', href: '#especialidades' },
                { label: 'Galería', href: '#galeria' },
                { label: 'Tarifario', href: '#precios' },
                { label: 'Preguntas frecuentes', href: '#faq' },
                { label: 'Contacto', href: '#contacto' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-white/40 hover:text-verde-300 text-xs transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">Contacto</p>
            <div className="space-y-2 text-xs text-white/40">
              <p>Nivel C1, CCCT, Chuao</p>
              <p>Estado Miranda, Caracas</p>
              <a
                href="https://wa.me/584241684657"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-verde-400 hover:text-verde-300 transition-colors font-medium"
              >
                +58 424 168 4657
              </a>
              <p>Lab & Imágenes: Lun–Dom · 7:00 am – 6:00 pm</p>
              <p className="text-red-400 font-medium">Emergencia: 24 horas</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">
            © {new Date().getFullYear()} Clínica CCCT · Todos los derechos reservados
          </p>
          <div className="text-center md:text-right">
            <p className="text-white/20 text-[10px] uppercase tracking-widest">Desarrollado por</p>
            <p className="text-verde-500 font-bold text-sm tracking-tight">Nodo Studio</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
