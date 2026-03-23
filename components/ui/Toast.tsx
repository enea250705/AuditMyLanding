'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  onDismiss: () => void
}

export function Toast({ message, type = 'success', onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 300)
    }, 3500)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${
        type === 'success'
          ? 'bg-green-950 border-pass/40 text-pass'
          : 'bg-red-950 border-fail/40 text-fail'
      }`}
    >
      <span className="text-lg">{type === 'success' ? '✓' : '✕'}</span>
      <span className="text-sm font-medium text-white">{message}</span>
    </div>
  )
}
