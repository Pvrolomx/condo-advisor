'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const WELCOME_MESSAGES = {
  nayarit: {
    content: '¡Hola! 👋 I\'m your Condo Advisor for **Nayarit**.\n\nI can help you with:\n• HOA meetings & voting (Asambleas)\n• Quorum requirements\n• Fideicomiso & foreign ownership\n• Maintenance fees (Cuotas)\n• Property manager issues\n• Airbnb regulations\n• Buying/selling property\n\nAsk me anything in English or Spanish!',
    subtitle: 'Nayarit Condominium Law • Online'
  },
  jalisco: {
    content: '¡Hola! 👋 I\'m your Condo Advisor for **Jalisco**.\n\n⚠️ Important: Jalisco has TWO possible legal regimes:\n• **1985 Law** (older condos that haven\'t transitioned)\n• **CCJ New Regime** (condos that adopted new rules)\n\nI\'ll ask which applies to your condo when relevant.\n\nI can help with:\n• HOA meetings & voting\n• Fideicomiso & foreign ownership\n• Maintenance fees\n• Property manager issues\n\nAsk me anything in English or Spanish!',
    subtitle: 'Jalisco Condominium Law • Online'
  }
}

export default function Home() {
  const [estado, setEstado] = useState('nayarit')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: WELCOME_MESSAGES.nayarit.content,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const changeEstado = (newEstado) => {
    if (newEstado !== estado) {
      setEstado(newEstado)
      setMessages([{
        role: 'assistant',
        content: WELCOME_MESSAGES[newEstado].content,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          estado: estado
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an error. Please try again.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Please check your internet and try again.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-[#111b21]">
      {/* Header */}
      <header className="bg-[#202c33] border-b border-[#2a3942]">
        {/* State Tabs */}
        <div className="flex border-b border-[#2a3942]">
          <button
            onClick={() => changeEstado('nayarit')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              estado === 'nayarit'
                ? 'text-[#00a884] border-b-2 border-[#00a884] bg-[#111b21]'
                : 'text-[#8696a0] hover:text-[#e9edef]'
            }`}
          >
            🏝️ Nayarit
          </button>
          <button
            onClick={() => changeEstado('jalisco')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              estado === 'jalisco'
                ? 'text-[#00a884] border-b-2 border-[#00a884] bg-[#111b21]'
                : 'text-[#8696a0] hover:text-[#e9edef]'
            }`}
          >
            ☀️ Jalisco
          </button>
        </div>
        
        {/* Title Bar */}
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00a884] to-[#075e54] flex items-center justify-center text-xl">
            {estado === 'nayarit' ? '🏝️' : '☀️'}
          </div>
          <div className="flex-1">
            <h1 className="text-[#e9edef] font-medium">Condo Advisor</h1>
            <p className="text-xs text-[#8696a0]">{WELCOME_MESSAGES[estado].subtitle}</p>
          </div>
          <div className="flex gap-4 text-[#aebac1]">
            <Link href="/templates" className="text-xl cursor-pointer hover:text-[#00a884]" title="Templates">📄</Link>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto chat-bg p-4 space-y-2">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-appear`}
          >
            <div 
              className={`max-w-[85%] rounded-lg px-3 py-2 shadow ${
                msg.role === 'user' 
                  ? 'bubble-user rounded-tr-none' 
                  : 'bubble-assistant rounded-tl-none'
              }`}
            >
              <p className="text-[#e9edef] text-sm whitespace-pre-wrap">{msg.content}</p>
              <p className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start message-appear">
            <div className="bubble-assistant rounded-lg rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Input area */}
      <footer className="bg-[#202c33] px-4 py-3 border-t border-[#2a3942]">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00a884] placeholder-[#8696a0]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#00a884] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#02906f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
        <p className="text-[10px] text-[#8696a0] text-center mt-2">
          Powered by <span className="text-[#00a884]">duendes.app</span> • Not legal advice
        </p>
      </footer>
    </div>
  )
}
