import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { useBlogPost } from '../hooks/useBlog.js';
import SeoHead from '../components/SeoHead.jsx';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: post } = useBlogPost(slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg text-slate-600">Loading article…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SeoHead title={post.title} description={post.metaDescription || post.excerpt} />
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <HiArrowLeft /> Back to blog
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-dark">{post.title}</h1>
      {post.publishedAt && (
        <span className="mt-2 block text-xs uppercase tracking-wide text-slate-500">
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
      )}
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="mt-6 h-72 w-full rounded-3xl object-cover" loading="lazy" />
      )}
      <article className="prose prose-slate mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogDetailPage;
