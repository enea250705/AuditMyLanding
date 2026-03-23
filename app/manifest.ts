import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AuditMyLanding',
    short_name: 'AuditMyLanding',
    description: 'Free AI landing page audit tool — score your headline, CTA, trust signals, and social proof.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0b0f',
    theme_color: '#7c6fff',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
