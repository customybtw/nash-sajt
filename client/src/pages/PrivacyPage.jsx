import SeoHead from '../components/SeoHead.jsx';

const PrivacyPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-16">
    <SeoHead
      title="Privacy Policy"
      description="Understand how Nash Sajt collects, stores, and protects your data across websites, admin tools, and marketing communications."
    />
    <h1 className="section-title">Privacy Policy</h1>
    <p className="mt-4 text-sm text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
    <div className="mt-8 space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
        <h2 className="text-xl font-semibold text-dark">Information we collect</h2>
        <p className="mt-3 text-sm text-slate-600">
          We collect contact details, project information, and optional marketing preferences submitted through forms or the admin
          panel. Analytics data such as page views is processed via Google Analytics with anonymized IPs.
        </p>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
        <h2 className="text-xl font-semibold text-dark">How we use data</h2>
        <p className="mt-3 text-sm text-slate-600">
          Data helps us deliver services, personalize experiences, send newsletters, and monitor platform performance. We never sell
          your data to third parties.
        </p>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
        <h2 className="text-xl font-semibold text-dark">Security</h2>
        <p className="mt-3 text-sm text-slate-600">
          We implement HTTPS, access controls, and regular audits. Sensitive credentials are encrypted and stored securely. Admin
          roles ensure least-privilege access.
        </p>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
        <h2 className="text-xl font-semibold text-dark">Your rights</h2>
        <p className="mt-3 text-sm text-slate-600">
          Contact us at privacy@nashsajt.com to request data access or deletion. We respond within 30 days.
        </p>
      </section>
    </div>
  </div>
);

export default PrivacyPage;
