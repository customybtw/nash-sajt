import PropTypes from 'prop-types';

const FeatureGrid = ({ features }) => (
  <section className="section-container py-16">
    <div className="mb-10 max-w-3xl">
      <h2 className="font-display text-3xl font-semibold text-slate-900">Designed for growth</h2>
      <p className="mt-3 text-lg text-slate-600">
        Every project blends strategy, conversion-focused design, and automation so you can scale
        without hiring a full in-house team.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-200"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            {feature.icon}
          </div>
          <h3 className="font-semibold text-slate-900">{feature.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          <ul className="mt-4 space-y-1 text-xs text-slate-500">
            {feature.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

FeatureGrid.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default FeatureGrid;
