import useApiQuery from './useApiQuery';

const useCareers = () => useApiQuery('careers', '/careers');

export default useCareers;
