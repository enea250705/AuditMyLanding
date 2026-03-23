'use client'

import { useEffect, useRef } from 'react'
import { scoreColor } from '@/lib/utils'

interface CategoryBarProps {
  label: string
  score: number
  insight: string
  delay?: number
}

export function CategoryBar({ label, score, insight, delay = 0 }: CategoryBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const color = scoreColor(score)

  useEffect(() => {
    const t = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.transition = 'width 0.8s cubic-bezier(0.4,0,0.2,1)'
        barRef.current.style.width = `${score}%`
      }
    }, delay)
    return () => clearTimeout(t)
  }, [score, delay])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-200">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="h-2 bg-surface2 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ width: '0%', backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{insight}</p>
    </div>
  )
}
