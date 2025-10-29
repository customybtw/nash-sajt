import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API_BASE}/newsletter/subscribe`, { email });
      setStatus({ type: 'success', message: 'Subscribed successfully!' });
      setEmail('');
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to subscribe right now.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-left shadow-lg md:flex-row md:items-center md:gap-3">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Join our growth newsletter"
          className="w-full rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Joining…' : 'Subscribe'}
      </button>
      {status && (
        <p className={`text-xs md:w-40 ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{status.message}</p>
      )}
    </form>
  );
};

export default NewsletterForm;
