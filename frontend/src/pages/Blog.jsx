import { useBlogPosts } from '../hooks/useSiteContent';

export default function Blog() {
  const { data: posts = [] } = useBlogPosts();

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="section-title">Insights & stories</h1>
      <p className="max-w-3xl text-muted">
        Articles on conversion optimization, performance, SEO and growth marketing to help you stay ahead.
      </p>
      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-secondary">
              {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-primary">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            <div
              className="prose prose-slate mt-4 max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content?.slice(0, 400) || '' }}
            />
          </article>
        ))}
        {!posts.length && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-muted">
            Publish blog posts from the admin panel to power your SEO and content marketing strategy.
          </div>
        )}
      </div>
    </section>
  );
}
