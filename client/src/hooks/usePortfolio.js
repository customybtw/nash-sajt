import useApiQuery from './useApiQuery';

export const usePortfolio = () => useApiQuery('portfolio', '/portfolio');
export const usePortfolioItem = (slug) => useApiQuery(['portfolio', slug], `/portfolio/${slug}`);
