import React from 'react';

const JobList = ({ jobs }) => (
  <section className="bg-slate-900 py-20">
    <div className="mx-auto max-w-5xl px-4">
      <h2 className="font-display text-3xl text-white">Open roles</h2>
      <p className="mt-3 text-slate-400">Join a distributed, strategy-led team shaping the future of digital commerce.</p>
      <div className="mt-8 space-y-4">
        {jobs.map((job) => (
          <article key={job.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-lg">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-display text-xl text-white">{job.title}</h3>
                <p className="text-sm text-slate-400">
                  {job.department} · {job.location} · {job.employmentType?.replace('_', ' ')}
                </p>
              </div>
              <a href={`mailto:careers@example.com?subject=Application:%20${encodeURIComponent(job.title)}`} className="rounded-full border border-accent px-5 py-2 text-sm uppercase tracking-widest text-accent transition hover:bg-accent hover:text-slate-950">
                Apply now
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-300">{job.description?.slice(0, 160)}...</p>
          </article>
        ))}
        {jobs.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-slate-400">
            No open positions currently. Send us your portfolio and we will reach out.
          </div>
        )}
      </div>
    </div>
  </section>
);

export default JobList;
