import { usePricing } from '../hooks/useSiteContent';

export default function Pricing() {
  const { data: pricing = [] } = usePricing();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="section-title">Flexible pricing for every ambition</h1>
      <p className="max-w-3xl text-muted">
        Choose a plan that matches your goals. Every package includes responsive design, foundational SEO, and access to the
        admin panel for real-time updates.
      </p>
      <div className="mt-12 grid gap-8 lg:grid-cols-4">
        {pricing.map((plan) => {
          const features = Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features || '[]');
          return (
            <div key={plan.id || plan.name} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow">
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">{plan.name}</span>
              <h2 className="mt-4 text-4xl font-bold text-primary">
                {plan.price === 0 ? 'Commission' : `€${Number(plan.price).toFixed(0)}`}
                <span className="text-base font-medium text-muted">
                  {plan.billing_cycle === 'commission' ? '' : '/month'}
                </span>
              </h2>
              <p className="mt-3 text-sm text-muted">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-primary">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn-primary mt-8 text-center">
                Talk to sales
              </a>
            </div>
          );
        })}
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-secondary bg-secondary/10 p-8">
          <h2 className="text-2xl font-semibold text-secondary">Social Media Marketing & Design</h2>
          <p className="mt-3 text-sm text-secondary/80">
            Included in the 70€ plan and above. We craft campaign strategies, ad creatives, and brand assets to keep your
            online presence consistent and impactful.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-secondary">
            <li>• Monthly content calendars and scheduling</li>
            <li>• Paid campaign setup and optimization</li>
            <li>• Creative assets for stories, reels, and ads</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-semibold text-primary">Need something custom?</h2>
          <p className="mt-3 text-sm text-muted">
            High-profile plans include bespoke features like quotation builders, multi-step forms, API integrations and full
            e-commerce stores with custom payment flows.
          </p>
          <p className="mt-4 text-sm text-muted">
            We also provide domain registration, managed hosting, SSL provisioning, and analytics dashboards for each project.
          </p>
        </div>
      </div>
    </section>
  );
}
