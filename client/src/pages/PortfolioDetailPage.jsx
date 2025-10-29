import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { usePortfolioItem } from '../hooks/usePortfolio.js';
import SeoHead from '../components/SeoHead.jsx';

const PortfolioDetailPage = () => {
  const { slug } = useParams();
  const { data: item } = usePortfolioItem(slug);

  if (!item) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg text-slate-600">Loading case study…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SeoHead title={item.title} description={item.metaDescription || item.description} />
      <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <HiArrowLeft /> Back to portfolio
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-dark">{item.title}</h1>
      <p className="mt-4 text-base text-slate-600">{item.description}</p>
      {item.gallery?.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {item.gallery.map((image) => (
            <img key={image.url} src={image.url} alt={image.altText || item.title} className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
          ))}
        </div>
      )}
      {item.metaDescription && (
        <section className="prose prose-slate mt-8" dangerouslySetInnerHTML={{ __html: item.metaDescription }} />
      )}
    </div>
  );
};

export default PortfolioDetailPage;
