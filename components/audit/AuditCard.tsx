import { ScoreRing } from './ScoreRing'
import { CategoryBar } from './CategoryBar'
import { SuggestionsList } from './SuggestionsList'
import { truncateUrl, formatDate } from '@/lib/utils'

interface AuditData {
  id: string
  url: string
  created_at: string
  overall_score: number
  headline_score: number
  cta_score: number
  trust_score: number
  clarity_score: number
  social_proof_score: number
  headline_insight: string
  cta_insight: string
  trust_insight: string
  clarity_insight: string
  social_proof_insight: string
  suggestions: Array<{
    priority: 'critical' | 'high' | 'medium'
    title: string
    description: string
    rewrite: string
  }>
}

interface AuditCardProps {
  audit: AuditData
  onReaudit?: () => void
}

export function AuditCard({ audit, onReaudit }: AuditCardProps) {
  const categories = [
    { label: 'Headline', score: audit.headline_score, insight: audit.headline_insight, delay: 100 },
    { label: 'Call to Action', score: audit.cta_score, insight: audit.cta_insight, delay: 200 },
    { label: 'Trust Signals', score: audit.trust_score, insight: audit.trust_insight, delay: 300 },
    { label: 'Copy Clarity', score: audit.clarity_score, insight: audit.clarity_insight, delay: 400 },
    { label: 'Social Proof', score: audit.social_proof_score, insight: audit.social_proof_insight, delay: 500 },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-surface border border-border rounded-2xl p-6">
        <ScoreRing score={audit.overall_score} animate />
        <div className="flex-1 min-w-0">
          <a
            href={audit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light text-sm font-medium truncate block"
          >
            {audit.url}
          </a>
          <p className="text-slate-500 text-xs mt-1">{formatDate(audit.created_at)}</p>
          <p className="text-slate-300 text-sm mt-3">
            Your landing page scored{' '}
            <span className="text-white font-bold">{audit.overall_score}/100</span> across 5
            conversion categories.
          </p>
          {onReaudit && (
            <button
              onClick={onReaudit}
              className="mt-3 text-xs text-accent hover:text-accent-light font-semibold transition-colors"
            >
              Re-audit this page →
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Category Breakdown</h2>
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-6">
          {categories.map((cat) => (
            <CategoryBar key={cat.label} {...cat} />
          ))}
        </div>
      </div>

      {/* Suggestions */}
      {audit.suggestions?.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            Fixes Ranked by Impact ({audit.suggestions.length})
          </h2>
          <SuggestionsList suggestions={audit.suggestions} />
        </div>
      )}
    </div>
  )
}
