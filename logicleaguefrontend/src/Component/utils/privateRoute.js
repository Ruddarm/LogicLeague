import React, { Component } from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("jwttoken") !== null;
  console.log(isAuthenticated)
  return isAuthenticated ? element : <Navigate to="/login" />;
};
export default PrivateRoute;
