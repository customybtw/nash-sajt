import useApiQuery from './useApiQuery';

const usePricing = () => useApiQuery('pricing', '/pricing');

export default usePricing;
