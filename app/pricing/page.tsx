import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CHECKOUT_URLS } from '@/lib/lemonsqueezy'

const plans = [
  {
    name: 'Free',
    price: '€0',
    period: 'forever',
    audits: '3 lifetime audits',
    features: ['Overall score', '5-category breakdown', 'Basic insights'],
    cta: 'Get started',
    href: '/auth/signup',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '€19',
    period: '/mo',
    audits: '15 audits / month',
    features: ['Everything in Free', 'Full AI insights', 'Ranked fix list', 'Specific rewrites'],
    cta: 'Start Starter',
    href: CHECKOUT_URLS.starter,
    highlight: false,
  },
  {
    name: 'Pro',
    price: '€49',
    period: '/mo',
    audits: 'Unlimited audits',
    features: ['Everything in Starter', 'Audit history', 'Re-audit tracking', 'Score over time'],
    cta: 'Go Pro',
    href: CHECKOUT_URLS.pro,
    highlight: true,
  },
  {
    name: 'Agency',
    price: '€99',
    period: '/mo',
    audits: 'Unlimited audits',
    features: ['Everything in Pro', 'Team seats', 'White-label PDF exports', 'Priority support'],
    cta: 'Go Agency',
    href: CHECKOUT_URLS.agency,
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg">
            <span className="text-accent text-xl">◎</span>
            AuditMyLanding
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-slate-400 text-lg">Start free. Upgrade when you need more audits.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-surface rounded-2xl p-6 flex flex-col gap-5 border transition-all ${
                plan.highlight
                  ? 'border-accent shadow-xl shadow-accent/10 ring-1 ring-accent/30'
                  : 'border-border hover:border-accent/30'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <div>
                <h2 className="font-bold text-white text-lg">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-accent text-xs font-semibold mt-1">{plan.audits}</p>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-pass mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={plan.href} className="block">
                <Button
                  className="w-full"
                  variant={plan.highlight ? 'primary' : 'secondary'}
                >
                  {plan.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
