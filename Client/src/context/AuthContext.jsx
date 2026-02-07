// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../utils/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getMe();
      setUser(response.data);
    } catch (err) {
      localStorage.removeItem("accessToken");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      localStorage.setItem("accessToken", token);
      setUser(user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      localStorage.setItem("accessToken", token);
      setUser(user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isStudent: user?.role === "student",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState, useEffect } from "react";
// import { api } from "../utils/api";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check login on app load
//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const res = await api.get("/auth/me", { withCredentials: true });
//         setUser(res.data.user); // backend returns user
//       } catch (err) {
//         setUser(null);
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkUser();
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     const res = await api.post(
//       "/auth/login",
//       { email, password },
//       { withCredentials: true }
//     );

//     setUser(res.data.user); // FIXED
//     if (res.data.user.role === "admin") navigate("/admin/dashboard");
//     else navigate("/");
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await api.post("/auth/logout", { withCredentaials: true });
//       setUser(null);
//       navigate("/sign-in");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => useContext(AuthContext);
