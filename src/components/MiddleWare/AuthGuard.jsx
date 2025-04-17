import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const loggedInUser = localStorage.getItem("user");

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
