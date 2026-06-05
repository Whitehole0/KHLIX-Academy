// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for token refresh (can be expanded)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getMe: () => api.get("/auth/me"),
};

export const coursesAPI = {
  getAllCourses: () => api.get("/courses"),
  getCourse: (id) => api.get(`/courses/${id}`),
  getMyCourses: () => api.get("/courses/my"),
  createCourse: (courseData) => api.post("/courses", courseData),
};

export const lessonsAPI = {
  getCourseLessons: (courseId) => api.get(`/courses/${courseId}/lessons`),
  createLesson: (lessonData) => api.post("/lessons", lessonData),
};

export const uploadAPI = {
  uploadVideo: (formData) =>
    api.post("/upload/video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export const enrollmentsAPI = {
  getMyEnrollments: () => api.get("/enrollments/my"),
};

export default api;

// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:5000/",
//   withCredentials: true,
// });

// // Axios response interceptor for 401 (token expired)
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Call refresh token endpoint
//         await axios.post(
//           "http://localhost:5000/auth/refreshToken",
//           {},
//           { withCredentials: true }
//         );
//         // Retry original request
//         return api(originalRequest);
//       } catch (err) {
//         console.error("Refresh token failed:", err);
//         // Optionally logout user
//       }
//     }
//     return Promise.reject(error);
//   }
// );
