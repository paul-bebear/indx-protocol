export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  date: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  coverImage?: string;
  metaDescription: string;
  schema?: Record<string, unknown>;
}

export type BlogCategory = 
  | 'AI Discovery' 
  | 'Restaurant Marketing' 
  | 'E-commerce'
  | 'Schema Markup'
  | 'Technical SEO';

export interface BlogFrontmatter {
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  author: string;
  authorBio: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: string;
  metaDescription: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export type SortOption = 'newest' | 'alphabetical';
