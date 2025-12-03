import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const protectRoute = ({ children }) => {
  const [user, loading] = useAuth();

  if (loading) return <div>Loading...</div>; // spinner or loader

  if (!user) return <Navigate to="/sign-in" />;

  return children;
};

export default protectRoute;
