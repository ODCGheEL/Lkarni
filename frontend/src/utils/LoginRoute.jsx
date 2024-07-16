import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginRoute() {
  const storedToken = localStorage.getItem("token");

  return storedToken ? (
    <>
      <Navigate to={"/dashboard"} />
    </>
  ) : (
    <Outlet />
  );
}
