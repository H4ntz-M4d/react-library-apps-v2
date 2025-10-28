import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuth, isCheckingAuth } = useAuthContext();

  if (isCheckingAuth) return null;
  if (isAuth) {
    return children
  } else {
    return <Navigate to="/login" replace />;
  }
};
