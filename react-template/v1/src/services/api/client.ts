import axios from "axios";

import { registerInterceptors } from "./interceptors";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

registerInterceptors(apiClient);
