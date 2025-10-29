import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const useApiQuery = (key, url, options = {}) =>
  useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const { data } = await api.get(url);
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  });

export default useApiQuery;
