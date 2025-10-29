import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../services/api.js';
import StatsBanner from '../components/StatsBanner.jsx';
import Testimonials from '../components/Testimonials.jsx';

const AboutPage = () => {
  const { data: sections } = useQuery({ queryKey: ['about', '/content/pages/about'], queryFn: fetcher });
  const hero = sections?.find((section) => section.slug === 'about-hero');

  return (
    <div className="bg-white">
      <Helmet>
        <title>About Nash Studio | Strategy, Design, and Engineering</title>
        <meta
          name="description"
          content="Meet the cross-disciplinary team delivering modern websites, ecommerce, and marketing systems for individuals and small businesses."
        />
      </Helmet>
      <section className="section-container py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold text-slate-900">
              {hero?.title || 'We design and engineer growth-ready experiences'}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {hero?.content ||
                'Nash Studio combines brand strategy, UX/UI design, full-stack development, and marketing automation to help ambitious founders launch faster.'}
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-slate-900">Partner-first</h3>
                <p className="mt-2 text-sm text-slate-600">
                  We embed with your team, manage vendors, and communicate through weekly strategy calls.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-slate-900">Full service</h3>
                <p className="mt-2 text-sm text-slate-600">
                  From copywriting and photography direction to technical SEO and payment integrations, we cover every detail.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="Team collaboration"
              className="h-80 w-full rounded-3xl object-cover shadow-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?auto=format&fit=crop&w=900&q=80"
              alt="Design workshop"
              className="h-64 w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>
      <StatsBanner />
      <section className="section-container py-16">
        <h2 className="font-display text-3xl font-semibold text-slate-900">End-to-end expertise</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Strategy & discovery',
              description: 'Audience research, competitive audits, analytics review, and UX roadmaps.',
            },
            {
              title: 'Design systems',
              description: 'Reusable component libraries, accessibility-first typography, and design tokens.',
            },
            {
              title: 'Engineering & automation',
              description: 'React-based frontends, Node.js APIs, MySQL databases, and marketing workflows.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-soft">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default AboutPage;
