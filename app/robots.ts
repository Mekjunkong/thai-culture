import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/teacher-dashboard', '/lesson-report', '/api/', '/auth/', '/login'],
    },
    sitemap: 'https://thailessonschiangmai.com/sitemap.xml',
  }
}
