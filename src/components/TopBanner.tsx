import { Phone, Clock, MapPin } from 'lucide-react'

export default function TopBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-[#050f05] border-b border-verde-600/25 text-white text-xs py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-white/80">
            <Clock className="w-3 h-3" />
            Lab & Imágenes: Lun–Dom · 7:00 am – 6:00 pm
          </span>
          <span className="flex items-center gap-1.5 text-red-400 font-semibold">
            Emergencia 24h
          </span>
          <span className="flex items-center gap-1.5 text-white/80">
            <MapPin className="w-3 h-3" />
            Nivel C1, CCCT, Chuao, Caracas
          </span>
        </div>
        <a
          href="https://wa.me/584241684657"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-semibold hover:text-verde-100 transition-colors"
        >
          <Phone className="w-3 h-3" />
          +58 424 168 4657
        </a>
      </div>
    </div>
  )
}
