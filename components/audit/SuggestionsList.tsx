import { Badge } from '@/components/ui/Badge'

interface Suggestion {
  priority: 'critical' | 'high' | 'medium'
  title: string
  description: string
  rewrite: string
}

interface SuggestionsListProps {
  suggestions: Suggestion[]
}

const priorityConfig = {
  critical: { variant: 'fail' as const, icon: '⚡', label: 'Critical' },
  high: { variant: 'warn' as const, icon: '↑', label: 'High' },
  medium: { variant: 'info' as const, icon: '→', label: 'Medium' },
}

const priorityOrder = { critical: 0, high: 1, medium: 2 }

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const sorted = [...suggestions].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((s, i) => {
        const config = priorityConfig[s.priority]
        return (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{config.icon}</span>
              <h3 className="font-semibold text-white flex-1">{s.title}</h3>
              <Badge variant={config.variant}>{config.label}</Badge>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
            {s.rewrite && (
              <div className="bg-surface2 rounded-xl p-4 border border-border">
                <p className="text-xs text-accent font-semibold mb-1.5 uppercase tracking-wide">
                  Suggested fix
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">{s.rewrite}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
