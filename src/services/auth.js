// src/services/auth.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export async function loginApi({ userName, userPassword }) {
  const { data } = await api.post('/', { userName, userPassword });
  return data;
}
