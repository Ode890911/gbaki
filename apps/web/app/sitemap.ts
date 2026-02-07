import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gbakidigital.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const routes = [
    '',
    '/services',
    '/pricing',
    '/about',
    '/success-stories',
    '/faq',
    '/contact',
    '/blog',
    '/resources',
    '/privacy',
    '/terms',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // TODO: Add dynamic routes (blog posts, success stories, etc.)
  // const blogPosts = await getBlogPosts()
  // const blogRoutes = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...routes]
}

