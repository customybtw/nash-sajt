import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FiLogIn, FiSave, FiTrash2 } from 'react-icons/fi';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const tabs = [
  'Overview',
  'Sections',
  'Pricing',
  'Gallery',
  'Products',
  'Orders',
  'Messages',
  'Newsletter',
  'Jobs',
  'Blog',
  'Settings'
];

const AdminPage = () => {
  const [token, setToken] = useState(localStorage.getItem('nash-admin-token') || '');
  const [activeTab, setActiveTab] = useState('Overview');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [sections, setSections] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(null);

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  useEffect(() => {
    if (!token) return;
    const fetchSecureData = async () => {
      try {
        const [sectionsRes, pricingRes, galleryRes, productRes, orderRes, messageRes, subRes, jobRes, appRes, postRes] = await Promise.all([
          axios.get(`${API_BASE}/admin/sections`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/pricing`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/gallery`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/products`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/orders`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/messages`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/subscribers`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/jobs`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/applications`, { headers: authHeaders }),
          axios.get(`${API_BASE}/admin/blog`, { headers: authHeaders })
        ]);
        setSections(sectionsRes.data);
        setPricing(pricingRes.data);
        setGallery(galleryRes.data);
        setProducts(productRes.data);
        setOrders(orderRes.data);
        setMessages(messageRes.data);
        setSubscribers(subRes.data);
        setJobs(jobRes.data);
        setApplications(appRes.data);
        setPosts(postRes.data);
      } catch (error) {
        console.error(error);
        setStatus({ type: 'error', message: 'Failed to load admin data. Please login again.' });
        setToken('');
        localStorage.removeItem('nash-admin-token');
      }
    };
    fetchSecureData();
  }, [token, authHeaders]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/auth/login`, loginForm);
      setToken(data.token);
      localStorage.setItem('nash-admin-token', data.token);
      setStatus({ type: 'success', message: 'Welcome back!' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Invalid credentials' });
    }
  };

  const handleSectionSave = async (section) => {
    try {
      const { data } = await axios.post(`${API_BASE}/admin/sections`, section, { headers: authHeaders });
      setSections((prev) => {
        const exists = prev.find((item) => item.id === data.section.id);
        if (exists) {
          return prev.map((item) => (item.id === data.section.id ? data.section : item));
        }
        return [data.section, ...prev];
      });
      setStatus({ type: 'success', message: 'Section saved' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save section' });
    }
  };

  const handleDelete = async (endpoint, id, setState) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`${API_BASE}/admin/${endpoint}/${id}`, { headers: authHeaders });
      setState((prev) => prev.filter((item) => item.id !== id));
      setStatus({ type: 'success', message: 'Item deleted' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to delete item' });
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-200">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-xl">
          <h1 className="flex items-center gap-2 text-xl font-semibold text-white">
            <FiLogIn /> Admin login
          </h1>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={loginForm.email}
              onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={loginForm.password}
              onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-accent/80"
          >
            Sign in
          </button>
          {status && <p className={`text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{status.message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-200">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-3xl text-white">Admin dashboard</h1>
            <p className="text-sm text-slate-400">Manage content, pricing, e-commerce, and marketing from one place.</p>
          </div>
          <button
            onClick={() => {
              setToken('');
              localStorage.removeItem('nash-admin-token');
            }}
            className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate-400 transition hover:border-accent hover:text-accent"
          >
            Log out
          </button>
        </header>
        {status && (
          <div className={`mt-4 rounded-2xl border p-4 text-sm ${status.type === 'success' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-red-400/30 bg-red-400/10 text-red-300'}`}>
            {status.message}
          </div>
        )}
        <nav className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${activeTab === tab ? 'bg-accent text-slate-950' : 'border border-white/10 text-slate-300 hover:border-accent hover:text-accent'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
          {activeTab === 'Overview' && (
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                label: 'Published sections',
                value: sections.length
              }, {
                label: 'Pricing plans',
                value: pricing.length
              }, {
                label: 'Newsletter subscribers',
                value: subscribers.length
              }, {
                label: 'Store products',
                value: products.length
              }, {
                label: 'Open jobs',
                value: jobs.filter((job) => job.isActive).length
              }, {
                label: 'Blog posts',
                value: posts.length
              }].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Sections' && (
            <SectionManager sections={sections} onSave={handleSectionSave} onDelete={(id) => handleDelete('sections', id, setSections)} />
          )}

          {activeTab === 'Pricing' && (
            <PricingManager pricing={pricing} token={token} onChange={setPricing} setStatus={setStatus} />
          )}

          {activeTab === 'Gallery' && (
            <GalleryManager gallery={gallery} token={token} onChange={setGallery} setStatus={setStatus} />
          )}

          {activeTab === 'Products' && (
            <ProductManager products={products} token={token} onChange={setProducts} setStatus={setStatus} />
          )}

          {activeTab === 'Orders' && (
            <div className="space-y-4 text-sm">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-slate-200">
                    <div>
                      <div className="font-semibold text-white">{order.customerName}</div>
                      <div className="text-xs text-slate-400">{order.customerEmail}</div>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-accent">{order.status}</div>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-slate-400">
                    {order.items?.map((item) => (
                      <li key={item.id}>{item.quantity}× {item.productName} — €{item.price}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {orders.length === 0 && <p>No orders yet. Launch your e-shop plan to start selling.</p>}
            </div>
          )}

          {activeTab === 'Messages' && (
            <div className="space-y-4 text-sm">
              {messages.map((message) => (
                <article key={message.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <header className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-white">{message.name}</div>
                    <div className="text-xs text-slate-400">{message.email}</div>
                  </header>
                  <p className="mt-3 text-slate-300">{message.message}</p>
                </article>
              ))}
              {messages.length === 0 && <p>No contact requests yet.</p>}
            </div>
          )}

          {activeTab === 'Newsletter' && (
            <NewsletterManager subscribers={subscribers} token={token} setStatus={setStatus} />
          )}

          {activeTab === 'Jobs' && (
            <JobManager jobs={jobs} applications={applications} token={token} onChange={setJobs} setStatus={setStatus} />
          )}

          {activeTab === 'Blog' && (
            <BlogManager posts={posts} token={token} onChange={setPosts} setStatus={setStatus} />
          )}

          {activeTab === 'Settings' && <SettingsManager token={token} setStatus={setStatus} />}
        </div>
      </div>
    </div>
  );
};

const SectionManager = ({ sections, onSave, onDelete }) => {
  const [form, setForm] = useState({
    slug: '',
    type: 'custom',
    title: '',
    subtitle: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  return (
    <div className="space-y-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave(form);
        }}
        className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            placeholder="Slug (e.g. home, about)"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
            required
          />
          <select
            value={form.type}
            onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
          >
            {['home', 'about', 'contact', 'gallery', 'pricing', 'portfolio', 'blog', 'career', 'terms', 'privacy', 'custom'].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <input
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Title"
          className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
          required
        />
        <input
          value={form.subtitle}
          onChange={(event) => setForm((prev) => ({ ...prev, subtitle: event.target.value }))}
          placeholder="Subtitle"
          className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
        />
        <textarea
          value={form.content}
          onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
          placeholder="HTML content"
          rows={6}
          className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={form.seoTitle}
            onChange={(event) => setForm((prev) => ({ ...prev, seoTitle: event.target.value }))}
            placeholder="SEO title"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
          />
          <input
            value={form.seoDescription}
            onChange={(event) => setForm((prev) => ({ ...prev, seoDescription: event.target.value }))}
            placeholder="SEO description"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
          />
          <input
            value={form.seoKeywords}
            onChange={(event) => setForm((prev) => ({ ...prev, seoKeywords: event.target.value }))}
            placeholder="SEO keywords"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
          />
        </div>
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Save section
        </button>
      </form>
      <div className="space-y-3 text-sm">
        {sections.map((section) => (
          <div key={section.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <div>
              <div className="font-semibold text-white">{section.title}</div>
              <div className="text-xs text-slate-400">{section.slug}</div>
            </div>
            <button onClick={() => onDelete(section.id)} className="text-red-400 hover:text-red-200">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingManager = ({ pricing, token, onChange, setStatus }) => {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    priceMonthly: '',
    billingType: 'monthly',
    description: '',
    features: '',
    highlight: false
  });

  const submitPlan = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...form,
        priceMonthly: form.priceMonthly ? parseFloat(form.priceMonthly) : null,
        features: form.features.split('\n').filter(Boolean)
      };
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(`${API_BASE}/admin/pricing`, payload, { headers });
      onChange((prev) => [data, ...prev.filter((plan) => plan.id !== data.id)]);
      setStatus({ type: 'success', message: 'Pricing plan saved' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save pricing plan' });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submitPlan} className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required placeholder="Plan name" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <input value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} required placeholder="Slug" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <input value={form.priceMonthly} onChange={(event) => setForm((prev) => ({ ...prev, priceMonthly: event.target.value }))} placeholder="Monthly price" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <select value={form.billingType} onChange={(event) => setForm((prev) => ({ ...prev, billingType: event.target.value }))} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="commission">Commission</option>
          </select>
        </div>
        <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Description" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={3} />
        <textarea value={form.features} onChange={(event) => setForm((prev) => ({ ...prev, features: event.target.value }))} placeholder="Features (one per line)" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={4} />
        <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
          <input type="checkbox" checked={form.highlight} onChange={(event) => setForm((prev) => ({ ...prev, highlight: event.target.checked }))} />
          Highlight plan
        </label>
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Save plan
        </button>
      </form>
      <div className="space-y-3 text-sm">
        {pricing.map((plan) => (
          <div key={plan.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <div>
              <div className="font-semibold text-white">{plan.name}</div>
              <div className="text-xs text-slate-400">€{plan.priceMonthly || 'Custom'} · {plan.billingType}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryManager = ({ gallery, token, onChange, setStatus }) => {
  const [form, setForm] = useState({ title: '', description: '', altText: '', imageUrl: '', seoTitle: '', seoDescription: '' });

  const submit = async (event) => {
    event.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(`${API_BASE}/admin/gallery`, form, { headers });
      onChange((prev) => [data, ...prev]);
      setStatus({ type: 'success', message: 'Gallery image saved' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save gallery image' });
    }
  };

  return (
    <div className="space-y-6 text-sm">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required placeholder="Title" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Description" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={3} />
        <input value={form.altText} onChange={(event) => setForm((prev) => ({ ...prev, altText: event.target.value }))} placeholder="Alt text" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <input value={form.imageUrl} onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))} required placeholder="Image URL" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Add image
        </button>
      </form>
      <div className="grid gap-4 md:grid-cols-3">
        {gallery.map((image) => (
          <div key={image.id} className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
            <img src={image.imageUrl} alt={image.altText} className="h-32 w-full rounded-xl object-cover" />
            <div className="text-sm font-semibold text-white">{image.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductManager = ({ products, token, onChange, setStatus }) => {
  const [form, setForm] = useState({ name: '', description: '', price: '', inventory: 0, imageUrl: '' });

  const submit = async (event) => {
    event.preventDefault();
    try {
      const payload = { ...form, price: parseFloat(form.price || '0'), inventory: parseInt(form.inventory || '0', 10) };
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(`${API_BASE}/admin/products`, payload, { headers });
      onChange((prev) => [data, ...prev]);
      setStatus({ type: 'success', message: 'Product saved' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save product' });
    }
  };

  return (
    <div className="space-y-6 text-sm">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required placeholder="Product name" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <input value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} required placeholder="Price" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <input value={form.inventory} onChange={(event) => setForm((prev) => ({ ...prev, inventory: event.target.value }))} placeholder="Inventory" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <input value={form.imageUrl} onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))} placeholder="Image URL" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        </div>
        <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Description" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={3} />
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Save product
        </button>
      </form>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="font-semibold text-white">{product.name}</div>
            <div className="text-xs text-slate-400">€{product.price} · {product.inventory} in stock</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewsletterManager = ({ subscribers, token, setStatus }) => {
  const [newsletter, setNewsletter] = useState({ subject: '', content: '' });

  const sendNewsletter = async (event) => {
    event.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${API_BASE}/admin/newsletter/send`, newsletter, { headers });
      setStatus({ type: 'success', message: 'Newsletter sent' });
      setNewsletter({ subject: '', content: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send newsletter' });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form onSubmit={sendNewsletter} className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm">
        <input value={newsletter.subject} onChange={(event) => setNewsletter((prev) => ({ ...prev, subject: event.target.value }))} required placeholder="Newsletter subject" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <textarea value={newsletter.content} onChange={(event) => setNewsletter((prev) => ({ ...prev, content: event.target.value }))} required placeholder="Content (HTML supported)" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={6} />
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Send campaign
        </button>
      </form>
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Active subscribers</div>
        <ul className="mt-4 space-y-2">
          {subscribers.map((subscriber) => (
            <li key={subscriber.id} className="text-slate-300">
              {subscriber.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const JobManager = ({ jobs, applications, token, onChange, setStatus }) => {
  const [form, setForm] = useState({ title: '', department: '', location: '', employmentType: 'full_time', description: '', requirements: '', benefits: '', isActive: true });

  const submitJob = async (event) => {
    event.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(`${API_BASE}/admin/jobs`, form, { headers });
      onChange((prev) => [data, ...prev]);
      setStatus({ type: 'success', message: 'Job saved' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save job' });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submitJob} className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required placeholder="Job title" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <input value={form.department} onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))} placeholder="Department" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <input value={form.location} onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} placeholder="Location" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
          <select value={form.employmentType} onChange={(event) => setForm((prev) => ({ ...prev, employmentType: event.target.value }))} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2">
            <option value="full_time">Full time</option>
            <option value="part_time">Part time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} required placeholder="Role description" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={4} />
        <textarea value={form.requirements} onChange={(event) => setForm((prev) => ({ ...prev, requirements: event.target.value }))} placeholder="Requirements" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={3} />
        <textarea value={form.benefits} onChange={(event) => setForm((prev) => ({ ...prev, benefits: event.target.value }))} placeholder="Benefits" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={3} />
        <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
          <input type="checkbox" checked={form.isActive} onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))} />
          Active listing
        </label>
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Publish job
        </button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Open positions</h3>
          {jobs.map((job) => (
            <div key={job.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="font-semibold text-white">{job.title}</div>
              <div className="text-xs text-slate-400">{job.location} · {job.employmentType}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Recent applications</h3>
          {applications.map((application) => (
            <div key={application.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-300">
              <div className="font-semibold text-white">{application.fullName}</div>
              <div>{application.email}</div>
              <p className="mt-2 text-slate-400">{application.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogManager = ({ posts, token, onChange, setStatus }) => {
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', isPublished: false });

  const submit = async (event) => {
    event.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(`${API_BASE}/admin/blog`, form, { headers });
      onChange((prev) => [data, ...prev]);
      setStatus({ type: 'success', message: 'Blog post saved' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save blog post' });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm">
        <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required placeholder="Post title" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <input value={form.excerpt} onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))} placeholder="Excerpt" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <textarea value={form.content} onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} required placeholder="Content (HTML supported)" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" rows={6} />
        <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
          <input type="checkbox" checked={form.isPublished} onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))} />
          Publish immediately
        </label>
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Save post
        </button>
      </form>
      <div className="space-y-3 text-sm">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="font-semibold text-white">{post.title}</div>
            <div className="text-xs text-slate-400">{post.isPublished ? 'Published' : 'Draft'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsManager = ({ token, setStatus }) => {
  const [domain, setDomain] = useState('');
  const [analyticsId, setAnalyticsId] = useState('');

  const saveSetting = async (key, value) => {
    try {
      await axios.put(`${API_BASE}/admin/settings/${key}`, value, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus({ type: 'success', message: 'Settings updated' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update settings' });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveSetting('domain', { primaryDomain: domain });
        }}
        className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm"
      >
        <h2 className="text-sm font-semibold text-white">Domain & hosting</h2>
        <input value={domain} onChange={(event) => setDomain(event.target.value)} placeholder="example.com" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Update domain
        </button>
      </form>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveSetting('analytics', { googleAnalyticsId: analyticsId });
        }}
        className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm"
      >
        <h2 className="text-sm font-semibold text-white">Analytics & tracking</h2>
        <input value={analyticsId} onChange={(event) => setAnalyticsId(event.target.value)} placeholder="G-XXXXXXXX" className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2" />
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950">
          <FiSave /> Save analytics ID
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
