import api from './api';

export const getWorkers = async () => {
  const { data } = await api.get('/api/workers');
  return data;
};

export const getWorkerById = async (id) => {
  const { data } = await api.get(`/api/workers/${id}`);
  return data;
};
