import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API_BASE}/contact`, formState);
      setStatus({ type: 'success', message: 'Thanks! We will reach out shortly.' });
      setFormState({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-lg">
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-slate-400" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={formState.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-slate-400" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs uppercase tracking-widest text-slate-400" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
            placeholder="Optional"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs uppercase tracking-widest text-slate-400" htmlFor="message">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formState.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
            placeholder="Tell us about your goals, timeline, and budget."
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Sending…' : 'Send message'}
      </button>
      {status && (
        <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
