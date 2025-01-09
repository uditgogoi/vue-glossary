import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_TEXT_GENERATION_MODEL_API,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Modify request config before sending, e.g., add auth token
    const token=  import.meta.env.VITE_API_KEY
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       // Handle errors globally, e.g., refresh token or log out on 401
//       if (error.response && error.response.status === 401) {
//         console.error('Unauthorized! Redirecting to login...');
//       }
//       return Promise.reject(error);
//     }
//   );

export default api;
