import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, ChevronRight } from 'lucide-react'

// ─── Markdown renderer ─────────────────────────────────────────────────────────

function renderInline(text: string, kp = ''): ReactNode[] {
  const parts: ReactNode[] = []
  // Matches: [text](url)  |  **bold**  |  *italic*
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      parts.push(
        <a key={`${kp}a${m.index}`} href={m[2]} target="_blank" rel="noopener noreferrer"
          className="underline underline-offset-2 text-green-300 hover:text-green-200 transition-colors">
          {m[1]}
        </a>
      )
    } else if (m[3] !== undefined) {
      parts.push(<strong key={`${kp}b${m.index}`} className="font-semibold text-white">{m[3]}</strong>)
    } else {
      parts.push(<em key={`${kp}i${m.index}`} className="italic opacity-90">{m[4]}</em>)
    }
    last = regex.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function isSepRow(line: string) {
  return line.split('|').slice(1, -1).every(c => /^[\s:-]+$/.test(c))
}

function renderMarkdown(raw: string): ReactNode {
  const lines = raw.split('\n')
  const nodes: ReactNode[] = []
  let i = 0

  const mt = () => nodes.length > 0 ? 'mt-1.5' : ''

  while (i < lines.length) {
    const line = lines[i]
    const tr = line.trim()

    if (!tr) { i++; continue }

    // Horizontal rule
    if (/^[-*]{3,}$/.test(tr)) {
      nodes.push(<div key={`hr${i}`} className={`border-t border-green-900/40 ${mt()}`} />)
      i++; continue
    }

    // Headings
    if (/^#{1,3} /.test(tr)) {
      nodes.push(
        <p key={`h${i}`} className={`font-semibold text-green-300 text-[13px] ${mt()}`}>
          {renderInline(tr.replace(/^#{1,3} /, ''), `h${i}`)}
        </p>
      )
      i++; continue
    }

    // Table
    if (tr.startsWith('|')) {
      const tLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tLines.push(lines[i])
        i++
      }
      const dataLines = tLines.filter(l => !isSepRow(l))
      const parsed = dataLines.map(l =>
        l.split('|').slice(1, -1).map(c => c.trim())
      )
      const [headers = [], ...rows] = parsed
      if (headers.length) {
        nodes.push(
          <div key={`t${i}`} className={`rounded-xl overflow-hidden text-xs ${mt()}`}
            style={{ border: '1px solid rgba(46,139,46,0.25)' }}>
            <div className="flex" style={{ background: 'rgba(20,83,45,0.55)', borderBottom: '1px solid rgba(46,139,46,0.2)' }}>
              {headers.map((h, j) => (
                <div key={j} className="flex-1 px-2.5 py-2 font-semibold text-green-300 text-[11px]">
                  {renderInline(h, `th${i}-${j}`)}
                </div>
              ))}
            </div>
            {rows.map((row, ri) => (
              <div key={ri} className="flex"
                style={{
                  background: ri % 2 === 0 ? 'rgba(20,83,45,0.12)' : 'rgba(20,83,45,0.22)',
                  borderBottom: ri < rows.length - 1 ? '1px solid rgba(46,139,46,0.1)' : undefined
                }}>
                {row.map((cell, j) => (
                  <div key={j} className="flex-1 px-2.5 py-1.5 text-white/80">
                    {renderInline(cell, `td${i}-${ri}-${j}`)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      }
      continue
    }

    // Unordered list
    if (/^[-•*] /.test(tr)) {
      const items: string[] = []
      while (i < lines.length && /^[-•*] /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-•*] /, ''))
        i++
      }
      nodes.push(
        <ul key={`ul${i}`} className={`space-y-1 ${mt()}`}>
          {items.map((it, j) => (
            <li key={j} className="flex gap-2 items-start leading-relaxed">
              <span className="text-green-400 flex-shrink-0 mt-px">·</span>
              <span>{renderInline(it, `ul${i}-${j}`)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(tr)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\. /, ''))
        i++
      }
      nodes.push(
        <ol key={`ol${i}`} className={`space-y-1 ${mt()}`}>
          {items.map((it, j) => (
            <li key={j} className="flex gap-2 items-start leading-relaxed">
              <span className="text-green-400 flex-shrink-0 font-medium">{j + 1}.</span>
              <span>{renderInline(it, `ol${i}-${j}`)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Paragraph
    nodes.push(
      <p key={`p${i}`} className={`leading-relaxed ${mt()}`}>
        {renderInline(line, `p${i}`)}
      </p>
    )
    i++
  }

  return <>{nodes}</>
}

// ─── Types & constants ─────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant'
  content: string
  synthetic?: boolean
}

const WELCOME: Message = {
  role: 'assistant',
  content: '¡Hola! Soy el asistente virtual de **Clínica CCCT**. Puedo ayudarte con precios, horarios, especialidades y citas.\n\n¿En qué te puedo ayudar hoy?',
  synthetic: true,
}

const QUICK_CHIPS = [
  { label: 'Precios de consulta', msg: '¿Cuáles son los precios de las consultas médicas?' },
  { label: 'Horarios de atención', msg: '¿Cuál es el horario de atención de la clínica?' },
  { label: 'Especialidades disponibles', msg: '¿Qué especialidades médicas tienen?' },
  { label: 'Agendar una cita', msg: 'Quiero agendar una cita' },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chipsVisible, setChipsVisible] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250)
  }, [open])

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    setChipsVisible(false)
    const next: Message[] = [...messages, { role: 'user', content: msg }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const payload = next.filter(m => !m.synthetic)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Chat-Token': import.meta.env.VITE_CHAT_TOKEN ?? '',
        },
        body: JSON.stringify({ messages: payload }),
      })
      const data = await res.json() as { reply: string }
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Hubo un error. Por favor llama al [+58 424 168 4657](https://wa.me/584241684657).' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.93 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="w-[340px] sm:w-[375px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: '540px',
              background: '#060f06',
              border: '1px solid rgba(46,139,46,0.22)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(46,139,46,0.08)',
            }}
          >
            {/* ── Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #102010, #1c451c)', borderBottom: '1px solid rgba(46,139,46,0.18)' }}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2e8b2e, #1a5c1a)', boxShadow: '0 2px 14px rgba(46,139,46,0.45)' }}>
                  <Bot size={17} className="text-white" />
                </div>
                <span className="absolute -bottom-px -right-px w-3 h-3 rounded-full bg-green-400 border-2"
                  style={{ borderColor: '#060f06', boxShadow: '0 0 7px rgba(74,222,128,0.9)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight tracking-tight">Clínica CCCT</p>
                <p className="text-green-400 text-[11px] mt-0.5 leading-tight">Asistente virtual · En línea</p>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all flex-shrink-0">
                <X size={15} />
              </button>
            </div>

            {/* ── Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(46,139,46,0.25) transparent' }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                      style={{ background: 'rgba(46,139,46,0.2)', border: '1px solid rgba(46,139,46,0.35)' }}>
                      <Bot size={12} className="text-green-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] ${msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg, #2e8b2e, #1a5c1a)', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(46,139,46,0.18)' }
                    }
                  >
                    {renderMarkdown(msg.content)}
                  </div>
                </motion.div>
              ))}

              {/* Quick chips — only before first user message */}
              <AnimatePresence>
                {chipsVisible && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: 0.35, duration: 0.2 }}
                    className="flex flex-col gap-1.5 pt-1"
                  >
                    {QUICK_CHIPS.map((chip, j) => (
                      <motion.button
                        key={j}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + j * 0.07, duration: 0.18 }}
                        onClick={() => send(chip.msg)}
                        className="flex items-center gap-2 text-left text-[12px] px-3 py-2 rounded-xl w-fit transition-all active:scale-95"
                        style={{ background: 'rgba(46,139,46,0.1)', border: '1px solid rgba(46,139,46,0.22)', color: 'rgba(255,255,255,0.72)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(46,139,46,0.2)'
                          e.currentTarget.style.borderColor = 'rgba(46,139,46,0.45)'
                          e.currentTarget.style.color = 'rgba(255,255,255,0.95)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(46,139,46,0.1)'
                          e.currentTarget.style.borderColor = 'rgba(46,139,46,0.22)'
                          e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
                        }}
                      >
                        <ChevronRight size={11} className="text-green-500 flex-shrink-0" />
                        {chip.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(46,139,46,0.2)', border: '1px solid rgba(46,139,46,0.35)' }}>
                    <Bot size={12} className="text-green-400" />
                  </div>
                  <div className="rounded-2xl rounded-bl-sm px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(46,139,46,0.18)' }}>
                    <div className="flex gap-1.5 items-center h-4">
                      {[0, 1, 2].map(k => (
                        <span key={k} className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce"
                          style={{ animationDelay: `${k * 0.16}s`, opacity: 0.8 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input */}
            <div className="px-3 pb-3 pt-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(46,139,46,0.12)', background: 'rgba(0,0,0,0.15)' }}>
              <div className="flex gap-2 items-center rounded-xl px-3.5 py-2.5 transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(46,139,46,0.18)' }}
                onFocus={() => {}}
              >
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent text-[13px] text-white placeholder-white/25 outline-none leading-relaxed"
                  placeholder="Escribe tu pregunta..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  disabled={loading}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
                  style={{
                    background: input.trim() && !loading ? 'linear-gradient(135deg, #2e8b2e, #1a5c1a)' : 'rgba(46,139,46,0.08)',
                    opacity: !input.trim() || loading ? 0.5 : 1,
                    cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
              <p className="text-center text-[10px] text-white/18 mt-1.5 tracking-wide">
                Asistente con IA · Clínica CCCT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #2e8b2e, #1a5c1a)',
          boxShadow: open
            ? '0 8px 24px rgba(46,139,46,0.3)'
            : '0 8px 32px rgba(46,139,46,0.5), 0 0 0 1px rgba(74,222,128,0.15)',
        }}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-35"
            style={{ background: 'rgba(46,139,46,0.6)', animationDuration: '2.8s' }} />
        )}
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={21} className="text-white" />
              </motion.div>
            : <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Bot size={21} className="text-white" />
              </motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
