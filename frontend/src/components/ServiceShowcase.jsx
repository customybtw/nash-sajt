import React from 'react';
import { FiActivity, FiGlobe, FiLayers, FiLock, FiMail, FiTrendingUp } from 'react-icons/fi';

const services = [
  {
    icon: <FiGlobe />,
    title: 'SEO-first websites',
    description: 'Semantic markup, fast performance, and search-optimized content structures.'
  },
  {
    icon: <FiLayers />,
    title: 'Dynamic admin panel',
    description: 'Manage copy, media, SEO, pricing, and more without touching code.'
  },
  {
    icon: <FiActivity />,
    title: 'Analytics & automation',
    description: 'Integrated Google Analytics, search console, and marketing automation tools.'
  },
  {
    icon: <FiMail />,
    title: 'Newsletter engine',
    description: 'Grow your audience with subscription forms and targeted campaigns.'
  },
  {
    icon: <FiTrendingUp />,
    title: 'E-commerce ready',
    description: 'Inventory, orders, and payments powered by Stripe or PayPal.'
  },
  {
    icon: <FiLock />,
    title: 'Enterprise-grade security',
    description: 'Role-based access, secure hosting, backups, and GDPR-ready tooling.'
  }
];

const ServiceShowcase = () => (
  <section className="bg-slate-950 py-20">
    <div className="mx-auto max-w-7xl px-4">
      <div className="text-center">
        <h2 className="font-display text-3xl text-white sm:text-4xl">Everything you need to launch and scale</h2>
        <p className="mt-3 text-slate-400">
          From discovery to deployment, we design maintainable, secure platforms tailored to your business model.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-accent">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
              {service.icon}
            </div>
            <h3 className="font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceShowcase;
