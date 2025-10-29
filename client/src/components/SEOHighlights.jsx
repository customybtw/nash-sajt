const highlights = [
  {
    title: 'Structured data',
    description: 'Rich snippets for services, products, and FAQs boost visibility across search results.',
  },
  {
    title: 'Performance audits',
    description: 'Core Web Vitals monitoring with image optimization, lazy loading, and code-splitting.',
  },
  {
    title: 'Content strategy',
    description: 'CMS-driven pages, blog publishing, and landing pages built to convert organic traffic.',
  },
];

const SEOHighlights = () => (
  <section className="section-container py-16">
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900">SEO baked into every detail</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            From schema markup and on-page optimization to analytics dashboards, we make sure each
            page is ready to climb the rankings.
          </p>
        </div>
        <span className="rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
          SEO & analytics
        </span>
      </div>
      <dl className="grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <div key={highlight.title} className="rounded-2xl bg-brand-50/40 p-5">
            <dt className="font-semibold text-slate-900">{highlight.title}</dt>
            <dd className="mt-2 text-sm text-slate-600">{highlight.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default SEOHighlights;
