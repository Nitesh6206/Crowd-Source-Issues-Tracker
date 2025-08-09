import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";

export default function ProtectedLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
