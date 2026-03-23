'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full bg-surface2 border border-border rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all',
            error && 'border-fail focus:ring-fail/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-fail">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
