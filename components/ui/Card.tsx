import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-2xl',
        hover && 'hover:border-accent/40 transition-colors cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
