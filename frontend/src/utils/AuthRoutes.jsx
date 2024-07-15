import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRoutes() {
  const storedToken = localStorage.getItem("token");

  return storedToken ? (
    <Outlet />
  ) : (
    <>
      <Navigate to={"/login"} />
    </>
  );
}
