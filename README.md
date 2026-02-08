# Indexable.Pro Website

AI readiness services for restaurants - 5-Day Sprint implementation.

## Stack
- TypeScript + React + Vite
- Static site generation
- Deployed on Netlify

## Blog System (Phase 1)
File-based blog using markdown files in `/content/blog/`.

### Adding Posts
1. Write post on Substack
2. Copy formatted content to `/content/blog/YYYY-MM-DD-post-slug.txt`
3. Rename `.txt` to `.md`
4. Add frontmatter:
   ```yaml
   ---
   title: "Post Title"
   slug: "post-url"
   date: "2026-02-08"
   image: "/images/post.jpg"
   ---
   ```
5. Commit and push

### Phase 2 (Coming Soon)
n8n automation to auto-post from Substack RSS.

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Content Included
- 7 blog posts ready to publish
- Pillar page content
- Image generation prompts

## TODO
- [ ] Build /blog listing page
- [ ] Build /blog/:slug pages
- [ ] Add schema markup injection
- [ ] Setup n8n automation
