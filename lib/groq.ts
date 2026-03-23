import Groq from 'groq-sdk'

const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

export interface AuditResult {
  overall_score: number
  categories: {
    headline: { score: number; insight: string }
    cta: { score: number; insight: string }
    trust_signals: { score: number; insight: string }
    copy_clarity: { score: number; insight: string }
    social_proof: { score: number; insight: string }
  }
  suggestions: Array<{
    priority: 'critical' | 'high' | 'medium'
    title: string
    description: string
    rewrite: string
  }>
}

export async function auditLandingPage(html: string, url: string): Promise<AuditResult> {
  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 2000,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You are a world-class conversion rate optimization expert. Return only valid JSON — no markdown, no explanation.',
      },
      {
        role: 'user',
        content: `Analyze this landing page HTML and return a JSON audit report.

URL: ${url}
HTML: ${html.slice(0, 15000)}

Return ONLY valid JSON in this exact format:
{
  "overall_score": number (0-100),
  "categories": {
    "headline": { "score": number, "insight": "2-3 sentence specific insight" },
    "cta": { "score": number, "insight": "2-3 sentence specific insight" },
    "trust_signals": { "score": number, "insight": "2-3 sentence specific insight" },
    "copy_clarity": { "score": number, "insight": "2-3 sentence specific insight" },
    "social_proof": { "score": number, "insight": "2-3 sentence specific insight" }
  },
  "suggestions": [
    {
      "priority": "critical" | "high" | "medium",
      "title": "short title",
      "description": "what's wrong and why it matters",
      "rewrite": "specific rewritten copy or element suggestion"
    }
  ]
}

Be brutally specific. Reference actual copy from the page.
Rank suggestions by conversion impact. Return 4-6 suggestions.`,
      },
    ],
  })

  const text = completion.choices[0]?.message?.content ?? ''
  return JSON.parse(text) as AuditResult
}
