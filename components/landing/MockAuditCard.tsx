'use client'

import { useEffect, useRef, useState } from 'react'
import { ScoreRing } from '@/components/audit/ScoreRing'

const mockCategories = [
  { label: 'Headline', score: 42 },
  { label: 'Call to Action', score: 58 },
  { label: 'Trust Signals', score: 31 },
  { label: 'Copy Clarity', score: 65 },
  { label: 'Social Proof', score: 24 },
]

const mockSuggestions = [
  {
    priority: 'critical',
    title: 'Headline lacks a clear value proposition',
    color: '#ef4444',
  },
  {
    priority: 'high',
    title: 'CTA button text is too generic ("Submit")',
    color: '#f59e0b',
  },
  {
    priority: 'medium',
    title: 'No customer logos or testimonials visible above fold',
    color: '#60a5fa',
  },
]

function scoreColor(s: number) {
  if (s >= 75) return '#22c55e'
  if (s >= 50) return '#f59e0b'
  return '#ef4444'
}

export function MockAuditCard() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`bg-surface border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-accent/5 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {visible && <ScoreRing score={44} size={96} strokeWidth={9} animate />}
        <div>
          <p className="text-xs text-slate-500 mb-0.5">yourstartup.com</p>
          <p className="text-white font-semibold text-sm">Overall Score</p>
          <p className="text-xs text-slate-400 mt-1">Needs significant work</p>
        </div>
      </div>

      {/* Category bars */}
      <div className="flex flex-col gap-3 mb-5">
        {mockCategories.map((cat, i) => (
          <div key={cat.label} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{cat.label}</span>
              <span className="font-semibold" style={{ color: scoreColor(cat.score) }}>
                {cat.score}
              </span>
            </div>
            <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: visible ? `${cat.score}%` : '0%',
                  backgroundColor: scoreColor(cat.score),
                  transitionDelay: `${300 + i * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions preview */}
      <div className="border-t border-border pt-4 flex flex-col gap-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
          Top Issues
        </p>
        {mockSuggestions.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-xs"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: `${700 + i * 100}ms`,
              transition: 'opacity 0.4s ease',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-slate-300">{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
