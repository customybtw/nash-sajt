import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../services/api.js';
import HeroSection from '../components/HeroSection.jsx';
import FeatureGrid from '../components/FeatureGrid.jsx';
import PricingTable from '../components/PricingTable.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import CTASection from '../components/CTASection.jsx';
import SEOHighlights from '../components/SEOHighlights.jsx';
import StatsBanner from '../components/StatsBanner.jsx';
import { FiShoppingBag, FiTrendingUp, FiMail, FiShield, FiBarChart2, FiUsers } from 'react-icons/fi';

const featureItems = [
  {
    title: 'Ecommerce ready',
    description: 'Custom storefronts, product bundles, subscriptions, and abandoned cart flows.',
    icon: <FiShoppingBag size={20} />,
    bullets: ['Stripe & PayPal integration', 'Inventory and order management', 'Automated invoicing'],
  },
  {
    title: 'SEO-first architecture',
    description: 'Schema markup, blazing performance, and content modeling for organic growth.',
    icon: <FiTrendingUp size={20} />,
    bullets: ['Meta & OpenGraph controls', 'Structured data builder', 'Keyword-ready sections'],
  },
  {
    title: 'Marketing automation',
    description: 'Capture leads, segment newsletters, and launch drip campaigns from the dashboard.',
    icon: <FiMail size={20} />,
    bullets: ['Newsletter composer', 'Audience tagging', 'Analytics dashboards'],
  },
  {
    title: 'Security and scalability',
    description: 'Role-based access, HTTPS, backups, and scalable infrastructure keep data protected.',
    icon: <FiShield size={20} />,
    bullets: ['Role management', 'MySQL backups', 'Environment configuration'],
  },
  {
    title: 'Growth insights',
    description: 'Track conversions, forms, and ecommerce metrics in one unified analytics hub.',
    icon: <FiBarChart2 size={20} />,
    bullets: ['Google Analytics integration', 'Funnel tracking', 'Data studio exports'],
  },
  {
    title: 'White-glove onboarding',
    description: 'We handle migration, copywriting, design systems, and training for your team.',
    icon: <FiUsers size={20} />,
    bullets: ['Content migration', 'Custom tutorials', 'Dedicated strategist'],
  },
];

const HomePage = () => {
  const { data: sections } = useQuery({
    queryKey: ['home', '/content/pages/home'],
    queryFn: fetcher,
  });
  const heroSection = sections?.find((section) => section.slug === 'hero');

  const { data: plans } = useQuery({ queryKey: ['pricing', '/pricing'], queryFn: fetcher });
  const { data: gallery } = useQuery({ queryKey: ['gallery', '/gallery'], queryFn: fetcher });

  return (
    <div>
      <HeroSection
        title={heroSection?.title || 'Professional websites built for ambitious ideas'}
        subtitle={
          heroSection?.content ||
          'Transform your online presence with a modular, SEO-friendly platform that scales from landing page to full ecommerce experience.'
        }
      />
      <StatsBanner />
      <FeatureGrid features={featureItems} />
      <SEOHighlights />
      <PricingTable plans={plans || []} />
      <ProcessTimeline />
      <GalleryGrid
        images={
          gallery?.length
            ? gallery
            : [
                {
                  url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
                  altText: 'Creative agency workspace',
                  caption: 'Portfolio website for a design agency',
                  seoDescription: 'Responsive portfolio website with custom CMS and animations',
                },
                {
                  url: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=900&q=80',
                  altText: 'Online store layout',
                  caption: 'Premium ecommerce for artisan goods',
                  seoDescription: 'Conversion-led ecommerce storefront with integrated marketing tools',
                },
                {
                  url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
                  altText: 'Team collaborating around laptops',
                  caption: 'SaaS marketing site and blog',
                  seoDescription: 'Scalable marketing site with blog, careers, and analytics dashboards',
                },
              ]
        }
      />
      <Testimonials />
      <FAQAccordion />
      <CTASection />
    </div>
  );
};

export default HomePage;
