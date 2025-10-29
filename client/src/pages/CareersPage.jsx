import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import useCareers from '../hooks/useCareers.js';
import api from '../utils/api.js';
import SeoHead from '../components/SeoHead.jsx';

const CareersPage = () => {
  const { data: positions } = useCareers();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const mutation = useMutation({
    mutationFn: async (data) => {
      await api.post(`/careers/${data.positionId}/apply`, data);
    },
    onSuccess: () => {
      toast.success('Application sent! We’ll be in touch soon.');
      reset();
      queryClient.invalidateQueries({ queryKey: ['careers'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SeoHead
        title="Careers"
        description="Join the Nash Sajt team of designers, developers, and marketers building growth-ready digital experiences."
      />
      <h1 className="section-title text-center">Work with a remote-first creative team</h1>
      <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-slate-600">
        We&apos;re always looking for people who love designing, building, and marketing beautiful digital products.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {positions?.map((position) => (
            <article key={position.id} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
              <h2 className="text-xl font-semibold text-dark">{position.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-wide text-primary">
                {position.location} · {position.employmentType.replace('_', ' ')}
              </p>
              <div className="prose prose-slate mt-4 text-sm" dangerouslySetInnerHTML={{ __html: position.description }} />
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {position.requirements?.map((requirement) => (
                  <li key={requirement}>✔ {requirement}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5"
        >
          <h2 className="text-xl font-semibold text-dark">Submit your application</h2>
          <p className="mt-2 text-sm text-slate-600">Tell us about your experience and attach a portfolio or CV link.</p>
          <label className="mt-6 block text-sm font-medium text-dark">
            Full name
            <input
              {...register('name', { required: true })}
              className="mt-2 w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Jane Doe"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-dark">
            Email address
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-2 w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="jane@example.com"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-dark">
            Role
            <select
              {...register('positionId', { required: true })}
              className="mt-2 w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a role</option>
              {positions?.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.title}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-medium text-dark">
            Message
            <textarea
              {...register('message', { required: true })}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Why do you want to join us?"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-dark">
            Portfolio or CV link
            <input
              {...register('cvUrl')}
              className="mt-2 w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="https://"
            />
          </label>
          <button type="submit" className="btn-primary mt-6 w-full justify-center" disabled={mutation.isPending}>
            {mutation.isPending ? 'Sending…' : 'Send application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareersPage;
