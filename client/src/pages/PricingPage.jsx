import { HiCheckCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import usePricing from '../hooks/usePricing.js';
import SeoHead from '../components/SeoHead.jsx';

const planExtras = {
  'Essential Website': [
    'Up to five custom sections',
    'On-page SEO optimization',
    'Contact form with email alerts',
  ],
  'Business Growth': [
    'Lead capture forms and automations',
    'Newsletter management and campaigns',
    'Easy-to-use admin dashboard',
  ],
  'Premium Commerce': [
    'Integrated e-shop with product management',
    'Stripe & PayPal checkout flows',
    'Inventory, order tracking, and abandoned cart emails',
  ],
  'E-shop Partnership': [
    'Full e-commerce build without upfront costs',
    'We design marketing campaigns & social media assets',
    'Commission model tied to your revenue',
  ],
};

const PricingPage = () => {
  const { data: plans } = usePricing();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SeoHead
        title="Pricing"
        description="Compare Nash Sajt pricing plans from €40 to custom revenue share. Pick the right website, e-commerce, and marketing bundle for your business."
      />
      <h1 className="section-title text-center">Plans built for progress</h1>
      <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-slate-600">
        Transparent pricing, no surprises. Upgrade or customize features directly in the admin panel whenever you need more power.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans?.map((plan) => (
          <div key={plan.id} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
            <h2 className="text-xl font-semibold text-dark">{plan.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
            <div className="mt-6 text-3xl font-bold text-dark">
              {plan.price ? `€${plan.price}` : 'Custom'}
              <span className="text-sm font-medium text-slate-500">
                {plan.billingCycle === 'commission' ? ' / revenue share' : ` / ${plan.billingCycle}`}
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {(plan.features || planExtras[plan.name] || []).map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <HiCheckCircle className="mt-1 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-auto w-full justify-center">
              Start your project
            </Link>
          </div>
        ))}
      </div>
      <section className="mt-16 grid gap-6 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Social media marketing & design services</h2>
          <p className="mt-3 text-sm text-slate-600">
            Included with our Business Growth and Premium Commerce plans, or available as a bolt-on. We craft campaign strategies,
            weekly content calendars, ad creative, and reporting dashboards that keep your brand front of mind.
          </p>
        </div>
        <div className="rounded-2xl bg-white/80 p-6 shadow-sm shadow-primary/10">
          <h3 className="text-lg font-semibold text-dark">Included deliverables</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>✔ Platform-specific templates (Instagram, Facebook, LinkedIn)</li>
            <li>✔ Caption frameworks aligned with your tone of voice</li>
            <li>✔ Monthly analytics dashboard with KPIs</li>
            <li>✔ Quarterly content strategy workshop</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
