export async function onRequest(): Promise<Response> {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      headers: { 'Accept': 'application/json' },
    })

    if (!res.ok) throw new Error('API error')

    const data = await res.json() as {
      promedio?: number
      promedio_real?: number
      fechaActualizacion?: string
    }

    const tasa = data.promedio ?? data.promedio_real ?? null

    if (!tasa) throw new Error('No rate in response')

    return new Response(
      JSON.stringify({ tasa, fecha: data.fechaActualizacion ?? null }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=14400', // Cloudflare edge cache 4h
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch {
    return new Response(
      JSON.stringify({ error: 'No disponible' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
