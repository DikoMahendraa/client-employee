import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL || "http://127.0.0.1:8000", // Default base URL
    timeout: 10000, // Timeout after 10 seconds
  });

  // Request Interceptor
  instance.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    (config: AxiosRequestConfig) => {
      const token = localStorage.getItem("token") ?? ""; // Example: Fetch token from localStorage
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Handle errors globally
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          // Add custom logic like token refresh or logout
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export the Axios instance
const axiosInstance = createAxiosInstance();
export default axiosInstance;
