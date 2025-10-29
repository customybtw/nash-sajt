const testimonials = [
  {
    quote:
      'Our new site launched in three weeks and immediately doubled qualified leads. The admin panel is intuitive and the SEO results are real.',
    name: 'Ivana Petrović',
    role: 'Founder, Artisan Bakery',
  },
  {
    quote:
      'The Nash team guided us through branding, content, and marketing automation. We now run campaigns and analyze ROI from one dashboard.',
    name: 'Matej Horvat',
    role: 'CEO, Horizon Architecture',
  },
  {
    quote:
      'Subscription pricing means we always have a partner iterating on our product pages and email flows. Highly recommend for growing teams.',
    name: 'Lana Kovač',
    role: 'Head of Growth, Flow Activewear',
  },
];

const Testimonials = () => (
  <section className="bg-slate-900 py-16 text-white">
    <div className="section-container">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold">Loved by modern founders</h2>
        <p className="mt-3 text-slate-300">
          We collaborate with ambitious individuals and small teams building premium experiences.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
          >
            <blockquote className="text-sm text-slate-100">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-wide text-brand-200">
              {testimonial.name} • {testimonial.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
