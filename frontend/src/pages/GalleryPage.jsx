import React from 'react';
import GalleryGrid from '../components/GalleryGrid.jsx';
import SeoHead from '../components/SeoHead.jsx';
import { useSite } from '../context/SiteContext.jsx';

const GalleryPage = () => {
  const { gallery } = useSite();

  return (
    <div className="bg-slate-950 text-slate-200">
      <SeoHead
        title="Portfolio"
        description="Explore websites, e-commerce experiences, and digital campaigns crafted by Nash Sajt Studio."
      />
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-white">Our digital portfolio</h1>
        <p className="mt-4 text-lg text-slate-300">Dive into a curated gallery of high-performing experiences built for modern brands.</p>
      </section>
      <GalleryGrid images={gallery} />
    </div>
  );
};

export default GalleryPage;
