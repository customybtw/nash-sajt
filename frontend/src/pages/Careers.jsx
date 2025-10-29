import { useCareers } from '../hooks/useSiteContent';

export default function Careers() {
  const { data: careers = [] } = useCareers();

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="section-title">Join the Nash Sajt collective</h1>
      <p className="max-w-3xl text-muted">
        We are a fully distributed team of strategists, designers, engineers and marketers committed to building resilient
        digital products.
      </p>
      <div className="mt-10 space-y-6">
        {careers.map((role) => (
          <article key={role.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-primary">{role.title}</h2>
                <p className="text-sm text-muted">{role.location || 'Remote'} · {role.employment_type || 'Full-time'}</p>
              </div>
              <a href="mailto:careers@nash-sajt.com" className="btn-primary">
                Apply
              </a>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-primary">About the role</h3>
                <p className="mt-2 text-sm text-muted">{role.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">Requirements</h3>
                <p className="mt-2 text-sm text-muted">{role.requirements}</p>
              </div>
            </div>
          </article>
        ))}
        {!careers.length && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-muted">
            No openings right now, but we are always excited to hear from talented people. Email your CV to
            careers@nash-sajt.com.
          </div>
        )}
      </div>
    </section>
  );
}
