import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'pass' | 'warn' | 'fail' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-surface2 text-slate-300 border-border',
    pass: 'bg-green-950 text-pass border-pass/30',
    warn: 'bg-amber-950 text-warn border-warn/30',
    fail: 'bg-red-950 text-fail border-fail/30',
    info: 'bg-blue-950 text-info border-info/30',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
