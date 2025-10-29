import PropTypes from 'prop-types';
import { useMemo } from 'react';

const PricingTable = ({ plans = [] }) => {
  const sortedPlans = useMemo(
    () => plans.slice().sort((a, b) => a.price - b.price),
    [plans]
  );

  return (
    <section className="section-container py-16" id="pricing">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-semibold text-slate-900">Flexible pricing</h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
          Choose a monthly subscription or performance-based partnership. Every plan includes our
          design system, SEO audit, analytics setup, and on-demand support.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        {sortedPlans.map((plan) => (
          <div
            key={plan.id || plan.name}
            className={`rounded-3xl border p-6 shadow-soft transition hover:-translate-y-1 ${
              plan.isFeatured
                ? 'border-brand-400 bg-white/90 shadow-xl'
                : 'border-slate-200 bg-white'
            }`}
          >
            <h3 className="font-display text-xl font-semibold text-slate-900">{plan.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">{plan.price === 0 ? 'Free' : `€${plan.price}`}</span>
              {plan.price !== 0 && <span className="text-xs text-slate-500">/ month</span>}
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {plan.features?.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="btn-primary mt-8 w-full justify-center">
              Talk to sales
            </button>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-3xl border border-dashed border-brand-200 bg-brand-50 px-6 py-10 text-center text-sm text-brand-700">
        Want a custom scope, social media marketing, or brand identity sprint? Combine add-ons and we
        will tailor an engagement that matches your goals.
      </div>
    </section>
  );
};

PricingTable.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
      features: PropTypes.arrayOf(PropTypes.string),
      isFeatured: PropTypes.bool,
    })
  ),
};

export default PricingTable;
