import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { fetcher } from '../services/api.js';

const BlogPage = () => {
  const { data: posts } = useQuery({ queryKey: ['blog', '/blog'], queryFn: fetcher });

  return (
    <div className="bg-white">
      <Helmet>
        <title>Insights & Resources | Nash Studio</title>
        <meta
          name="description"
          content="Read about SEO, ecommerce, UX design, and marketing automation strategies for growing businesses."
        />
      </Helmet>
      <section className="section-container py-20">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-slate-900">Insights for ambitious teams</h1>
          <p className="mt-4 text-lg text-slate-600">
            Dive into tutorials, growth experiments, and frameworks we use to deliver measurable
            results for our clients.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {(posts?.length ? posts : [])?.map((post) => (
            <article key={post.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              {post.heroImage?.url && (
                <img
                  src={post.heroImage.url}
                  alt={post.heroImage.altText || post.title}
                  className="mb-4 h-40 w-full rounded-2xl object-cover"
                />
              )}
              <p className="text-xs uppercase tracking-wide text-brand-600">
                {post.publishedAt ? dayjs(post.publishedAt).format('D MMM YYYY') : 'Coming soon'}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="btn-secondary mt-4 inline-flex">
                Read more
              </Link>
            </article>
          ))}
          {!posts?.length && (
            <article className="rounded-3xl border border-dashed border-brand-200 bg-brand-50 p-6 text-sm text-brand-700">
              Articles are on the way! Subscribe to our newsletter for launch updates and growth tips.
            </article>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
