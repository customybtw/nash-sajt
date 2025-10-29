import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { fetcher } from '../services/api.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { data: post } = useQuery({ queryKey: ['blog', `/blog/${slug}`], queryFn: fetcher, enabled: Boolean(slug) });

  if (!post) {
    return (
      <div className="section-container py-20">
        <p className="text-center text-sm text-slate-500">Loading article...</p>
      </div>
    );
  }

  return (
    <article className="bg-white">
      <Helmet>
        <title>{post.seo?.title || `${post.title} | Nash Studio`}</title>
        <meta name="description" content={post.seo?.description || post.excerpt} />
      </Helmet>
      <header className="section-container py-16">
        <p className="text-xs uppercase tracking-wide text-brand-600">
          {post.publishedAt ? dayjs(post.publishedAt).format('D MMM YYYY') : 'Fresh insights'}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-slate-900">{post.title}</h1>
        {post.author && (
          <p className="mt-2 text-sm text-slate-500">
            By {post.author.firstName} {post.author.lastName}
          </p>
        )}
      </header>
      {post.heroImage?.url && (
        <img
          src={post.heroImage.url}
          alt={post.heroImage.altText || post.title}
          className="h-96 w-full object-cover"
        />
      )}
      <div className="section-container prose prose-slate max-w-3xl py-16">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default BlogPostPage;
