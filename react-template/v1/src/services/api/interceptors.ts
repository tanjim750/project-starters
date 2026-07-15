import type { AxiosInstance } from "axios";

import { localStorageKeys } from "../../core/storage/localStorage";

export function registerInterceptors(apiClient: AxiosInstance) {
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(localStorageKeys.accessToken);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}
