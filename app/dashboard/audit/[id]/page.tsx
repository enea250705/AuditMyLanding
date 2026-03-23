import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AuditCard } from '@/components/audit/AuditCard'
import { ReauditButton } from './ReauditButton'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AuditResultPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: audit } = await supabase
    .from('audits')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!audit) notFound()

  if (audit.status === 'failed') {
    return (
      <div className="flex flex-col gap-6">
        <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back to dashboard
        </Link>
        <div className="bg-surface border border-fail/30 rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">✕</p>
          <h2 className="text-xl font-bold text-white mb-2">Audit failed</h2>
          <p className="text-slate-400 text-sm mb-4">
            {audit.error_message ?? 'We could not reach or parse this page.'}
          </p>
          <Link href="/dashboard">
            <ReauditButton url={audit.url} label="Try again" />
          </Link>
        </div>
      </div>
    )
  }

  if (audit.status !== 'complete') {
    return (
      <div className="flex flex-col gap-6">
        <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back to dashboard
        </Link>
        <div className="bg-surface border border-border rounded-2xl p-10 text-center">
          <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-semibold">Audit in progress…</p>
          <p className="text-slate-400 text-sm mt-1">Refresh in a moment</p>
        </div>
      </div>
    )
  }

  const auditData = {
    id: audit.id,
    url: audit.url,
    created_at: audit.created_at,
    overall_score: audit.overall_score,
    headline_score: audit.headline_score,
    cta_score: audit.cta_score,
    trust_score: audit.trust_score,
    clarity_score: audit.clarity_score,
    social_proof_score: audit.social_proof_score,
    headline_insight: audit.headline_insight,
    cta_insight: audit.cta_insight,
    trust_insight: audit.trust_insight,
    clarity_insight: audit.clarity_insight,
    social_proof_insight: audit.social_proof_insight,
    suggestions: audit.suggestions ?? [],
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back to dashboard
        </Link>
        <ReauditButton url={audit.url} />
      </div>
      <AuditCard audit={auditData} />
    </div>
  )
}
