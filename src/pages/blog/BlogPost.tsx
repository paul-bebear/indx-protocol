import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getAdjacentPosts } from '../../lib/blog/posts';
import { generateBlogPostingSchema, generateBreadcrumbSchema, injectSchema } from '../../lib/blog/schema';
import type { TableOfContentsItem } from '../../types/blog';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
  const { prev, next } = getAdjacentPosts(post.slug);

  // Generate Table of Contents from content
  const toc: TableOfContentsItem[] = [];
  const contentLines = post.content.split('\n');
  contentLines.forEach((line) => {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);
    if (h2Match) {
      toc.push({ id: slugify(h2Match[1]), text: h2Match[1], level: 2 });
    } else if (h3Match) {
      toc.push({ id: slugify(h3Match[1]), text: h3Match[1], level: 3 });
    }
  });

  // Generate schemas
  const blogSchema = generateBlogPostingSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://indexable.pro/' },
    { name: 'Blog', url: 'https://indexable.pro/blog' },
    { name: post.title, url: `https://indexable.pro/blog/${post.slug}` },
  ]);

  const shareUrl = `https://indexable.pro/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      {/* SEO */}
      <title>{post.title} | Indexable.Pro Blog</title>
      <meta name="description" content={post.metaDescription} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={shareUrl} />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={post.author.name} />
      <meta property="article:section" content={post.category} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: injectSchema(blogSchema) + injectSchema(breadcrumbSchema) }} />

      <div className="min-h-screen bg-background">
        {/* Back Navigation */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link
              to="/blog"
              className="inline-flex items-center text-text-muted hover:text-brand-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article>
              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <span className="inline-block px-4 py-1 bg-brand-accent/10 text-brand-accent text-sm font-medium rounded-full mb-6">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-text mb-6">
                  {post.title}
                </h1>
                <p className="text-xl text-text-muted mb-8">{post.subtitle}</p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted pb-8 border-b border-border">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} min read
                  </span>
                  <span>By {post.author.name}</span>
                </div>
              </motion.header>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-12"
              >
                <span className="text-sm text-text-muted flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background-muted rounded-lg hover:bg-brand-accent hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background-muted rounded-lg hover:bg-brand-accent hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text prose-p:text-text-muted prose-a:text-brand-accent prose-strong:text-text prose-blockquote:border-l-brand-accent prose-blockquote:bg-background-muted prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </motion.div>

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-16 p-8 bg-background-muted rounded-2xl border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-serif font-semibold text-brand-accent">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-text text-lg">{post.author.name}</h3>
                    <p className="text-text-muted text-sm mt-2">{post.author.bio}</p>
                  </div>
                </div>
              </motion.div>

              {/* Prev/Next Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 grid md:grid-cols-2 gap-6"
              >
                {next && (
                  <Link
                    to={`/blog/${next.slug}`}
                    className="group p-6 bg-white rounded-xl border border-border hover:border-brand-accent transition-all"
                  >
                    <span className="text-xs text-text-muted uppercase tracking-wider">Previous</span>
                    <p className="text-text font-medium mt-2 group-hover:text-brand-accent transition-colors line-clamp-2">
                      ← {next.title}
                    </p>
                  </Link>
                )}
                {prev && (
                  <Link
                    to={`/blog/${prev.slug}`}
                    className={`group p-6 bg-white rounded-xl border border-border hover:border-brand-accent transition-all ${!next ? 'md:col-start-2' : ''}`}
                  >
                    <span className="text-xs text-text-muted uppercase tracking-wider text-right block">Next</span>
                    <p className="text-text font-medium mt-2 group-hover:text-brand-accent transition-colors line-clamp-2 text-right">
                      {prev.title} →
                    </p>
                  </Link>
                )}
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-8">
                {/* Table of Contents */}
                {toc.length > 0 && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="font-serif font-semibold text-text mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm hover:text-brand-accent transition-colors ${
                            item.level === 3 ? 'pl-4 text-text-muted' : 'text-text font-medium'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="font-serif font-semibold text-text mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.slug}
                          to={`/blog/${related.slug}`}
                          className="block group"
                        >
                          <p className="text-sm font-medium text-text group-hover:text-brand-accent transition-colors line-clamp-2">
                            {related.title}
                          </p>
                          <span className="text-xs text-text-muted mt-1 block">
                            {new Date(related.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}
