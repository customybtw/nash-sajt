import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api, { fetcher } from '../services/api.js';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState('');

  const { data: settings } = useQuery({
    queryKey: ['settings', '/content/settings'],
    queryFn: fetcher,
    enabled: Boolean(token),
  });

  const { data: plans } = useQuery({
    queryKey: ['pricing', '/pricing'],
    queryFn: fetcher,
    enabled: Boolean(token),
  });

  const { data: sections } = useQuery({
    queryKey: ['home', '/content/pages/home'],
    queryFn: fetcher,
    enabled: Boolean(token),
  });

  const settingForm = useForm();
  const heroForm = useForm();

  const updateSetting = useMutation({
    mutationFn: ({ key, value }) => api.put(`/content/settings/${key}`, { value }),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings', '/content/settings']);
    },
  });

  const updateHero = useMutation({
    mutationFn: (payload) => api.put(`/content/pages/${payload.id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['home', '/content/pages/home']);
    },
  });

  const updatePlan = useMutation({
    mutationFn: (payload) => api.put('/pricing', payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['pricing', '/pricing']);
    },
  });

  const heroSection = sections?.find((section) => section.slug === 'hero');

  return (
    <div className="bg-white">
      <Helmet>
        <title>Admin Dashboard | Nash Studio</title>
      </Helmet>
      <section className="section-container py-20">
        <h1 className="font-display text-4xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Paste your JWT token to unlock editing. Update hero copy, SEO settings, pricing, and more.
          This lightweight dashboard interacts with the Express API powered by MySQL.
        </p>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-soft">
          <label className="text-sm font-semibold text-slate-700" htmlFor="token">
            JWT Token
          </label>
          <input
            id="token"
            type="password"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            placeholder="Paste token from /api/auth/login"
            value={token}
            onChange={(event) => {
              const value = event.target.value;
              setToken(value);
              api.defaults.headers.common.Authorization = value ? `Bearer ${value}` : undefined;
            }}
          />
        </div>
        {token && (
          <div className="mt-12 space-y-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-display text-2xl font-semibold text-slate-900">Homepage hero</h2>
              <form
                className="mt-6 space-y-4"
                onSubmit={heroForm.handleSubmit((values) => updateHero.mutate({ ...values, id: heroSection?.id }))}
              >
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="title">
                    Title
                  </label>
                  <input
                    id="title"
                    defaultValue={heroSection?.title}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    {...heroForm.register('title', { required: true })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="content">
                    Subtitle
                  </label>
                  <textarea
                    id="content"
                    rows="4"
                    defaultValue={heroSection?.content}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    {...heroForm.register('content', { required: true })}
                  />
                </div>
                <button type="submit" className="btn-primary">
                  {updateHero.isLoading ? 'Saving...' : 'Save hero section'}
                </button>
                {updateHero.isSuccess && (
                  <p className="text-xs text-emerald-600">Hero updated successfully.</p>
                )}
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-display text-2xl font-semibold text-slate-900">Global SEO settings</h2>
              <form
                className="mt-6 space-y-4"
                onSubmit={settingForm.handleSubmit((values) =>
                  updateSetting.mutate({ key: values.key, value: values.value })
                )}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="key">
                      Setting key
                    </label>
                    <select
                      id="key"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                      {...settingForm.register('key', { required: true })}
                    >
                      <option value="meta_title">Meta title</option>
                      <option value="meta_description">Meta description</option>
                      <option value="google_analytics_id">Google Analytics ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="value">
                      Value
                    </label>
                    <input
                      id="value"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                      {...settingForm.register('value', { required: true })}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  {updateSetting.isLoading ? 'Saving...' : 'Save setting'}
                </button>
                {updateSetting.isSuccess && (
                  <p className="text-xs text-emerald-600">Setting saved successfully.</p>
                )}
              </form>
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-slate-800">Current settings</h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-500">
                  {settings?.map((setting) => (
                    <li key={setting.key}>
                      <span className="font-semibold text-slate-700">{setting.key}</span>: {setting.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-display text-2xl font-semibold text-slate-900">Pricing plans</h2>
              <div className="mt-6 grid gap-4">
                {(plans || []).map((plan) => (
                  <div key={plan.id} className="grid gap-4 rounded-2xl border border-slate-200 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-700">Name</label>
                        <input
                          defaultValue={plan.name}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                          onBlur={(event) =>
                            updatePlan.mutate({ ...plan, name: event.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-700">Price (€)</label>
                        <input
                          type="number"
                          defaultValue={plan.price}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                          onBlur={(event) =>
                            updatePlan.mutate({ ...plan, price: Number(event.target.value) })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
                      <textarea
                        defaultValue={plan.description}
                        rows="2"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        onBlur={(event) =>
                          updatePlan.mutate({ ...plan, description: event.target.value })
                        }
                      />
                    </div>
                  </div>
                ))}
                {updatePlan.isSuccess && (
                  <p className="text-xs text-emerald-600">Pricing updated.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
