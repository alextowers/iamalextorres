import { MetadataRoute } from 'next'
import { getPosts } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts('en'); // Default to 'en' for sitemap for now

    const baseUrl = 'https://iamalextorres.com'

    const routes = [
        '',
        '#about',
        '#projects',
        '#travel',
        '#blog',
        '#contact',
    ].map((route) => ({
        url: `${baseUrl}${route} `,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
    }))

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl} /blog/${post.slug.current} `,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...blogRoutes]
}
