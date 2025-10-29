import useApiQuery from './useApiQuery';

export const useBlogPosts = () => useApiQuery('blog', '/blog');
export const useBlogPost = (slug) => useApiQuery(['blog', slug], `/blog/${slug}`, { enabled: Boolean(slug) });
