import type { BlogPost } from '../../types/blog';

export function generateBlogPostingSchema(post: BlogPost): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage || 'https://indexable.pro/og-image.jpg',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Indexable.Pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://indexable.pro/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://indexable.pro/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Indexable.Pro',
    url: 'https://indexable.pro',
    logo: 'https://indexable.pro/logo.png',
    description: 'AI Readiness Consulting for Restaurants and E-commerce',
    sameAs: [
      'https://twitter.com/indexablepro',
      'https://linkedin.com/company/indexablepro',
    ],
  };
}

export function injectSchema(schema: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
