import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { getAllPosts, searchPosts } from '../../lib/blog/posts';
import type { BlogCategory, SortOption } from '../../types/blog';
import { generateOrganizationSchema, injectSchema } from '../../lib/blog/schema';

const CATEGORIES: BlogCategory[] = ['AI Discovery', 'Restaurant Marketing', 'E-commerce', 'Schema Markup', 'Technical SEO'];

export function BlogIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>(
    (searchParams.get('category') as BlogCategory) || 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const allPosts = useMemo(() => getAllPosts(), []);

  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : allPosts;
    
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    if (sortBy === 'alphabetical') {
      posts = [...posts].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      posts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    return posts;
  }, [allPosts, searchQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (category: BlogCategory | 'all') => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Generate schema
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Blog | Indexable.Pro - AI Readiness Insights</title>
      <meta name="description" content="Expert insights on AI discovery, schema markup, and restaurant marketing. Learn how to get your business found by ChatGPT, Siri, and Alexa." />
      <meta property="og:title" content="Blog | Indexable.Pro" />
      <meta property="og:description" content="Expert insights on AI discovery and restaurant marketing" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://indexable.pro/blog" />
      <div dangerouslySetInnerHTML={{ __html: injectSchema(orgSchema) }} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-background to-background-alt">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-text"
            >
              AI Readiness <span className="text-brand-accent">Insights</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-muted max-w-2xl mx-auto"
            >
              Expert guides on getting your restaurant discovered by ChatGPT, Siri, and Alexa.
            </motion.p>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="py-8 px-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 border border-border rounded-lg focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <Filter className="w-5 h-5 text-text-muted flex-shrink-0" />
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(selectedCategory === category ? 'all' : category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-brand-accent text-white'
                        : 'bg-background-muted text-text-muted hover:bg-border'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-12 px-4 border border-border rounded-lg bg-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              >
                <option value="newest">Newest First</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg">No articles found matching your criteria.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 text-brand-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all overflow-hidden"
                  >
                    <Link to={`/blog/${post.slug}`} className="block p-6">
                      {/* Category Badge */}
                      <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-medium rounded-full mb-4">
                        {post.category}
                      </span>

                      {/* Title */}
                      <h2 className="text-xl font-serif font-semibold text-text mb-3 group-hover:text-brand-accent transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-text-muted text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min read
                        </span>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 flex items-center text-brand-accent text-sm font-medium">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
