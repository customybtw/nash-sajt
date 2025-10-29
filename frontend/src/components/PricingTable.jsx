import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const PricingCard = ({ plan }) => (
  <div
    className={`flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-left shadow-lg transition hover:-translate-y-1 hover:border-accent ${plan.highlight ? 'border-accent shadow-accent/20' : ''}`}
  >
    <div>
      <span className="rounded-full bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-slate-300">
        {plan.billingType === 'commission' ? 'Commission Model' : 'Monthly'}
      </span>
      <h3 className="mt-4 font-display text-2xl text-white">{plan.name}</h3>
      <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
    </div>
    <div className="text-4xl font-semibold text-white">
      {plan.priceMonthly ? (
        <>
          <span className="text-accent">€{plan.priceMonthly}</span>
          <span className="text-base text-slate-400">/mo</span>
        </>
      ) : (
        <span className="text-accent">Custom Pricing</span>
      )}
    </div>
    <ul className="space-y-3 text-sm text-slate-300">
      {(plan.features || []).map((feature, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <FiCheckCircle className="text-accent" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <a
      href="/contact"
      className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent transition hover:bg-accent hover:text-slate-950"
    >
      Talk to sales
    </a>
  </div>
);

const PricingTable = ({ plans }) => (
  <section id="pricing" className="bg-slate-950 py-20">
    <div className="mx-auto max-w-7xl px-4 text-center">
      <h2 className="font-display text-3xl text-white sm:text-4xl">Flexible pricing for every ambition</h2>
      <p className="mt-3 text-slate-400">
        Scale at your pace. Switch between subscription and revenue share as your project grows.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PricingCard key={plan.id || plan.slug} plan={plan} />
        ))}
      </div>
    </div>
  </section>
);

export default PricingTable;
