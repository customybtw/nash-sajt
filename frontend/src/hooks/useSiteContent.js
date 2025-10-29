import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/apiClient';

export function usePages() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const { data } = await apiClient.get('/content/pages');
      return data;
    },
  });
}

export function usePage(slug) {
  return useQuery({
    queryKey: ['page', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const { data } = await apiClient.get(`/content/pages/${slug}`);
      return data;
    },
  });
}

export function useGallery() {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data } = await apiClient.get('/content/gallery');
      return data;
    },
  });
}

export function usePricing() {
  return useQuery({
    queryKey: ['pricing'],
    queryFn: async () => {
      const { data } = await apiClient.get('/content/pricing');
      return data;
    },
  });
}

export function useCareers() {
  return useQuery({
    queryKey: ['careers'],
    queryFn: async () => {
      const { data } = await apiClient.get('/careers');
      return data;
    },
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data } = await apiClient.get('/blog');
      return data;
    },
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await apiClient.get('/ecommerce/products');
      return data;
    },
  });
}
