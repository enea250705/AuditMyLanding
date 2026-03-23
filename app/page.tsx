'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MockAuditCard } from '@/components/landing/MockAuditCard'
import { Toast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setToast({ message: "You're on the list! We'll be in touch.", type: 'success' })
      setEmail('')
    } catch (err: unknown) {
      setToast({
        message: err instanceof Error ? err.message : 'Something went wrong',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <span className="text-accent text-xl">◎</span>
            AuditMyLanding
          </div>
          <div className="flex items-center gap-3">
            <Link href="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">
              Pricing
            </Link>
            <Link href="/auth/login">
              <Button variant="secondary" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-xs font-semibold text-accent mb-6">
            <span>✦</span>
            AI-powered CRO audits
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Find out why your landing page{' '}
            <span className="text-accent">isn&apos;t converting</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Paste your URL. Get a brutally honest AI audit of your headline, CTA, trust signals,
            and social proof — with specific rewrites to boost conversions.
          </p>

          <form onSubmit={handleWaitlist} className="flex gap-2 max-w-md">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
            <Button type="submit" loading={loading} size="lg">
              Join waitlist
            </Button>
          </form>
          <p className="text-slate-500 text-xs mt-3">Free for the first 3 audits. No credit card required.</p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <MockAuditCard />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 py-16 border-t border-border">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          Everything your landing page needs to convert
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-surface border border-border rounded-2xl p-6 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Ready to fix your landing page?</h2>
        <p className="text-slate-400 mb-8">
          Join hundreds of founders getting AI-powered feedback on their pages.
        </p>
        <Link href="/auth/signup">
          <Button size="lg">Start your free audit →</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-slate-500 text-sm">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold text-slate-400">
            <span className="text-accent">◎</span> AuditMyLanding
          </div>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </footer>

      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}
    </div>
  )
}

const features = [
  {
    icon: '🎯',
    title: 'Headline Analysis',
    desc: 'Claude reads your hero copy and tells you exactly why visitors bounce within 3 seconds.',
  },
  {
    icon: '⚡',
    title: 'CTA Scoring',
    desc: 'Find out if your call-to-action is compelling or forgettable — with specific rewrites.',
  },
  {
    icon: '🛡️',
    title: 'Trust Signals',
    desc: 'Audit logos, testimonials, guarantees, and social proof that build buyer confidence.',
  },
  {
    icon: '✍️',
    title: 'Copy Clarity',
    desc: 'Score how clear, concise, and conversion-focused your copy is for your target audience.',
  },
  {
    icon: '⭐',
    title: 'Social Proof',
    desc: 'Evaluate reviews, case studies, and user numbers that push hesitant visitors to act.',
  },
  {
    icon: '📋',
    title: 'Ranked Fix List',
    desc: 'Get 4–6 prioritized recommendations with specific rewrites, not vague suggestions.',
  },
]
