import { useGallery } from '../hooks/useSiteContent';

export default function Gallery() {
  const { data: gallery = [] } = useGallery();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="section-title">Creative showcase</h1>
      <p className="max-w-2xl text-muted">
        Each project combines thoughtful strategy, refined design systems and robust technology to tell brand stories in a
        memorable way.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={item.image_url || item.imageUrl}
              alt={item.alt_text || item.altText || item.title}
              className="h-56 w-full object-cover"
              loading="lazy"
            />
            <figcaption className="p-5">
              <p className="font-semibold text-primary">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </figcaption>
          </figure>
        ))}
        {!gallery.length && (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-muted">
            Upload images via the admin panel to build your interactive gallery.
          </div>
        )}
      </div>
    </section>
  );
}
