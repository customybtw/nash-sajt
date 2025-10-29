import { usePage } from '../hooks/useSiteContent';

export default function About() {
  const { data: page } = usePage('about');

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="section-title">About Nash Sajt</h1>
      <p className="text-lg text-muted">
        {page?.description ||
          'Nash Sajt creates beautiful, SEO-friendly websites and marketing strategies that accelerate growth for individuals, freelancers and small businesses across Europe.'}
      </p>
      <article
        className="prose prose-slate mt-10 max-w-none prose-h2:text-primary"
        dangerouslySetInnerHTML={{
          __html:
            page?.content ||
            `<h2>Full service studio</h2><p>Our multidisciplinary team blends design, development, marketing and analytics to craft end-to-end experiences. We focus on usability, performance and brand storytelling.</p><h2>Innovative workflows</h2><p>The admin panel empowers teams to update content, launch campaigns, track leads and manage online stores in real time. Each website is optimized for SEO and conversions from day one.</p>`
        }}
      />
    </section>
  );
}
