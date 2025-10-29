import SeoHead from '../components/SeoHead.jsx';
import { useProducts } from '../hooks/useProducts.js';

const EcommercePage = () => {
  const { data: products } = useProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SeoHead
        title="E-commerce"
        description="Discover how Nash Sajt builds conversion-focused e-commerce stores with Stripe, PayPal, and inventory management."
      />
      <h1 className="section-title text-center">E-commerce without complexity</h1>
      <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-slate-600">
        Launch an online shop with secure payments, product catalogs, and automated order workflows. Manage it all from the same
        admin panel as your content and marketing.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
          <h2 className="text-xl font-semibold text-dark">Store management</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>✔ Product catalogs with images, pricing, inventory, and SEO metadata.</li>
            <li>✔ Customer profiles, order history, and automated email notifications.</li>
            <li>✔ Stripe and PayPal integration with configurable tax and shipping rules.</li>
            <li>✔ Subscription products and membership experiences.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
          <h2 className="text-xl font-semibold text-dark">Growth toolkit</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>✔ Landing pages optimized for paid campaigns.</li>
            <li>✔ Abandoned cart automation and loyalty discounts.</li>
            <li>✔ Google Analytics, Search Console, and SEO reporting.</li>
            <li>✔ Integrations with newsletters and social media ads.</li>
          </ul>
        </div>
      </div>
      {products?.length ? (
        <section className="mt-16">
          <h2 className="section-title">Demo product lineup</h2>
          <p className="mt-2 text-sm text-slate-600">
            Manage products, stock, and pricing directly from the admin interface.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-primary/5">
                <h3 className="text-lg font-semibold text-dark">{product.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                <div className="mt-4 text-xl font-bold text-dark">€{product.price}</div>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">SKU: {product.sku}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default EcommercePage;
