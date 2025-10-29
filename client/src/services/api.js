import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetcher = async ({ queryKey }) => {
  const [, url, params] = queryKey;
  const response = await api.get(url, { params });
  return response.data;
};

export default api;
