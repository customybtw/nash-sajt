import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import useSections from '../hooks/useSections.js';
import usePricing from '../hooks/usePricing.js';
import { usePortfolio } from '../hooks/usePortfolio.js';
import useGallery from '../hooks/useGallery.js';
import SeoHead from '../components/SeoHead.jsx';
import NewsletterForm from '../components/NewsletterForm.jsx';

const HeroSection = ({ section }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary text-white">
    <div className="absolute inset-0 opacity-40" aria-hidden>
      <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
    </div>
    <div className="relative mx-auto max-w-6xl px-4 py-24 text-center md:py-32">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
      >
        Modern websites · Easy admin · Scalable growth
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-4xl font-bold tracking-tight md:text-6xl"
      >
        {section?.title || 'Build a high-performing website without the technical chaos'}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-6 max-w-2xl text-lg text-slate-200"
        dangerouslySetInnerHTML={{ __html: section?.content || 'Launch a professional presence, manage content easily, and convert visitors into loyal customers with a unified platform.' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <a href="#pricing" className="btn-primary">
          Explore pricing
          <HiArrowRight className="text-lg" />
        </a>
        <Link
          to="/portfolio"
          className="btn-secondary"
        >
          View portfolio
        </Link>
      </motion.div>
    </div>
  </section>
);

const FeatureSection = () => (
  <section className="mx-auto mt-20 max-w-6xl px-4">
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h2 className="section-title">Design, marketing, and e-commerce in one streamlined platform</h2>
        <p className="mt-4 text-lg text-slate-600">
          Launch fast with polished components, manage content with a human-friendly admin, and grow with SEO-ready structures. We
          cover everything from domain management to conversion analytics.
        </p>
        <div className="mt-6 grid gap-4 text-sm text-slate-600">
          {[
            'Responsive experiences built for mobile-first audiences.',
            'SEO metadata, structured content, and blazing-fast performance by default.',
            'MySQL-powered admin panel for editing sections, galleries, pricing, and blog content.',
            'E-commerce ready with product catalogs, subscriptions, and payments via Stripe or PayPal.',
          ].map((item) => (
            <p key={item} className="flex items-start gap-3">
              <HiCheckCircle className="mt-1 flex-shrink-0 text-primary" />
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-primary/5">
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-6">
          <h3 className="text-lg font-semibold text-dark">Admin dashboard highlights</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>✔ Edit hero copy, SEO metadata, and CTAs in real time.</li>
            <li>✔ Manage galleries with drag-and-drop ordering and alt tags.</li>
            <li>✔ Control pricing tiers, newsletter segments, and marketing automations.</li>
            <li>✔ Review contact enquiries, job applications, and store orders in one place.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-dark">Marketing add-ons</h3>
          <p className="mt-2 text-sm text-slate-600">
            Need social media strategy or design assets? Our marketing team creates campaign-ready visuals, motion assets, and
            content calendars tailored to your brand.
          </p>
          <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Explore services <HiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const PricingSection = ({ plans }) => (
  <section id="pricing" className="mx-auto mt-24 max-w-6xl px-4">
    <div className="text-center">
      <h2 className="section-title">Flexible plans for every ambition</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
        Whether you&apos;re launching your first site or scaling an e-commerce brand, choose a plan that fits. Adjust features anytime
        inside the admin panel.
      </p>
    </div>
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {plans?.map((plan) => (
        <div
          key={plan.id}
          className={`relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-primary/5 ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}
        >
          {plan.isPopular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Most popular
            </span>
          )}
          <h3 className="text-lg font-semibold text-dark">{plan.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
          <div className="mt-6 text-3xl font-bold text-dark">
            {plan.price ? `€${plan.price}` : 'Custom'}
            <span className="text-sm font-medium text-slate-500">
              {plan.billingCycle === 'commission' ? ' / revenue share' : ` / ${plan.billingCycle}`}
            </span>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {plan.features?.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <HiCheckCircle className="mt-1 flex-shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn-primary mt-auto w-full justify-center">
            Talk to us
          </Link>
        </div>
      ))}
    </div>
    <div className="mt-12 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-10 text-center">
      <h3 className="text-2xl font-semibold text-dark">Need a tailored enterprise solution?</h3>
      <p className="mt-2 text-slate-600">
        We handle multi-language sites, complex booking flows, and bespoke integrations. Let’s plan your roadmap together.
      </p>
      <Link to="/contact" className="btn-secondary mt-6">
        Book a strategy call
      </Link>
    </div>
  </section>
);

const GalleryPreview = ({ images }) => (
  <section className="mx-auto mt-24 max-w-6xl px-4">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="section-title">Visual storytelling that converts</h2>
        <p className="mt-4 text-lg text-slate-600">
          Showcase products, services, and case studies with optimized imagery, accessible alt text, and dynamic loading.
        </p>
      </div>
      <Link to="/portfolio" className="btn-secondary">
        See all projects
      </Link>
    </div>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {images?.slice(0, 8).map((image) => (
        <div key={image.id} className="group overflow-hidden rounded-3xl bg-white shadow-sm shadow-primary/5">
          <img src={image.url} alt={image.altText || image.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
          <div className="p-4">
            <h3 className="text-sm font-semibold text-dark">{image.title}</h3>
            {image.description && <p className="mt-2 text-xs text-slate-500">{image.description}</p>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CTASection = () => (
  <section className="mx-auto mt-24 max-w-5xl rounded-3xl bg-slate-900 px-6 py-16 text-center text-white shadow-2xl shadow-primary/20">
    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to launch your next digital experience?</h2>
    <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
      Tell us about your idea, and we’ll craft the site, marketing, and automations that keep it growing.
    </p>
    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link to="/contact" className="btn-primary">
        Request a proposal
      </Link>
      <Link to="/pricing" className="btn-secondary">
        Compare plans
      </Link>
    </div>
  </section>
);

const HomePage = () => {
  const { data: sections } = useSections('home');
  const hero = sections?.find((section) => section.slug === 'hero');
  const { data: plans } = usePricing();
  const { data: portfolio } = usePortfolio();
  const { data: images } = useGallery();
  const portfolioImages = portfolio?.flatMap((item) => item.images || []) || [];

  return (
    <>
      <SeoHead
        title="Home"
        description="Nash Sajt delivers modern websites, SEO, e-commerce, and marketing services with an intuitive MySQL-powered admin dashboard."
      />
      <HeroSection section={hero} />
      <FeatureSection />
      <PricingSection plans={plans} />
      <GalleryPreview images={portfolioImages.length ? portfolioImages : images} />
      <section className="mx-auto mt-24 max-w-4xl px-4 text-center">
        <h2 className="section-title">Stay ahead with conversion-ready insights</h2>
        <p className="mt-4 text-lg text-slate-600">Monthly strategies covering SEO, content, and campaign ideas.</p>
        <NewsletterForm />
      </section>
      <CTASection />
    </>
  );
};

export default HomePage;
