'use client'

import { useEffect, useRef } from 'react'
import { scoreColor, scoreLabel } from '@/lib/utils'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  animate?: boolean
}

export function ScoreRing({ score, size = 160, strokeWidth = 12, animate = true }: ScoreRingProps) {
  const arcRef = useRef<SVGCircleElement>(null)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const color = scoreColor(score)
  const label = scoreLabel(score)

  useEffect(() => {
    if (!arcRef.current || !animate) return
    const offset = circumference - (score / 100) * circumference
    arcRef.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)'
    arcRef.current.style.strokeDashoffset = String(offset)
  }, [score, circumference, animate])

  const initialOffset = animate ? circumference : circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1a1d2e"
            strokeWidth={strokeWidth}
          />
          <circle
            ref={arcRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={initialOffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white leading-none">{score}</span>
          <span className="text-xs text-slate-400 mt-1">/100</span>
        </div>
      </div>
      <span className="text-sm font-semibold" style={{ color }}>{label}</span>
    </div>
  )
}
