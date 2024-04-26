import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ! states section
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    // ! the initializeUser callback function is triggered when there is a change in the auth state

    // ! cleanup
    return unsubscribe;
  }, []);

  const initializeUser = (user) => {
    if (user) {
      setUser({ ...user });

      // ! check for email login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );

      setIsEmailUser(isEmail);
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }

    setIsLoading(false);
  };

  const value = {
    isLoading,
    user,
    setUser,
    isLogged,
    setIsLogged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ! useContext is a hook, a hook much only be called inside a function
export const useAuth = () => useContext(AuthContext);
