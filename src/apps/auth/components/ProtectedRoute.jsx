import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useRef } from "react";

export const ProtectedRoute = ({ children }) => {
  const { isAuth, isCheckingAuth, authCheck } = useAuthContext();
  const location = useLocation();
  const prevPathnameRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  // Trigger authCheck setiap kali route berubah
  useEffect(() => {
    // Skip check pertama (sudah dihandle oleh useAuthCheck di mount)
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevPathnameRef.current = location.pathname;
      return;
    }

    // Jika pathname berubah, trigger authCheck
    if (prevPathnameRef.current !== location.pathname) {
      prevPathnameRef.current = location.pathname;
      
      // Trigger authCheck untuk refresh session/token saat pindah halaman
      if (!isCheckingAuth) {
        authCheck();
      }
    }
  }, [location.pathname, authCheck, isCheckingAuth]);

  if (isCheckingAuth) return null;
  if (isAuth) {
    return children
  } else {
    return <Navigate to="/login" replace />;
  }
};
