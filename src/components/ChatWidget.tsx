import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  synthetic?: boolean
}

const WELCOME: Message = {
  role: 'assistant',
  content: '¡Hola! 👋 Soy el asistente virtual de Clínica CCCT. Puedo ayudarte con precios, horarios, especialidades y más. ¿En qué puedo ayudarte hoy?',
  synthetic: true,
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250)
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const payload = next.filter((m) => !m.synthetic)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      })
      const data = await res.json() as { reply: string }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, hubo un error. Por favor llama al +58 424 168 4657.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-80 sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              height: '520px',
              background: 'linear-gradient(160deg, #0d1f0d 0%, #050f05 100%)',
              border: '1px solid rgba(74,222,128,0.15)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(74,222,128,0.08)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: 'rgba(20,83,45,0.4)', borderBottom: '1px solid rgba(74,222,128,0.12)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.25)' }}
              >
                <Bot size={17} className="text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">Asistente Clínica CCCT</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 4px #4ade80' }} />
                  <span className="text-green-400 text-[11px]">En línea ahora</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white transition-colors flex-shrink-0"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #16a34a, #15803d)',
                            color: '#fff',
                            borderBottomRightRadius: '4px',
                          }
                        : {
                            background: 'rgba(20,83,45,0.35)',
                            color: 'rgba(255,255,255,0.88)',
                            border: '1px solid rgba(74,222,128,0.1)',
                            borderBottomLeftRadius: '4px',
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{
                      background: 'rgba(20,83,45,0.35)',
                      border: '1px solid rgba(74,222,128,0.1)',
                      borderBottomLeftRadius: '4px',
                    }}
                  >
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-green-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 flex gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(74,222,128,0.1)' }}
            >
              <input
                ref={inputRef}
                className="flex-1 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(74,222,128,0.15)',
                }}
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                disabled={loading}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(74,222,128,0.15)')}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: input.trim() && !loading ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.2)',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={15} className={input.trim() && !loading ? 'text-white' : 'text-green-800'} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          boxShadow: '0 8px 24px rgba(22,163,74,0.4)',
        }}
      >
        {!open && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(22,163,74,0.4)', animationDuration: '2s' }}
            />
            <span
              className="absolute inset-[-4px] rounded-full border border-green-400/20 animate-ping"
              style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}
            />
          </>
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sparkles size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
