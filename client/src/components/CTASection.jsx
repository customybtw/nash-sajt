const CTASection = () => (
  <section className="section-container py-16">
    <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 px-8 py-12 text-white shadow-xl">
      <h2 className="font-display text-3xl font-semibold">Ready to launch something remarkable?</h2>
      <p className="mt-3 max-w-2xl text-sm text-brand-100">
        Tell us about your audience, goals, and desired features. We will craft a roadmap covering UX,
        SEO, ecommerce, marketing automation, and analytics.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href="mailto:studio@example.com" className="btn-secondary bg-white/10 text-white">
          studio@example.com
        </a>
        <a href="tel:+3850000000" className="btn-secondary bg-white/10 text-white">
          +385 00 000 000
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
