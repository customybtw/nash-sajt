import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../services/api.js';
import CTASection from '../components/CTASection.jsx';

const CareersPage = () => {
  const { data: jobs } = useQuery({ queryKey: ['jobs', '/jobs'], queryFn: fetcher });

  return (
    <div className="bg-white">
      <Helmet>
        <title>Careers | Nash Studio</title>
        <meta
          name="description"
          content="Join a remote-first team of strategists, designers, and engineers crafting digital experiences across Europe."
        />
      </Helmet>
      <section className="section-container py-20">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-slate-900">We’re building the future of boutique digital studios</h1>
          <p className="mt-4 text-lg text-slate-600">
            Work alongside specialists in UX, engineering, ecommerce, and marketing. Enjoy remote
            flexibility, regular retreats, and continuous learning budgets.
          </p>
        </div>
        <div className="mt-12 space-y-6">
          {(jobs?.length ? jobs : [])?.map((job) => (
            <article key={job.id || job.slug} className="rounded-3xl border border-slate-200 p-6 shadow-soft">
              <h2 className="font-display text-2xl font-semibold text-slate-900">{job.title}</h2>
              <div className="mt-2 text-sm text-slate-500">
                {job.location || 'Remote'} • {job.employmentType || 'Full time'}
              </div>
              <p className="mt-3 text-sm text-slate-600">{job.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-brand-700">
                {(job.requirements || []).map((requirement) => (
                  <li key={requirement} className="rounded-full bg-brand-100 px-3 py-1">
                    {requirement}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:studio@example.com?subject=Application: ${encodeURIComponent(job.title)}`}
                className="btn-primary mt-6 inline-flex"
              >
                Apply with CV
              </a>
            </article>
          ))}
          {!jobs?.length && (
            <article className="rounded-3xl border border-dashed border-brand-200 bg-brand-50 p-6 text-sm text-brand-700">
              We’re not hiring right now, but we love meeting talented collaborators. Send your portfolio to
              studio@example.com and we’ll reach out when something opens up.
            </article>
          )}
        </div>
      </section>
      <CTASection />
    </div>
  );
};

export default CareersPage;
