import React, { children, createContext, useEffect, useState } from "react";
import axiosInstance from "./request";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [logedIn, SetLogedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("users/auth/");
        //if user is already logeding
        if (response.status == 200) {
          SetLogedIn(true);
        }
        //else if he is not loged in or token is expired
        else if (response.status == 401) {
          SetLogedIn(false);
        }
        //server down error
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    // checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ logedIn, SetLogedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
