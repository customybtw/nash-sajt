import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import ServiceShowcase from '../components/ServiceShowcase.jsx';
import { useSite } from '../context/SiteContext.jsx';

const ServicesPage = () => {
  const { sections } = useSite();
  const services = sections.find((section) => section.type === 'custom' && section.slug === 'services');

  return (
    <div className="bg-slate-950 text-slate-200">
      <SeoHead
        title={services?.seoTitle || 'Services & Capabilities'}
        description={services?.seoDescription || 'Strategy, design, development, hosting, and marketing—tailored for SMBs.'}
      />
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h1 className="font-display text-4xl text-white">{services?.title || 'Full-spectrum digital services'}</h1>
        <p className="mt-4 text-lg text-slate-300">
          {services?.subtitle || 'Our modular approach blends strategy, design, development, and growth marketing to launch digital products that convert.'}
        </p>
        <div className="prose prose-invert mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: services?.content || '' }} />
      </section>
      <ServiceShowcase />
      <section className="bg-slate-900 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="font-display text-2xl text-white">Domain & hosting concierge</h2>
            <p className="mt-3 text-sm text-slate-400">
              Manage domains, SSL certificates, and hosting plans directly from the admin panel. We configure automated backups,
              uptime monitoring, and scalable infrastructure so you stay focused on growth.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="font-display text-2xl text-white">Custom features on demand</h2>
            <p className="mt-3 text-sm text-slate-400">
              Need bespoke quoting tools, onboarding flows, or industry-specific automations? We develop custom modules and integrate them into your admin panel with role-based access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
