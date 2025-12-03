import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check login on app load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data); // backend returns user
      } catch (err) {
        setUser(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data);
      // redirect based on role
      if (res.data.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      throw err; // handle in form
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
