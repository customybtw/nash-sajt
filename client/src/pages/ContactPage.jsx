import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../utils/api.js';
import SeoHead from '../components/SeoHead.jsx';

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const mutation = useMutation({
    mutationFn: async (data) => {
      await api.post('/contact', data);
    },
    onSuccess: () => {
      toast.success('Message sent! We will respond shortly.');
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SeoHead
        title="Contact"
        description="Get in touch with Nash Sajt to discuss website projects, marketing retainers, or e-commerce builds."
      />
      <h1 className="section-title text-center">Let’s build something remarkable</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
        Share your goals, target audience, and the experience you want to create. We respond within one business day.
      </p>
      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="mt-12 space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <label className="text-sm font-medium text-dark">
            Name
            <input
              {...register('name', { required: true })}
              className="mt-2 w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Alex Novak"
            />
          </label>
          <label className="text-sm font-medium text-dark">
            Email
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-2 w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="alex@example.com"
            />
          </label>
        </div>
        <label className="text-sm font-medium text-dark">
          How can we help?
          <textarea
            {...register('message', { required: true })}
            rows={6}
            className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Tell us about your project, timeline, and goals."
          />
        </label>
        <button type="submit" className="btn-primary w-full justify-center" disabled={mutation.isPending}>
          {mutation.isPending ? 'Sending…' : 'Send message'}
        </button>
      </form>
      <section className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-10 text-center">
        <h2 className="text-2xl font-semibold text-dark">Prefer email?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Reach us directly at <a href="mailto:hello@nashsajt.com" className="font-semibold text-primary">hello@nashsajt.com</a>
          .
        </p>
      </section>
    </div>
  );
};

export default ContactPage;
