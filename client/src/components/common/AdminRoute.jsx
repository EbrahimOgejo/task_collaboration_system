import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Spinner from "../ui/Spinner";

export default function AdminRoute({
  children
}) {
  const {
    token,
    user,
    loading
  } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user?.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}