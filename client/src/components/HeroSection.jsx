import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeroSection = ({ title, subtitle, ctaLabel = 'Launch your project', secondaryCta = 'View plans' }) => (
  <section className="bg-gradient-to-br from-brand-50 via-white to-slate-100">
    <div className="section-container grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <span className="inline-flex items-center rounded-full border border-brand-200 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
          SEO • E-commerce • Automation
        </span>
        <h1 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="text-lg text-slate-600 sm:text-xl">{subtitle}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="btn-primary justify-center">
            {ctaLabel}
          </Link>
          <Link to="/pricing" className="btn-secondary justify-center">
            {secondaryCta}
          </Link>
        </div>
        <dl className="grid grid-cols-2 gap-6 text-sm text-slate-500 sm:flex sm:gap-12">
          <div>
            <dt className="font-semibold text-slate-800">Launch timeline</dt>
            <dd>Go live in as little as 15 days</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Performance</dt>
            <dd>Score 90+ on Lighthouse</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Support</dt>
            <dd>Priority care for every plan</dd>
          </div>
        </dl>
      </div>
      <div className="relative">
        <div className="absolute -left-8 -top-8 h-24 w-24 rounded-3xl bg-brand-100 blur-2xl" />
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Admin panel preview
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Update copy, upload imagery, adjust SEO metadata, manage leads, and launch campaigns in
            minutes—not days.
          </p>
          <div className="mt-6 grid gap-4 text-xs text-slate-500">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-semibold text-slate-800">Content Hub</h4>
              <p>Drag-and-drop sections, schedule updates, and preview SEO snippets instantly.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-semibold text-slate-800">E-commerce Control</h4>
              <p>Sync inventory, manage orders, and send transactional emails with a click.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-semibold text-slate-800">Marketing Automations</h4>
              <p>Capture leads, nurture subscribers, and report on ROI in real time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  ctaLabel: PropTypes.string,
  secondaryCta: PropTypes.string,
};

export default HeroSection;
