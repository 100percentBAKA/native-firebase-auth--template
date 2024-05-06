import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
const debug = false;

export const AuthProvider = ({ children }) => {
  // ! states section
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  // const [isEmailUser, setIsEmailUser] = useState(false);
  // const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    // ! the initializeUser callback function is triggered when there is a change in the auth state

    // ! cleanup
    return unsubscribe;
  }, []);

  const initializeUser = async (user) => {
    if (user) {
      debug && console.log("user data");
      debug && console.log(user);
      await AsyncStorage.setItem("@AuthData", JSON.stringify(user));
      setIsLogged(true); // Add this line
    } else {
      const result = await AsyncStorage.getItem("@AuthData");

      if (result) {
        debug && console.log("Logout scenario");
        await AsyncStorage.removeItem("@AuthData");
        setUser(null);
        setIsLogged(false);
      }
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const result = await AsyncStorage.getItem("@AuthData");

  //     if (result) {
  //       const parsedResult = JSON.parse(result);
  //       debug && console.log("User set");
  //       setUser(parsedResult);
  //       setIsLogged(true);
  //     } else {
  //       debug && console.log("User set to null");
  //       setUser(null);
  //       setIsLogged(false);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const value = {
    user,
    setUser,
    isLogged,
    setIsLogged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ! useContext is a hook, a hook much only be called inside a function
export const useAuth = () => useContext(AuthContext);
