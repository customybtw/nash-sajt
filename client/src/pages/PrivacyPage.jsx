import { Helmet } from 'react-helmet-async';

const PrivacyPage = () => (
  <div className="bg-white">
    <Helmet>
      <title>Privacy Policy | Nash Studio</title>
      <meta name="description" content="Learn how Nash Studio collects, uses, and safeguards personal data across our services." />
    </Helmet>
    <section className="section-container prose prose-slate max-w-4xl py-20">
      <h1>Privacy Policy</h1>
      <p>
        We value your privacy and comply with GDPR and other applicable regulations. This policy
        explains how we collect, use, and protect your information when you visit our website or use
        our services.
      </p>
      <h2>Data we collect</h2>
      <p>
        We collect personal details (name, email, phone) when you submit forms, as well as analytics
        data to understand website performance.
      </p>
      <h2>How we use your data</h2>
      <p>
        Information is used to provide services, respond to inquiries, process payments, and send
        marketing communications. You may opt out of marketing at any time.
      </p>
      <h2>Data storage</h2>
      <p>
        Data is stored securely within the EU. We retain client data for the duration of our engagement
        and delete it upon request.
      </p>
      <h2>Your rights</h2>
      <p>
        You can request access, correction, or deletion of your data by emailing privacy@example.com.
      </p>
    </section>
  </div>
);

export default PrivacyPage;
