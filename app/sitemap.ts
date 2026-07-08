import type { MetadataRoute } from 'next'

const baseUrl = 'https://thailessonschiangmai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/missions', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/missions/order-coffee', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/missions/market-price', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/missions/order-food-spice', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/missions/driver-stop', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lessons', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/lessons/week-1', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lessons/week-2', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lessons/week-3', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lessons/week-4', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/practice', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/book', priority: 0.7, changeFrequency: 'monthly' },
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
