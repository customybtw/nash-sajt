import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../utils/api.js';

const NewsletterForm = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      await api.post('/newsletter', { email });
    },
    onSuccess: () => {
      setEmail('');
      toast.success('You are now subscribed to our newsletter!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className={`mt-4 flex gap-2 ${variant === 'compact' ? 'flex-col' : 'flex-wrap'}`}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        className="w-full flex-1 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn-primary w-full md:w-auto"
      >
        {mutation.isPending ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );
};

export default NewsletterForm;
