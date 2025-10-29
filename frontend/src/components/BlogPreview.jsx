import React from 'react';
import { Link } from 'react-router-dom';

const BlogPreview = ({ posts }) => (
  <section className="bg-slate-950 py-20">
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl text-white">Insights & resources</h2>
          <p className="text-slate-400">Actionable guides on SEO, e-commerce, and conversion-focused design.</p>
        </div>
        <Link
          to="/blog"
          className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-widest text-slate-200 transition hover:border-accent hover:text-accent"
        >
          View all posts
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <article key={post.id || post.slug} className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-accent">
            <div className="text-xs uppercase tracking-[0.2em] text-accent">{new Date(post.publishedAt).toLocaleDateString()}</div>
            <h3 className="mt-4 font-display text-xl text-white">{post.title}</h3>
            <p className="mt-3 flex-1 text-sm text-slate-400">{post.excerpt}</p>
            <Link to={`/blog#${post.slug}`} className="mt-6 text-sm font-semibold text-accent">
              Read article →
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-slate-400">
            Blog posts coming soon. Stay tuned!
          </div>
        )}
      </div>
    </div>
  </section>
);

export default BlogPreview;
