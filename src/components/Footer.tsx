export default function Footer() {
  return (
    <footer className="relative bg-[#030a03] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(26,92,26,0.08)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-verde-500/20 border border-verde-500/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-verde-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Clínica CCCT</p>
              <p className="text-white/30 text-[10px] mt-0.5">RIF: J-30642067-3</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/25 text-xs">
              Nivel C1 · CCCT · Chuao · Caracas · +58 424 168 4657
            </p>
            <p className="text-white/15 text-xs mt-1">
              © {new Date().getFullYear()} Clínica CCCT · Todos los derechos reservados
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/20 text-[10px] uppercase tracking-widest">Desarrollado por</p>
            <p className="text-verde-500 font-bold text-sm tracking-tight">Nodo Studio</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
