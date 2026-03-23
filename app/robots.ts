import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/auth/callback'],
      },
    ],
    sitemap: 'https://auditmylanding.com/sitemap.xml',
    host: 'https://auditmylanding.com',
  }
}
