import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { MockAuditCard } from '@/components/landing/MockAuditCard'
import { WaitlistForm } from '@/components/landing/WaitlistForm'

export const metadata: Metadata = {
  title: 'Free AI Landing Page Audit Tool — Score & Fix Your Page',
  description:
    'Audit your landing page in seconds. AI scores your headline, CTA, trust signals, copy clarity, and social proof — with specific rewrites. Free to start, no credit card needed.',
  alternates: {
    canonical: 'https://auditmylanding.com',
  },
  openGraph: {
    url: 'https://auditmylanding.com',
    title: 'AuditMyLanding — Free AI Landing Page Audit Tool',
    description:
      'Paste any URL and get an instant AI audit of your landing page. Headline, CTA, trust signals, social proof — scored and fixed in seconds.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://auditmylanding.com/#website',
      url: 'https://auditmylanding.com',
      name: 'AuditMyLanding',
      description: 'Free AI-powered landing page audit tool',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://auditmylanding.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://auditmylanding.com/#organization',
      name: 'AuditMyLanding',
      url: 'https://auditmylanding.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://auditmylanding.com/icon-512.png',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'AuditMyLanding',
      url: 'https://auditmylanding.com',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'AI-powered landing page audit tool that scores headline, CTA, trust signals, copy clarity, and social proof with specific rewrite suggestions.',
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '0',
        highPrice: '99',
        priceCurrency: 'EUR',
        offerCount: '4',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does AuditMyLanding work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paste your landing page URL and our AI instantly fetches and analyzes your page. Within seconds you get a score across 5 conversion categories — headline, CTA, trust signals, copy clarity, and social proof — plus specific rewrites to fix every issue.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the landing page audit free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every account includes 3 free landing page audits with no credit card required. Paid plans start at €19/month for 15 audits per month.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the audit score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AuditMyLanding scores your page across 5 categories: headline effectiveness, call-to-action strength, trust signals, copy clarity, and social proof. Each category gets a score from 0–100 with AI-generated insights and specific rewrite suggestions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a landing page audit take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most audits complete in under 20 seconds. The AI fetches your page, analyzes the HTML, and returns a full conversion report almost instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good landing page score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Scores above 75 are excellent. 50–75 means there is meaningful room for improvement. Below 50 indicates significant conversion issues that are likely costing you leads and revenue.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which landing page elements does AuditMyLanding check?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AuditMyLanding checks your headline and value proposition, primary call-to-action (CTA), trust signals like logos and guarantees, copy clarity and readability, and social proof such as testimonials and reviews.',
          },
        },
      ],
    },
  ],
}

const features = [
  {
    icon: '🎯',
    title: 'Headline Analysis',
    desc: 'AI reads your hero copy and tells you exactly why visitors bounce within 3 seconds — with a rewritten version that converts.',
  },
  {
    icon: '⚡',
    title: 'CTA Scoring',
    desc: 'Find out if your call-to-action is compelling or forgettable — with specific, battle-tested rewrites.',
  },
  {
    icon: '🛡️',
    title: 'Trust Signals',
    desc: 'Audit logos, testimonials, guarantees, and credentials that build buyer confidence above the fold.',
  },
  {
    icon: '✍️',
    title: 'Copy Clarity',
    desc: 'Score how clear, concise, and conversion-focused your copy is for your exact target audience.',
  },
  {
    icon: '⭐',
    title: 'Social Proof',
    desc: 'Evaluate reviews, case studies, and user numbers that push hesitant visitors to take action.',
  },
  {
    icon: '📋',
    title: 'Ranked Fix List',
    desc: 'Get 4–6 prioritized recommendations ranked by conversion impact — each with a specific rewrite, not vague advice.',
  },
]

const steps = [
  { n: '1', title: 'Paste your URL', desc: 'Enter any landing page URL — yours, a competitor\'s, or a client\'s.' },
  { n: '2', title: 'AI audits in seconds', desc: 'Our AI analyzes your copy, structure, and conversion elements instantly.' },
  { n: '3', title: 'Get your score', desc: 'See a 0–100 score across 5 CRO categories with insights and rewrites.' },
]

