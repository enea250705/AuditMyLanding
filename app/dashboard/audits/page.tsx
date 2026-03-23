import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { truncateUrl, formatDate, scoreColor } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

export default async function AuditsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: audits } = await supabase
    .from('audits')
    .select('id, url, overall_score, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">All Audits</h1>

      {!audits || audits.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-10 text-center text-slate-500">
          <p className="text-4xl mb-3">◎</p>
          <p className="font-medium text-slate-400">No audits yet</p>
          <Link href="/dashboard" className="text-accent hover:text-accent-light text-sm mt-2 inline-block">
            ← Go audit a page
          </Link>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">URL</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Score</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3 hidden md:table-cell">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="border-b border-border last:border-0 hover:bg-surface2 transition-colors">
                  <td className="px-5 py-3.5 text-sm text-slate-300 font-medium truncate max-w-[200px]">
                    {truncateUrl(audit.url, 45)}
                  </td>
                  <td className="px-5 py-3.5">
                    {audit.overall_score != null ? (
                      <span className="text-sm font-bold" style={{ color: scoreColor(audit.overall_score) }}>
                        {audit.overall_score}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant={
                        audit.status === 'complete'
                          ? 'pass'
                          : audit.status === 'failed'
                          ? 'fail'
                          : 'info'
                      }
                    >
                      {audit.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500 hidden md:table-cell">
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
  )
}
