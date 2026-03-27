import Anthropic from "@anthropic-ai/sdk"
import { getSystemPrompt } from "@/lib/dabo-context"

const client = new Anthropic()

const ipRequests = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = ipRequests.get(ip)

  if (!record || now > record.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }

  if (record.count >= 20) return false
  record.count++
  return true
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ??
      request.headers.get("x-real-ip") ??
      "unknown"

    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      )
    }

    const { messages, lang = "es" } = await request.json()

    const validLang = ["es", "ca", "en"].includes(lang)
      ? (lang as "es" | "ca" | "en")
      : "es"

    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: getSystemPrompt(validLang),
      messages: messages.slice(-10).map(
        (m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })
      ),
    })

    return new Response(stream.toReadableStream(), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch {
    return Response.json({ error: "Dabo is temporarily unavailable" }, { status: 500 })
  }
}
