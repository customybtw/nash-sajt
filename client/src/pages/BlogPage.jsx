import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { useBlogPosts } from '../hooks/useBlog.js';
import SeoHead from '../components/SeoHead.jsx';

const BlogPage = () => {
  const { data: posts } = useBlogPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SeoHead
        title="Blog"
        description="Read guides on SEO, web design, e-commerce strategy, and growth marketing from the Nash Sajt team."
      />
      <h1 className="section-title">Insights & resources</h1>
      <p className="mt-4 text-lg text-slate-600">
        Stay ahead with practical advice, growth frameworks, and behind-the-scenes looks at how we build high-performing digital
        platforms.
      </p>
      <div className="mt-12 space-y-6">
        {posts?.map((post) => (
          <article key={post.id} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-dark">{post.title}</h2>
              {post.publishedAt && (
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Read article <HiArrowRight />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
