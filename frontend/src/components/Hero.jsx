import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-black py-24 text-white">
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grid" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 md:flex-row md:items-center">
        <div className="md:w-1/2">
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-medium tracking-wide text-secondary">
            Websites • Marketing • E-commerce
          </span>
          <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
            Build an online presence that converts visitors into loyal customers.
          </h1>
          <p className="mt-5 text-lg text-slate-200">
            Nash Sajt delivers modern, SEO-optimized websites, automated marketing journeys and smooth e-commerce experiences
            tailored to individuals and growing teams.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/pricing" className="btn-primary">
              Explore Plans
            </Link>
            <Link to="/contact" className="btn-outline text-white">
              Book a Strategy Call
            </Link>
          </div>
          <div className="mt-10 grid max-w-md gap-4 sm:grid-cols-2">
            {[
              ['98%', 'Client satisfaction'],
              ['3x', 'Faster delivery'],
              ['150+', 'Campaigns launched'],
              ['24/7', 'Support availability'],
            ].map(([stat, label]) => (
              <div key={label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-3xl font-semibold text-secondary">{stat}</p>
                <p className="text-sm text-slate-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative mx-auto max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="grid gap-5 text-sm text-slate-100">
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary">Admin Panel Highlights</p>
                <h3 className="mt-2 text-2xl font-semibold">Update content in minutes</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Manage pages, SEO, images, pricing, newsletters, e-commerce products and analytics from one intuitive interface.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-secondary">Automation toolkit</p>
                <p className="text-xs text-slate-200">
                  Schedule newsletters, track leads, and integrate domain + hosting providers in a click.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-secondary">Secure payments</p>
                <p className="text-xs text-slate-200">Stripe & PayPal integrations, inventory tracking, order management.</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-secondary">SEO insights</p>
                <p className="text-xs text-slate-200">Built-in meta editing, structured data, Google Analytics dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
