import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated]);

  // if (!user) {
  //   return <Navigate to={"/login"} replace />;
  // }
  return children;
};

export default ProtectedRoute;
