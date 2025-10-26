import { apiFetch } from "@/services/api.client";
import { useEffect, useRef, useState } from "react";

export const useAuthCheck = () => {
  const [check, setCheck] = useState();
  const [isAuth, setIsAuth] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const didMountRef = useRef(false)

  const authCheck = async () => {
    try {
      setIsCheckingAuth(true)
      const response = await apiFetch("/auth/me", {
        method: "GET"
      });

      if (response?.success) {
        setCheck(response.data.id_user);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }

      return response;
    } catch (error) {
      setIsAuth(false);
      throw error;
    } finally {
      setIsCheckingAuth(false)
    }
  };

  useEffect(() => {
    if (didMountRef.current) {
      return
    }
    didMountRef.current = true;
    authCheck(); // hanya dijalankan sekali di mount
  }, []);

  return { check, authCheck, isAuth, isCheckingAuth };
};
