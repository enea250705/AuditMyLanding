import type { Metadata, Viewport } from 'next'
import './globals.css'

const BASE_URL = 'https://auditmylanding.com'

export const viewport: Viewport = {
  themeColor: '#7c6fff',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'AuditMyLanding — Free AI Landing Page Audit Tool',
    template: '%s | AuditMyLanding',
  },

  description:
    'Audit your landing page in seconds. Get an AI-powered score for your headline, CTA, trust signals, and social proof — with specific rewrites to boost conversions. Free to start.',

  keywords: [
    'audit my landing page',
    'landing page audit',
    'landing page audit tool',
    'landing page analyzer',
    'landing page score',
    'CRO audit tool',
    'conversion rate optimization audit',
    'landing page checker',
    'free landing page audit',
    'AI landing page audit',
    'landing page optimization tool',
    'landing page conversion checker',
    'landing page grader',
    'improve landing page conversions',
  ],

  authors: [{ name: 'AuditMyLanding', url: BASE_URL }],
  creator: 'AuditMyLanding',
  publisher: 'AuditMyLanding',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'AuditMyLanding',
    title: 'AuditMyLanding — Free AI Landing Page Audit Tool',
    description:
      'Paste your URL and get a full AI audit of your landing page in seconds. Headline, CTA, trust signals, social proof — scored and fixed.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'AuditMyLanding — AI Landing Page Audit Tool',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@auditmylanding',
    creator: '@auditmylanding',
    title: 'AuditMyLanding — Free AI Landing Page Audit Tool',
    description:
      'Paste your URL and get a full AI audit of your landing page in seconds. Headline, CTA, trust signals, social proof — scored and fixed.',
    images: ['/og.png'],
  },

  alternates: {
    canonical: BASE_URL,
  },

  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },

  manifest: '/manifest.webmanifest',

  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg text-slate-200 antialiased">{children}</body>
    </html>
  )
}
