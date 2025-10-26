import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { LoadingScreen } from "@/components/global/LoadingScreen";

export const ProtectedRoute = ({ children }) => {
  const { isAuth, isCheckingAuth } = useAuthContext();

  if (isCheckingAuth) return <LoadingScreen />;
  if (isAuth) {
    return children
  } else {
    return <Navigate to="/login" replace />;
  }
};
