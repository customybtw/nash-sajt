import React from 'react';
import Hero from '../components/Hero.jsx';
import ServiceShowcase from '../components/ServiceShowcase.jsx';
import PricingTable from '../components/PricingTable.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
import NewsletterForm from '../components/NewsletterForm.jsx';
import ContactForm from '../components/ContactForm.jsx';
import SeoHead from '../components/SeoHead.jsx';
import { useSite } from '../context/SiteContext.jsx';

const HomePage = () => {
  const { sections, pricing, gallery, blogPosts, loading, error } = useSite();
  const heroSection = sections.find((section) => section.type === 'home');
  const aboutSection = sections.find((section) => section.type === 'about');

  return (
    <div>
      <SeoHead
        title={heroSection?.seoTitle || 'Professional Websites & Marketing'}
        description={heroSection?.seoDescription || 'Responsive, SEO-optimized websites with a powerful admin panel and e-commerce support.'}
        keywords={(heroSection?.seoKeywords || '')?.split(',')}
      />
      <Hero
        title={heroSection?.title || 'Launch a site that sells your vision'}
        subtitle={
          heroSection?.subtitle ||
          'Design, development, hosting, and growth marketing in one streamlined platform for individuals and SMBs.'
        }
        backgroundImage={heroSection?.heroImageUrl}
      />
      {loading && (
        <div className="bg-slate-900 py-4 text-center text-sm text-slate-400">Loading personalized content…</div>
      )}
      {error && (
        <div className="bg-red-950/50 py-4 text-center text-sm text-red-300">{error}</div>
      )}
      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="font-display text-3xl text-white sm:text-4xl">{aboutSection?.title || 'We design digital growth engines'}</h2>
          <p className="mt-4 text-lg text-slate-300" dangerouslySetInnerHTML={{ __html: aboutSection?.content || 'From strategy to execution, we create future-proof experiences with measurable business impact.' }} />
        </div>
      </section>
      <ServiceShowcase />
      <PricingTable plans={pricing} />
      <GalleryGrid images={gallery.slice(0, 6)} />
      <BlogPreview posts={blogPosts} />
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:flex-row">
          <div className="flex-1 space-y-4">
            <h2 className="font-display text-3xl text-white">Plan your project with us</h2>
            <p className="text-slate-300">
              Share your goals and we will craft a tailored proposal covering strategy, design, development, and launch.
            </p>
            <NewsletterForm />
          </div>
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
