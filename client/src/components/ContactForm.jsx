import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api.js';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (payload) => api.post('/contact', payload),
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('name', { required: 'Please share your name' })}
          />
          {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="message">
          Project Details
        </label>
        <textarea
          id="message"
          rows="5"
          className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          placeholder="Tell us about your goals, audience, and must-have features."
          {...register('message', {
            required: 'Please include a message',
            minLength: { value: 20, message: 'Share at least 20 characters' },
          })}
        />
        {errors.message && <span className="text-xs text-red-600">{errors.message.message}</span>}
      </div>
      <button type="submit" className="btn-primary justify-center">
        {mutation.isLoading ? 'Sending...' : 'Send message'}
      </button>
      {mutation.isSuccess && (
        <p className="text-sm text-emerald-600">Thanks! We will respond within one business day.</p>
      )}
      {mutation.isError && <p className="text-sm text-red-600">Something went wrong. Please retry.</p>}
    </form>
  );
};

export default ContactForm;
