import { HiOutlineSparkles, HiOutlineMailOpen, HiOutlineDeviceMobile, HiOutlineChartSquareBar } from 'react-icons/hi';
import SeoHead from '../components/SeoHead.jsx';

const services = [
  {
    icon: <HiOutlineSparkles className="text-3xl text-primary" />,
    title: 'Brand-aligned website design',
    description:
      'Custom UI systems, component libraries, and motion guidelines that bring your brand to life across every screen.',
  },
  {
    icon: <HiOutlineDeviceMobile className="text-3xl text-primary" />,
    title: 'Responsive development',
    description:
      'Modern React frontend with Vite, API integrations, and performance-focused architecture ready for future expansion.',
  },
  {
    icon: <HiOutlineMailOpen className="text-3xl text-primary" />,
    title: 'Marketing & automation',
    description:
      'Newsletter creation, landing pages, and CRM automations that nurture leads and convert new customers.',
  },
  {
    icon: <HiOutlineChartSquareBar className="text-3xl text-primary" />,
    title: 'Analytics & SEO management',
    description:
      'Google Analytics, Search Console, and structured data monitoring to keep your site ranking and optimized.',
  },
];

const ServicesPage = () => (
  <div className="mx-auto max-w-6xl px-4 py-16">
    <SeoHead
      title="Services"
      description="Explore Nash Sajt services including bespoke website design, SEO, e-commerce development, marketing automation, and analytics."
    />
    <h1 className="section-title text-center">Services tailored to growth</h1>
    <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-slate-600">
      From brand discovery workshops to post-launch marketing, we help you connect with the right audience and turn attention into
      action.
    </p>
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {services.map((service) => (
        <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
          <div className="flex items-center gap-4">
            {service.icon}
            <h2 className="text-xl font-semibold text-dark">{service.title}</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600">{service.description}</p>
        </div>
      ))}
    </div>
    <section className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-10">
      <h2 className="text-2xl font-semibold text-dark">Social media marketing & design services</h2>
      <p className="mt-4 text-base text-slate-600">
        We design social templates, ad creatives, and campaign narratives to keep your messaging cohesive across Instagram, LinkedIn,
        and email. Combine it with content calendars, analytics dashboards, and automation triggers for always-on marketing.
      </p>
    </section>
  </div>
);

export default ServicesPage;
