import type { BlogPost, BlogCategory, RelatedPost } from '../../types/blog';

// Import all blog posts from the content directory
const postFiles = import.meta.glob('/content/blog/*.md', { eager: true, as: 'raw' });

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  
  for (const path in postFiles) {
    const content = postFiles[path] as string;
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const post = parsePost(content, slug);
    if (post) posts.push(post);
  }
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const path = `/content/blog/${slug}.md`;
  const content = postFiles[path] as string | undefined;
  if (!content) return null;
  return parsePost(content, slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter(post => post.category === category);
}

export function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): RelatedPost[] {
  return getAllPosts()
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit)
    .map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
    }));
}

export function getAdjacentPosts(currentSlug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

export function getAllCategories(): BlogCategory[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllPosts().filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

function parsePost(content: string, slug: string): BlogPost | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) return null;
  
  const [, frontmatter, bodyContent] = frontmatterMatch;
  const meta = parseFrontmatter(frontmatter);
  
  // Process bold markers in content
  const processedContent = bodyContent
    .replace(/\(BOLD\)/g, '**')
    .replace(/\(END BOLD\)/g, '**')
    .replace(/\(QUOTE\)/g, '> ')
    .replace(/\(END QUOTE\)/g, '');
  
  return {
    slug,
    title: meta.title,
    subtitle: meta.subtitle,
    excerpt: meta.excerpt,
    content: processedContent.trim(),
    date: meta.date,
    author: {
      name: meta.author,
      bio: meta.authorBio,
    },
    category: meta.category as BlogCategory,
    tags: meta.tags,
    readingTime: calculateReadingTime(bodyContent),
    coverImage: meta.coverImage,
    metaDescription: meta.metaDescription,
  };
}

function parseFrontmatter(frontmatter: string): Record<string, any> {
  const meta: Record<string, any> = {};
  const lines = frontmatter.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      if (value.startsWith('[') && value.endsWith(']')) {
        // Parse array
        meta[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      } else {
        meta[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }
  
  return meta;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
