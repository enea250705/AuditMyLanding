'use client'

import { useEffect, useState } from 'react'

const steps = [
  'Fetching page…',
  'Reading headline copy…',
  'Analyzing call-to-action…',
  'Checking trust signals…',
  'Scoring social proof…',
  'Calculating overall score…',
]

export function AuditScanner() {
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, steps.length - 1))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-bg/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-surface border border-border rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-6">
        {/* Spinning ring */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 animate-spin" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#1a1d2e" strokeWidth="6" />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#7c6fff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="60 116"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl">◎</span>
        </div>

        <div className="text-center">
          <h3 className="text-white font-bold text-lg mb-1">Auditing your page</h3>
          <p className="text-slate-400 text-sm">This takes about 15 seconds…</p>
        </div>

        <div className="w-full flex flex-col gap-2">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                i < stepIdx
                  ? 'text-pass'
                  : i === stepIdx
                  ? 'text-white'
                  : 'text-slate-600'
              }`}
            >
              <span className="w-4 text-center text-xs">
                {i < stepIdx ? '✓' : i === stepIdx ? '▶' : '○'}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
