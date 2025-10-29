import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../services/api.js';

export const useSiteMetadata = () => {
  const { data } = useQuery({ queryKey: ['settings', '/content/settings'], queryFn: fetcher });

  if (!data) {
    return { metaTitle: null, metaDescription: null };
  }

  const settings = data.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {});

  return {
    metaTitle: settings.meta_title,
    metaDescription: settings.meta_description,
    analyticsId: settings.google_analytics_id,
  };
};
