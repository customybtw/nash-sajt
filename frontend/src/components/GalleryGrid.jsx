import React from 'react';

const GalleryGrid = ({ images }) => (
  <section className="bg-slate-900 py-20">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl text-white">Recent launches</h2>
          <p className="text-slate-400">A curated selection of digital experiences we crafted for ambitious teams.</p>
        </div>
        <a href="/contact" className="rounded-full border border-white/10 px-6 py-2 text-sm uppercase tracking-widest text-slate-200 transition hover:border-accent hover:text-accent">
          Start your project
        </a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <figure
            key={image.id || image.imageUrl}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40"
          >
            <img src={image.imageUrl} alt={image.altText || image.title} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6 text-sm text-slate-200">
              <div className="font-semibold text-white">{image.title}</div>
              <p className="text-xs text-slate-400">{image.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default GalleryGrid;
