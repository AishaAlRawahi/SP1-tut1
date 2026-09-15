// src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const fetchTodos = (done) => {
  const params = done !== undefined ? { done } : {};
  return api.get('/', { params });
};
