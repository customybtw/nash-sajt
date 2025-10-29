import SeoHead from '../components/SeoHead.jsx';
import useSections from '../hooks/useSections.js';

const AboutPage = () => {
  const { data: sections } = useSections('about');

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SeoHead
        title="About"
        description="Meet the Nash Sajt team crafting SEO-first websites, marketing experiences, and scalable admin dashboards for small businesses."
      />
      <h1 className="section-title">About Nash Sajt</h1>
      <p className="mt-4 text-lg text-slate-600">
        We help founders, marketers, and creative teams launch modern websites with the growth tools they need from day one. Our
        multidisciplinary team blends strategy, design, development, and marketing to deliver measurable business outcomes.
      </p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {sections?.map((section) => (
          <article key={section.id} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-primary/5">
            <h2 className="text-xl font-semibold text-dark">{section.title}</h2>
            {section.subtitle && <p className="mt-1 text-sm uppercase tracking-wide text-primary">{section.subtitle}</p>}
            {section.content && (
              <div
                className="prose prose-slate mt-4 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </article>
        ))}
      </div>
      <section className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-10">
        <h2 className="text-2xl font-semibold text-dark">Our mission</h2>
        <p className="mt-4 text-base text-slate-600">
          Make high-end digital experiences accessible to individuals and small businesses. We focus on usability, brand storytelling,
          and measurable marketing outcomes so you can scale with confidence.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
