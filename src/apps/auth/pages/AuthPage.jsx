import { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegistrationForm } from "../components/RegistrationForm";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
import { LoadingScreen } from "@/components/global/LoadingScreen";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // simulasi waktu transisi halaman
    const timeout = setTimeout(() => setLoading(false), 800);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const toggleForm = () => setIsLogin(!isLogin);
  return (
    <div className="bg-linear-to-bl from-blue-600 to-teal-500 min-h-dvh flex justify-center items-center py-10">
      {loading && <LoadingScreen />}
      <div className="rounded-xl max-w-5xl bg-black/10 border-2">
        <div className="flex justify-center items-stretch">
          <div className="w-full relative overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full"
                >
                  <LoginForm onSwitch={toggleForm} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full"
                >
                  <RegistrationForm onSwitch={toggleForm} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex flex-col justify-center items-center w-full bg-white rounded-r-lg">
            <img
              className="transition duration-500 ease-in-out hover:scale-125"
              src="src/assets/auth/bg_login.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
