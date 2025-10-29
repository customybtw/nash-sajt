import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { usePortfolio } from '../hooks/usePortfolio.js';
import SeoHead from '../components/SeoHead.jsx';

const PortfolioPage = () => {
  const { data: items } = usePortfolio();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SeoHead
        title="Portfolio"
        description="Browse Nash Sajt portfolio of websites, e-commerce platforms, and marketing campaigns crafted for individuals and small businesses."
      />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="section-title">Proven work that grows brands</h1>
          <p className="mt-4 text-lg text-slate-600">
            Explore highlights from recent launches including full-funnel marketing, high-converting landing pages, and custom
            e-commerce experiences.
          </p>
        </div>
        <Link to="/contact" className="btn-secondary">
          Launch your project
        </Link>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item) => (
          <article key={item.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-primary/5">
            {item.heroImage && (
              <img src={item.heroImage} alt={item.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-dark">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <Link to={`/portfolio/${item.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View case study <HiArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
