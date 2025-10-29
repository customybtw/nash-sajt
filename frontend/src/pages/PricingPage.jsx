import React from 'react';
import PricingTable from '../components/PricingTable.jsx';
import SeoHead from '../components/SeoHead.jsx';
import { useSite } from '../context/SiteContext.jsx';

const PricingPage = () => {
  const { pricing } = useSite();

  return (
    <div className="bg-slate-950 text-slate-200">
      <SeoHead
        title="Pricing"
        description="Transparent pricing for modern websites, marketing, and e-commerce experiences."
      />
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-white">Choose the perfect launchpad</h1>
        <p className="mt-4 text-lg text-slate-300">
          Switch plans anytime as your business scales. Our team handles onboarding, migrations, and training.
        </p>
      </section>
      <PricingTable plans={pricing} />
      <section className="bg-slate-900 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="font-display text-2xl text-white">Social media marketing</h2>
            <p className="mt-3 text-sm text-slate-400">
              Content calendars, paid campaign optimization, and brand storytelling for Facebook, Instagram, LinkedIn, and more. Packages start at €250/mo.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="font-display text-2xl text-white">Design retainers</h2>
            <p className="mt-3 text-sm text-slate-400">
              On-demand creative support for pitch decks, ads, and brand assets. Collaborate via Notion and Figma with lightning-fast turnaround times.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
