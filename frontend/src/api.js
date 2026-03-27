import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://teamneo.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Increased from 15s to 60s to handle Render.com cold starts
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const requestUrl = String(config.url || '');
    const isAuthRequest = requestUrl.includes('/api/auth/');

    if (isAuthRequest) {
      // Let auth requests wait indefinitely because backend can take longer to respond.
      config.timeout = 0;
    }

    if (token && !isAuthRequest) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('API request setup error:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
    }
    console.error('API response error:', { status, url, message: error.message, error });
    return Promise.reject(error);
  },
);

export default api;
