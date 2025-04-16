import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLogging = user?.isLogging || false;

  return isAuthenticated || isLogging ? children : <Navigate to="/login" />;
};

export default AuthGuard;