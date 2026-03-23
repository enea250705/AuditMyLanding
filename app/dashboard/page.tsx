'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AuditScanner } from '@/components/dashboard/AuditScanner'
import { truncateUrl, formatDate, scoreColor, scoreLabel } from '@/lib/utils'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Audit {
  id: string
  url: string
  overall_score: number
  status: string
  created_at: string
}

interface Profile {
  plan: string
  audits_used: number
  audits_limit: number
  full_name: string | null
}

export default function DashboardPage() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')
  const [audits, setAudits] = useState<Audit[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [auditsRes, profileRes] = await Promise.all([
        supabase
          .from('audits')
          .select('id, url, overall_score, status, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('profiles')
          .select('plan, audits_used, audits_limit, full_name')
          .eq('id', user.id)
          .single(),
      ])

      if (auditsRes.data) setAudits(auditsRes.data)
      if (profileRes.data) setProfile(profileRes.data)
    }
    load()
  }, [])

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setError('')
    setScanning(true)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Audit failed')
      router.push(`/dashboard/audit/${data.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setScanning(false)
    }
  }

  const auditsRemaining =
    profile?.audits_limit === -1
      ? '∞'
      : Math.max(0, (profile?.audits_limit ?? 3) - (profile?.audits_used ?? 0))

  return (
    <>
      {scanning && <AuditScanner />}

      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {profile?.full_name ? `Hey, ${profile.full_name.split(' ')[0]}` : 'Dashboard'}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {auditsRemaining} audit{auditsRemaining !== 1 ? 's' : ''} remaining on{' '}
              <span className="text-accent capitalize">{profile?.plan ?? 'free'}</span> plan
            </p>
          </div>
          <Link href="/pricing">
            <Button variant="secondary" size="sm">Upgrade</Button>
          </Link>
        </div>

        {/* URL input */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Audit a landing page</h2>
          <form onSubmit={handleAudit} className="flex gap-3">
            <input
              type="url"
              placeholder="https://yourlanding.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="flex-1 bg-surface2 border border-border rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
            <Button type="submit" loading={scanning}>
              Audit now
            </Button>
          </form>
          {error && <p className="text-fail text-sm mt-3">{error}</p>}
        </div>

        {/* Recent audits */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Audits</h2>
            <Link href="/dashboard/audits" className="text-sm text-accent hover:text-accent-light transition-colors">
              View all →
            </Link>
          </div>

          {audits.length === 0 ? (
            <div className="bg-surface border border-border rounded-2xl p-10 text-center text-slate-500">
              <p className="text-4xl mb-3">◎</p>
              <p className="font-medium text-slate-400">No audits yet</p>
              <p className="text-sm mt-1">Paste a URL above to get your first audit</p>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">URL</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Score</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3 hidden sm:table-cell">Date</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {audits.map((audit) => (
                    <tr key={audit.id} className="border-b border-border last:border-0 hover:bg-surface2 transition-colors">
                      <td className="px-5 py-3.5 text-sm text-slate-300 font-medium truncate max-w-[180px]">
                        {truncateUrl(audit.url)}
                      </td>
                      <td className="px-5 py-3.5">
                        {audit.status === 'complete' && audit.overall_score != null ? (
                          <span
                            className="text-sm font-bold"
                            style={{ color: scoreColor(audit.overall_score) }}
                          >
                            {audit.overall_score}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 capitalize">{audit.status}</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-500 hidden sm:table-cell">
                        {formatDate(audit.created_at)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/dashboard/audit/${audit.id}`}
                          className="text-xs text-accent hover:text-accent-light transition-colors font-medium"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
