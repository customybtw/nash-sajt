import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import ContactForm from '../components/ContactForm.jsx';
import NewsletterForm from '../components/NewsletterForm.jsx';

const ContactPage = () => (
  <div className="bg-slate-950 text-slate-200">
    <SeoHead title="Contact" description="Request a quote, demo the admin panel, or ask about custom functionality." />
    <section className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="font-display text-4xl text-white">Let&apos;s build something exceptional</h1>
      <p className="mt-4 text-lg text-slate-300">
        Schedule a workshop, request pricing details, or explore our white-label partner program.
      </p>
    </section>
    <section className="bg-slate-900 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
        <div className="flex-1 space-y-4">
          <h2 className="font-display text-2xl text-white">Stay in the loop</h2>
          <p className="text-sm text-slate-400">
            Get monthly strategies on SEO, CRO, and automation straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
);

export default ContactPage;
