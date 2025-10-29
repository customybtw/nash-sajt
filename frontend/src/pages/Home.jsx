import Hero from '../components/Hero';
import { services, marketingHighlights } from '../data/highlights';
import { useGallery, usePricing, useBlogPosts, useProducts } from '../hooks/useSiteContent';

export default function Home() {
  const { data: gallery = [] } = useGallery();
  const { data: pricing = [] } = usePricing();
  const { data: posts = [] } = useBlogPosts();
  const { data: products = [] } = useProducts();

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="section-title">Why people choose Nash Sajt</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
              <p className="mt-3 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Featured work</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {gallery.slice(0, 6).map((item) => (
              <figure key={item.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                <img
                  src={item.image_url || item.imageUrl}
                  alt={item.alt_text || item.altText || item.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <figcaption className="p-4">
                  <p className="font-semibold text-primary">{item.title}</p>
                  <p className="text-sm text-muted">{item.description}</p>
                </figcaption>
              </figure>
            ))}
            {!gallery.length && (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-muted">
                Showcase your latest case studies and designs here.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="section-title">Pricing plans that scale with you</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricing.map((plan) => (
            <div key={plan.id || plan.name} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow">
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{plan.name}</p>
              <p className="mt-3 text-4xl font-bold text-primary">
                {plan.price === 0 ? 'Commission' : `€${Number(plan.price).toFixed(0)}`}
                <span className="text-sm font-medium text-muted"> {plan.billing_cycle === 'commission' ? '' : '/month'}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-primary">
                {(Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features || '[]')).map((feature) => (
                  <li key={feature} className="rounded-full bg-secondary/10 px-3 py-2">{feature}</li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary mt-6 text-center">
                Choose Plan
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Social media marketing & design</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {marketingHighlights.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-secondary bg-secondary/10 p-6">
              <h3 className="text-lg font-semibold text-secondary">Design Portfolio</h3>
              <p className="mt-3 text-sm text-secondary/80">
                From brand kits to packaging, our design team crafts visuals that tell your story and drive conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-primary px-6 py-12 text-white md:px-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">E-shop essentials in one platform</h2>
              <p className="mt-4 text-sm text-slate-200">
                Manage products, track stock, process secure payments and follow every order from the admin panel.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-100">
                <li>• Product galleries with SEO-friendly descriptions</li>
                <li>• Stripe & PayPal payment integration</li>
                <li>• Order, inventory and customer management</li>
                <li>• Automated receipts and fulfilment workflows</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 text-sm text-slate-100">
              <p className="text-secondary">Sample products</p>
              <ul className="mt-3 space-y-2">
                {products.slice(0, 4).map((product) => (
                  <li key={product.id} className="rounded-2xl bg-black/20 px-4 py-3">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs">€{Number(product.price).toFixed(2)}</p>
                  </li>
                ))}
                {!products.length && <li className="rounded-2xl bg-black/20 px-4 py-3">Add your products in the admin panel.</li>}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Latest insights</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article key={post.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs uppercase tracking-wide text-secondary">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft' }
                </p>
                <h3 className="mt-2 text-xl font-semibold text-primary">{post.title}</h3>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                <a href="/blog" className="mt-4 inline-flex text-sm font-semibold text-secondary">
                  Read more →
                </a>
              </article>
            ))}
            {!posts.length && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-muted">
                Use the blog to publish guides and updates.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
