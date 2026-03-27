"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { X, Send, RotateCcw } from "lucide-react"
import Image from "next/image"

type Message = {
  role: "user" | "assistant"
  content: string
}

interface DaboChatProps {
  open: boolean
  onClose: () => void
  locale: string
}

export default function DaboChat({ open, onClose, locale }: DaboChatProps) {
  const t = useTranslations("dabo")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const sendMessage = async (text: string) => {
    if (!text.trim() || streaming) return

    const userMsg: Message = { role: "user", content: text.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput("")
    setStreaming(true)

    try {
      const res = await fetch("/api/dabo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, lang: locale }),
      })

      if (!res.ok) {
        const err = await res.json()
        setMessages([...updated, { role: "assistant", content: err.error || "Error" }])
        setStreaming(false)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) return

      setMessages([...updated, { role: "assistant", content: "" }])

      const decoder = new TextDecoder()
      let buffer = ""
      let assistantText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (!line.startsWith("event:") && !line.startsWith("data:")) continue
          if (line.startsWith("event: content_block_delta")) continue
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === "content_block_delta" && data.delta?.text) {
                assistantText += data.delta.text
                setMessages([...updated, { role: "assistant", content: assistantText }])
              }
            } catch {
              // skip non-JSON lines
            }
          }
        }
      }
    } catch {
      setMessages([...updated, { role: "assistant", content: "Error de conexión." }])
    } finally {
      setStreaming(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const suggestions = [
    { key: "suggestTickets", text: t("suggestTickets") },
    { key: "suggestAttractions", text: t("suggestAttractions") },
    { key: "suggestFood", text: t("suggestFood") },
    { key: "suggestSchedule", text: t("suggestSchedule") },
  ]

  if (!open) return null

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(600px,calc(100vh-8rem))] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-tibidabo-navy px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <Image src="/dabo.svg" alt="Dabo" width={24} height={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight">{t("title")}</p>
          <p className="text-white/60 text-xs">{t("subtitle")}</p>
        </div>
        <button
          onClick={() => {
            setMessages([])
            setInput("")
          }}
          className="text-white/50 hover:text-white transition-colors p-1"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-tibidabo-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Image src="/dabo.svg" alt="" width={16} height={16} />
              </div>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                {t("welcome")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pl-9">
              {suggestions.map((s) => (
                <button
                  key={s.key}
                  onClick={() => sendMessage(s.text)}
                  className="text-xs bg-tibidabo-cream text-tibidabo-navy font-medium px-3 py-1.5 rounded-full hover:bg-tibidabo-gold/20 transition-colors"
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-tibidabo-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Image src="/dabo.svg" alt="" width={16} height={16} />
              </div>
            )}
            <div
              className={`text-sm px-3.5 py-2.5 max-w-[85%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-tibidabo-navy text-white rounded-2xl rounded-tr-sm"
                  : "bg-gray-50 text-gray-700 rounded-2xl rounded-tl-sm"
              }`}
            >
              {msg.content}
              {streaming && i === messages.length - 1 && msg.role === "assistant" && (
                <span className="inline-block w-1.5 h-4 bg-tibidabo-navy/40 ml-0.5 animate-pulse rounded-full align-middle" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 px-3 py-2.5 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          disabled={streaming}
          className="flex-1 text-sm px-3 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:border-tibidabo-navy focus:ring-1 focus:ring-tibidabo-navy/20 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || streaming}
          className="w-9 h-9 rounded-full bg-tibidabo-red text-white flex items-center justify-center hover:bg-tibidabo-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
