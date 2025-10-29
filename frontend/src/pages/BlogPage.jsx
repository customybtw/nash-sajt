import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import { useSite } from '../context/SiteContext.jsx';

const BlogPage = () => {
  const { blogPosts } = useSite();

  return (
    <div className="bg-slate-950 text-slate-200">
      <SeoHead title="Blog" description="Guides and insights for building, scaling, and marketing digital products." />
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-white">Knowledge to accelerate your growth</h1>
        <p className="mt-4 text-lg text-slate-300">
          Browse tutorials, case studies, and marketing frameworks from our cross-functional team.
        </p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-20 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.id} id={post.slug} className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg">
            <div className="text-xs uppercase tracking-[0.2em] text-accent">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
            </div>
            <h2 className="mt-4 font-display text-xl text-white">{post.title}</h2>
            <p className="mt-3 text-sm text-slate-400">{post.excerpt}</p>
            <div className="mt-4 flex-1 text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: post.content?.slice(0, 400) }} />
          </article>
        ))}
        {blogPosts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center text-slate-400 md:col-span-3">
            Publish your first post from the admin panel to kickstart your content marketing.
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
