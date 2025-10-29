import useApiQuery from './useApiQuery';

export const useProducts = () => useApiQuery('products', '/products');
export const useProduct = (slug) => useApiQuery(['products', slug], `/products/${slug}`, { enabled: Boolean(slug) });
