import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PLAN_NAMES, PLAN_LIMITS, CHECKOUT_URLS } from '@/lib/lemonsqueezy'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan ?? 'free'
  const used = profile?.audits_used ?? 0
  const limit = profile?.audits_limit ?? 3
  const isUnlimited = limit === -1
  const pct = isUnlimited ? 100 : Math.min(100, (used / limit) * 100)

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* Plan */}
      <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">Current Plan</h2>
          <Badge variant={plan === 'free' ? 'default' : 'pass'}>
            {PLAN_NAMES[plan] ?? plan}
          </Badge>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400">Audits used</span>
            <span className="text-white font-semibold">
              {used} / {isUnlimited ? '∞' : limit}
            </span>
          </div>
          <div className="h-2 bg-surface2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {plan === 'free' && (
          <div className="flex flex-col gap-3 pt-2 border-t border-border">
            <p className="text-sm text-slate-400">
              Upgrade to get more audits, full AI insights, and ranked fix lists.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href={CHECKOUT_URLS.starter}>
                <Button size="sm">Starter — €19/mo</Button>
              </a>
              <a href={CHECKOUT_URLS.pro}>
                <Button variant="secondary" size="sm">Pro — €49/mo</Button>
              </a>
            </div>
          </div>
        )}

        {plan !== 'free' && (
          <div className="pt-2 border-t border-border">
            <Link href="/pricing">
              <Button variant="secondary" size="sm">Manage subscription</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Account */}
      <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-white">Account</h2>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
          <p className="text-sm text-white">{user.email}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Name</p>
          <p className="text-sm text-white">{profile?.full_name ?? '—'}</p>
        </div>
      </div>
    </div>
  )
}
