import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import { useSite } from '../context/SiteContext.jsx';

const TermsPage = () => {
  const { sections } = useSite();
  const terms = sections.find((section) => section.type === 'terms');

  return (
    <div className="bg-slate-950 text-slate-200">
      <SeoHead title={terms?.seoTitle || 'Terms & Conditions'} description={terms?.seoDescription || 'Review the service terms for Nash Sajt Studio.'} />
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="font-display text-4xl text-white">{terms?.title || 'Terms & Conditions'}</h1>
        <div className="prose prose-invert mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: terms?.content || '<p>Update these terms from the admin panel to reflect your business policies.</p>' }} />
      </section>
    </div>
  );
};

export default TermsPage;
