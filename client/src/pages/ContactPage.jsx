import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm.jsx';

const ContactPage = () => (
  <div className="bg-white">
    <Helmet>
      <title>Contact Nash Studio | Start Your Project</title>
      <meta
        name="description"
        content="Share your goals and we will craft a tailored website, ecommerce, and marketing roadmap."
      />
    </Helmet>
    <section className="section-container py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Let’s build something bold</h1>
          <p className="mt-4 text-lg text-slate-600">
            Tell us about your business, challenges, and the features you need. We respond within one
            business day with next steps and an optional discovery call.
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>
              <strong className="text-slate-900">Email:</strong> studio@example.com
            </p>
            <p>
              <strong className="text-slate-900">Phone:</strong> +385 00 000 000
            </p>
            <p>
              <strong className="text-slate-900">Office hours:</strong> Monday – Friday, 09:00–17:00 CET
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
);

export default ContactPage;
