import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api.js';

const NewsletterForm = ({ compact = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (payload) => api.post('/newsletter', payload),
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className={`flex ${compact ? 'flex-col gap-2' : 'flex-col sm:flex-row sm:gap-3'}`}>
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          {...register('email', { required: 'Email is required' })}
        />
        <button type="submit" className="btn-primary justify-center sm:px-6">
          Subscribe
        </button>
      </div>
      {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
      {mutation.isSuccess && (
        <span className="text-xs text-emerald-600">You are subscribed! Check your inbox soon.</span>
      )}
      {mutation.isError && (
        <span className="text-xs text-red-600">Something went wrong. Try again later.</span>
      )}
    </form>
  );
};

NewsletterForm.propTypes = {
  compact: PropTypes.bool,
};

export default NewsletterForm;
