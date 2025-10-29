import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import PricingTable from '../components/PricingTable.jsx';
import CTASection from '../components/CTASection.jsx';
import { fetcher } from '../services/api.js';

const PricingPage = () => {
  const { data: plans } = useQuery({ queryKey: ['pricing', '/pricing'], queryFn: fetcher });

  return (
    <div className="bg-white">
      <Helmet>
        <title>Pricing & Services | Nash Studio</title>
        <meta
          name="description"
          content="Monthly subscriptions and revenue-share partnerships for websites, ecommerce, marketing, and design support."
        />
      </Helmet>
      <section className="section-container py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-slate-900">Subscription plans that scale</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Choose the plan that aligns with your ambitions. Upgrade at any time as your business evolves
          or add marketing sprints on demand.
        </p>
      </section>
      <PricingTable plans={plans || []} />
      <section className="section-container py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-slate-900">Social media & design add-ons</h2>
            <p className="mt-3 text-sm text-slate-600">
              Our in-house creatives can produce monthly social media kits, landing pages, ad sets, and
              visual identity enhancements to support your campaigns.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Content calendar and copywriting</li>
              <li>• Reels, stories, and carousel templates</li>
              <li>• Campaign-specific landing pages</li>
              <li>• Email design and automation flows</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-slate-900">High-profile website enhancements</h2>
            <p className="mt-3 text-sm text-slate-600">
              Need custom quoting engines, multilingual content, or private client portals? The 100€
              plan includes dedicated engineering hours for advanced features.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Quote builders and proposal workflows</li>
              <li>• CRM integrations (HubSpot, Pipedrive, Zoho)</li>
              <li>• Custom checkout experiences</li>
              <li>• Headless ecommerce and POS sync</li>
            </ul>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
};

export default PricingPage;
