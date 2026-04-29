import { useState, useEffect } from 'react'

const CACHE_KEY = 'bcv_cache_v1'
const CACHE_TTL = 4 * 60 * 60 * 1000 // 4 horas
const FALLBACK_TASA = 84 // si la API no responde

interface Cache {
  tasa: number
  fecha: string | null
  ts: number
}

export function useBCVRate() {
  const [tasa, setTasa] = useState<number>(FALLBACK_TASA)
  const [fecha, setFecha] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function fetchRate(force = false) {
    setLoading(true)
    setError(false)

    // Leer cache
    if (!force) {
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (raw) {
          const cached: Cache = JSON.parse(raw)
          if (Date.now() - cached.ts < CACHE_TTL) {
            setTasa(cached.tasa)
            setFecha(cached.fecha)
            setLoading(false)
            return
          }
        }
      } catch { /* ignore */ }
    }

    // Fetch desde Cloudflare Function (mismo origen, sin CORS)
    try {
      const res = await fetch('/api/bcv-rate')
      if (!res.ok) throw new Error()
      const data = await res.json() as { tasa?: number; fecha?: string; error?: string }
      if (!data.tasa) throw new Error()

      const cache: Cache = { tasa: data.tasa, fecha: data.fecha ?? null, ts: Date.now() }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
      setTasa(data.tasa)
      setFecha(data.fecha ?? null)
    } catch {
      setError(true)
      // Mantener cache vencida si existe
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (raw) {
          const cached: Cache = JSON.parse(raw)
          setTasa(cached.tasa)
          setFecha(cached.fecha)
        }
      } catch { /* usar fallback */ }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRate() }, [])

  return { tasa, fecha, loading, error, refresh: () => fetchRate(true) }
}
