import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL!,
  withCredentials: true,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag para evitar múltiplos refresh simultâneos
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se for 401 e ainda não tentamos o refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Espera o refresh terminar
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(instance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await instance.get("/auth/refresh", {});
        const newToken = data.access_token;

        // Atualiza token globalmente
        instance.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;
        processQueue(null, newToken);

        // Repete a requisição original com o novo token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  }
);
