import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const PublicRoute = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
