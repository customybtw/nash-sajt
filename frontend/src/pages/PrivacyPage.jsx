import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import { useSite } from '../context/SiteContext.jsx';

const PrivacyPage = () => {
  const { sections } = useSite();
  const privacy = sections.find((section) => section.type === 'privacy');

  return (
    <div className="bg-slate-950 text-slate-200">
      <SeoHead title={privacy?.seoTitle || 'Privacy Policy'} description={privacy?.seoDescription || 'Understand how Nash Sajt Studio handles data privacy.'} />
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="font-display text-4xl text-white">{privacy?.title || 'Privacy Policy'}</h1>
        <div className="prose prose-invert mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: privacy?.content || '<p>Use the admin panel to customize your privacy policy.</p>' }} />
      </section>
    </div>
  );
};

export default PrivacyPage;
