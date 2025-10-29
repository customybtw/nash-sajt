import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import GalleryGrid from '../components/GalleryGrid.jsx';
import { fetcher } from '../services/api.js';

const GalleryPage = () => {
  const { data: gallery } = useQuery({ queryKey: ['gallery', '/gallery'], queryFn: fetcher });

  return (
    <div className="bg-white">
      <Helmet>
        <title>Portfolio & Gallery | Nash Studio</title>
        <meta
          name="description"
          content="Explore ecommerce, marketing websites, and brand experiences built for individuals and growing teams."
        />
      </Helmet>
      <section className="section-container py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-slate-900">A showcase of recent work</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Every launch pairs storytelling, conversion strategy, and delightful interactions with a
          robust admin experience.
        </p>
      </section>
      <GalleryGrid
        images={
          gallery?.length
            ? gallery
            : [
                {
                  url: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
                  altText: 'Creative portfolio',
                  caption: 'Personal brand for a photographer',
                  seoDescription: 'Modular portfolio with booking calendar and client proofing area',
                },
                {
                  url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
                  altText: 'Tech startup dashboard',
                  caption: 'SaaS onboarding platform',
                  seoDescription: 'B2B product marketing site with gated resources and blog',
                },
                {
                  url: 'https://images.unsplash.com/photo-1545239351-43e0b67c3ff9?auto=format&fit=crop&w=900&q=80',
                  altText: 'Lifestyle ecommerce shop',
                  caption: 'Direct-to-consumer wellness brand',
                  seoDescription: 'Shopify alternative storefront with advanced merchandising',
                },
              ]
        }
      />
    </div>
  );
};

export default GalleryPage;
