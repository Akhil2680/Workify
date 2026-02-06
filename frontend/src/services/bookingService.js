import api from './api';

export const bookWorker = async (workerId, payload) => {
  const { data } = await api.post(`/api/bookings/book/${workerId}`, payload);
  return data;
};

export const getClientBookings = async () => {
  const { data } = await api.get('/api/bookings/client/history');
  return data;
};
