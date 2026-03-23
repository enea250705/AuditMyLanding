'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { href: '/dashboard/audits', label: 'All Audits', icon: '≡' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-surface border-r border-border min-h-screen">
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg">
          <span className="text-accent text-xl">◎</span>
          <span>AuditMyLanding</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {nav.map(({ href, label, icon }) => {
          const active =
            href === '/dashboard' ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-accent/15 text-accent'
                  : 'text-slate-400 hover:text-white hover:bg-surface2'
              )}
            >
              <span className="text-base w-5 text-center">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Link
          href="/pricing"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-accent hover:bg-accent/10 transition-all mb-1"
        >
          <span className="text-base w-5 text-center">★</span>
          Upgrade plan
        </Link>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-surface2 transition-all"
        >
          <span className="text-base w-5 text-center">→</span>
          Sign out
        </button>
      </div>
    </aside>
  )
}
