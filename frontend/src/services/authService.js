import api from './api';

export const login = async (payload) => {
  const { data } = await api.post('/api/auth/login', payload);
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post('/api/auth/register', payload);
  return data;
};
