import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { apiClient } from '../lib/apiClient';

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (values) => {
    try {
      await apiClient.post('/communications/contact', {
        fullName: values.fullName,
        email: values.email,
        message: values.message,
      });
      reset();
      setStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="section-title">Start your project</h1>
      <p className="text-muted">
        Let us know about your goals, timeline and budget. We respond within one business day.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary">Full name</label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
            type="text"
            required
            {...register('fullName')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary">Email</label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
            type="email"
            required
            {...register('email')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary">How can we help?</label>
          <textarea
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-secondary focus:outline-none"
            rows="6"
            required
            {...register('message')}
          ></textarea>
        </div>
        <button type="submit" className="btn-primary">
          Send message
        </button>
      </form>
      {status && (
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
            status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {status.message}
        </p>
      )}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-primary">Contact details</h2>
          <p className="mt-3 text-sm text-muted">
            Email: <a href="mailto:hello@nash-sajt.com">hello@nash-sajt.com</a>
          </p>
          <p className="text-sm text-muted">Phone: +381 60 123 4567</p>
          <p className="text-sm text-muted">Belgrade • Remote friendly</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-primary">Newsletter</h2>
          <p className="mt-3 text-sm text-muted">Get monthly tips on SEO, e-commerce and marketing automation.</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get('email');
              try {
                await apiClient.post('/communications/newsletter/subscribe', { email, consent: true });
                setStatus({ type: 'success', message: 'Thanks for subscribing!' });
                event.currentTarget.reset();
              } catch (error) {
                setStatus({ type: 'error', message: 'Subscription failed. Please try again later.' });
              }
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-secondary focus:outline-none"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
