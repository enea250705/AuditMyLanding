import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AuditMyLanding — AI Landing Page Auditor',
  description:
    'Get a brutally honest AI audit of your landing page. Score your headline, CTA, trust signals, and social proof in seconds.',
  openGraph: {
    title: 'AuditMyLanding',
    description: 'AI-powered landing page conversion audits.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg text-slate-200 antialiased">{children}</body>
    </html>
  )
}
