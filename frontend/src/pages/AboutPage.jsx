import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import { useSite } from '../context/SiteContext.jsx';

const AboutPage = () => {
  const { sections } = useSite();
  const about = sections.find((section) => section.type === 'about');
  const portfolio = sections.find((section) => section.type === 'portfolio');

  return (
    <div className="bg-slate-950">
      <SeoHead
        title={about?.seoTitle || 'About our studio'}
        description={about?.seoDescription || 'Meet the strategists, designers, and engineers behind Nash Sajt Studio.'}
        keywords={(about?.seoKeywords || '')?.split(',')}
      />
      <section className="mx-auto max-w-5xl px-4 py-20 text-slate-200">
        <h1 className="font-display text-4xl text-white">{about?.title || 'Human-centered, conversion-driven'}</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-300" dangerouslySetInnerHTML={{ __html: about?.content || '' }} />
      </section>
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-white">{portfolio?.title || 'Selected projects'}</h2>
          <p className="mt-3 text-slate-400">{portfolio?.subtitle || 'Websites and campaigns designed to grow visibility and revenue.'}</p>
          <div className="prose prose-invert mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: portfolio?.content || '<p>Update this section from the admin panel to showcase your latest achievements.</p>' }} />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
