import SeoHead from '../components/SeoHead.jsx';

const sections = [
  {
    title: '1. Introduction',
    content:
      'These Terms govern your use of the Nash Sajt platform, including the website, admin panel, and any associated services. By accessing our services you agree to the terms outlined below.',
  },
  {
    title: '2. Services',
    content:
      'We provide website design, development, hosting integration, marketing, and e-commerce solutions. Specific deliverables are defined within project proposals and subscription agreements.',
  },
  {
    title: '3. Payments & subscriptions',
    content:
      'Monthly plans are billed in advance. Commission-based plans for e-shops are settled monthly from recorded sales. Late payments may pause or cancel services.',
  },
  {
    title: '4. Intellectual property',
    content:
      'All custom assets remain the property of Nash Sajt until full payment is received. Upon completion, clients receive a non-exclusive license to use delivered assets within the scope of the project.',
  },
  {
    title: '5. Liability',
    content:
      'We take every measure to deliver secure and performant solutions. However, Nash Sajt is not liable for indirect damages, loss of profit, or issues caused by third-party providers.',
  },
];

const TermsPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-16">
    <SeoHead title="Terms & Conditions" description="Review the terms of service for Nash Sajt website, marketing, and e-commerce solutions." />
    <h1 className="section-title">Terms & Conditions</h1>
    <p className="mt-4 text-sm text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
    <div className="mt-8 space-y-6">
      {sections.map((section) => (
        <section key={section.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
          <h2 className="text-xl font-semibold text-dark">{section.title}</h2>
          <p className="mt-3 text-sm text-slate-600">{section.content}</p>
        </section>
      ))}
    </div>
  </div>
);

export default TermsPage;
