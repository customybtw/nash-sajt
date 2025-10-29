import useApiQuery from './useApiQuery';

const useSections = (page) => useApiQuery(['sections', page], `/pages${page ? `?page=${page}` : ''}`);

export default useSections;
