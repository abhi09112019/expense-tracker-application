import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({ baseURL: API_URL });

export const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Health & Fitness',
  'Shopping',
  'Education',
  'Travel',
  'Other',
];

export const fetchExpenses = async (params = {}) => {
  const { data } = await client.get('/expenses', { params });
  return data;
};

export const fetchSummary = async () => {
  const { data } = await client.get('/expenses/summary');
  return data;
};

export const createExpense = async (payload) => {
  const { data } = await client.post('/expenses', payload);
  return data;
};

export const updateExpense = async (id, payload) => {
  const { data } = await client.put(`/expenses/${id}`, payload);
  return data;
};

export const deleteExpense = async (id) => {
  const { data } = await client.delete(`/expenses/${id}`);
  return data;
};

export default client;