const faqs = [
  {
    q: 'How does AuditMyLanding work?',
    a: 'Paste your landing page URL and our AI instantly fetches and analyzes your page. Within seconds you get a score across 5 conversion categories — headline, CTA, trust signals, copy clarity, and social proof — plus specific rewrites to fix every issue.',
  },
  {
    q: 'Is the landing page audit free?',
    a: 'Yes. Every account includes 3 free landing page audits with no credit card required. Paid plans start at €19/month for 15 audits per month.',
  },
  {
    q: 'How long does an audit take?',
    a: 'Most audits complete in under 20 seconds. The AI fetches your page, analyzes the HTML, and returns a full conversion report almost instantly.',
  },
  {
    q: 'What is a good landing page score?',
    a: 'Scores above 75 are excellent. 50–75 means meaningful room for improvement. Below 50 indicates significant conversion issues costing you leads and revenue.',
  },
  {
    q: 'Which elements does AuditMyLanding check?',
    a: 'Headline and value proposition, primary CTA, trust signals (logos, guarantees), copy clarity and readability, and social proof (testimonials, reviews, user counts).',
  },
]

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-bg">
        {/* Nav */}
        <header>
          <nav className="border-b border-border" aria-label="Main navigation">
            <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg" aria-label="AuditMyLanding home">
                <span className="text-accent text-xl" aria-hidden="true">◎</span>
                AuditMyLanding
              </Link>
              <div className="flex items-center gap-3">
                <Link href="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
                <Link href="/auth/login">
                  <Button variant="secondary" size="sm">Log in</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Get started free</Button>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero */}
          <section aria-labelledby="hero-heading" className="max-w-6xl mx-auto px-5 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-xs font-semibold text-accent mb-6">
                <span aria-hidden="true">✦</span>
                AI-powered CRO audits
              </div>
              <h1 id="hero-heading" className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Audit your landing page.{' '}
                <span className="text-accent">Fix what&apos;s killing conversions.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Paste any URL and get an instant AI audit of your headline, CTA, trust signals,
                and social proof — with specific rewrites ranked by conversion impact.
              </p>
              <WaitlistForm />
            </div>

            <div className="flex justify-center lg:justify-end" aria-hidden="true">
              <MockAuditCard />
            </div>
          </section>

          {/* How it works */}
          <section aria-labelledby="how-heading" className="max-w-6xl mx-auto px-5 py-16 border-t border-border">
            <h2 id="how-heading" className="text-2xl font-bold text-white text-center mb-12">
              How it works
            </h2>
            <ol className="grid md:grid-cols-3 gap-8" role="list">
              {steps.map((s) => (
                <li key={s.n} className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-white">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Features */}
          <section aria-labelledby="features-heading" className="max-w-6xl mx-auto px-5 py-16 border-t border-border">
            <h2 id="features-heading" className="text-2xl font-bold text-white text-center mb-4">
              5 conversion categories. Scored by AI.
            </h2>
            <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
              Every landing page audit covers the elements that directly impact your conversion rate,
              not vanity metrics.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <article
                  key={f.title}
                  className="bg-surface border border-border rounded-2xl p-6 animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className="text-3xl mb-4" aria-hidden="true">{f.icon}</div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-5 py-16 border-t border-border">
            <h2 id="faq-heading" className="text-2xl font-bold text-white text-center mb-10">
              Frequently asked questions
            </h2>
            <dl className="flex flex-col gap-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-surface border border-border rounded-2xl p-6">
                  <dt className="font-semibold text-white mb-2">{faq.q}</dt>
                  <dd className="text-slate-400 text-sm leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* CTA */}
          <section aria-labelledby="cta-heading" className="max-w-3xl mx-auto px-5 py-20 text-center border-t border-border">
            <h2 id="cta-heading" className="text-3xl font-extrabold text-white mb-4">
              Ready to audit your landing page?
            </h2>
            <p className="text-slate-400 mb-8">
              Join thousands of founders and marketers getting AI-powered audits on their pages.
              Free to start — no credit card required.
            </p>
            <Link href="/auth/signup">
              <Button size="lg">Start your free audit →</Button>
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 text-sm" aria-label="Site footer">
          <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div className="flex items-center gap-2 font-semibold text-slate-400">
              <span className="text-accent" aria-hidden="true">◎</span>
              AuditMyLanding
            </div>
            <nav aria-label="Footer navigation" className="flex gap-6">
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/auth/login" className="hover:text-white transition-colors">Login</Link>
              <Link href="/auth/signup" className="hover:text-white transition-colors">Sign up free</Link>
            </nav>
            <p className="text-xs">© {new Date().getFullYear()} AuditMyLanding. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
