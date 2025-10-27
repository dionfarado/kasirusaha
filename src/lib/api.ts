import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (eror) => {
    Promise.reject(eror);
  }
);
