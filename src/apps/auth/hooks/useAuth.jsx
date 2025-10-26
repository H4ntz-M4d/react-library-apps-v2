import { login, logout, register } from "@/services/api.auth";
import { useState } from "react";
import { Navigate } from "react-router";
import { useImmer } from "use-immer";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useImmer({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useImmer({
    username: "",
    email: "",
    password: "",
  });

  const signIn = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await login(data);
      if (res?.success) {
        <Navigate to={"/genre"} />;
      }
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await register(data);
      if (res?.success) {
        <Navigate to={"/genre"} />;
      }
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await logout(data);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    loading,
    error,
    loginData,
    setLoginData,
    registerData,
    setRegisterData,
    signOut
  };
};
