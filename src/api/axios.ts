// src/api/axios.ts
import axios from "axios";


interface IFormRegisterAxios {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const login = (credentials: { email: string; password: string }) =>
  api.post("/api/login", credentials);

export const register = (userData: IFormRegisterAxios) =>
  api.post("/api/register", userData);

export default api;
