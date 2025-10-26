import { useAuthCheck } from "../hooks/useAuthCheck";

import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuth, authCheck, check, isCheckingAuth } = useAuthCheck();
  return (
    <AuthContext.Provider value={{ isAuth, authCheck, check, isCheckingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
