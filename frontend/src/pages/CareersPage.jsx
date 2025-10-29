import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import JobList from '../components/JobList.jsx';
import { useSite } from '../context/SiteContext.jsx';

const CareersPage = () => {
  const { jobs } = useSite();

  return (
    <div className="bg-slate-950 text-slate-200">
      <SeoHead
        title="Careers"
        description="Join Nash Sajt Studio and help build high-performing, secure digital products for ambitious brands."
      />
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-white">Build the future of digital experiences</h1>
        <p className="mt-4 text-lg text-slate-300">
          We are a remote-first team of strategists, designers, engineers, and marketers. Explore open roles or send an open application.
        </p>
      </section>
      <JobList jobs={jobs} />
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl space-y-4 px-4 text-center text-sm text-slate-400">
          <p>
            Didn&apos;t see the right role? Email your CV and portfolio to <a className="text-accent" href="mailto:careers@example.com">careers@example.com</a> with the subject &quot;Open Application&quot;.
          </p>
          <p>
            We review every application and respond within seven days. Freelance collaborations are welcome.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
