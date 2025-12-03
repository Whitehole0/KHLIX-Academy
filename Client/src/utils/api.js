import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Axios response interceptor for 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token endpoint
        await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          { withCredentials: true }
        );
        // Retry original request
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        // Optionally logout user
      }
    }
    return Promise.reject(error);
  }
);
