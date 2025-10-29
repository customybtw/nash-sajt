import { useState } from 'react';

const faqs = [
  {
    question: 'Can I update content and SEO data without coding?',
    answer:
      'Absolutely. The admin dashboard lets you edit copy, headings, metadata, images, pricing, and product inventory using intuitive forms.',
  },
  {
    question: 'Do you integrate payment providers like Stripe and PayPal?',
    answer:
      'Yes. The 100€ plan includes full ecommerce setup with Stripe and PayPal integrations, order management, and analytics tracking.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We remain your growth partner: performance monitoring, CRO experiments, newsletter campaigns, and marketing design are included or available as add-ons.',
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-container py-16">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-semibold text-slate-900">Frequently asked questions</h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
          Your dedicated project strategist is available to cover anything else you need.
        </p>
      </div>
      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-slate-800"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                {faq.question}
                <span className="text-2xl text-brand-500">{isOpen ? '–' : '+'}</span>
              </button>
              {isOpen && <p className="px-6 pb-6 text-sm text-slate-600">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;
