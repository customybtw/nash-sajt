import { services, marketingHighlights } from '../data/highlights';
import { useProducts } from '../hooks/useSiteContent';

export default function Services() {
  const { data: products = [] } = useProducts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="section-title">Services tailored for individuals & small businesses</h1>
      <p className="max-w-3xl text-muted">
        We blend strategy, design, development and marketing to help you launch faster, sell smarter and nurture loyal
        communities.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary">{service.title}</h2>
            <p className="mt-3 text-sm text-muted">{service.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {marketingHighlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-secondary bg-secondary/10 p-6">
            <h2 className="text-lg font-semibold text-secondary">{item.title}</h2>
            <p className="mt-3 text-sm text-secondary/80">{item.description}</p>
          </div>
        ))}
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-primary">Custom features for high-profile websites</h2>
          <p className="mt-3 text-sm text-muted">
            Configure unique experiences: calculators, booking flows, membership areas, CRM integrations, dashboards and more.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Dynamic forms with conditional logic</li>
            <li>• Quote builders and proposal automation</li>
            <li>• Third-party API integrations and automation</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-primary">E-commerce acceleration</h2>
          <p className="mt-3 text-sm text-muted">
            We deliver intuitive shopping experiences with secure payments, shipping workflows and marketing automation to keep
            customers engaged.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Product, inventory & order management</li>
            <li>• Abandoned cart recovery and email journeys</li>
            <li>• Reporting dashboards with conversion metrics</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-primary">Sample e-shop modules</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {products.slice(0, 5).map((product) => (
              <li key={product.id} className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
                <span>{product.name}</span>
                <span>€{Number(product.price).toFixed(2)}</span>
              </li>
            ))}
            {!products.length && <li className="rounded-2xl bg-slate-100 px-4 py-3">Populate this list from the admin panel.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
