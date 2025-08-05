import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./Page/Login";
import Register from "./Page/Register";
import Dashboard from "./Page/Dashboard";
import Profile from "./Page/Profile";
import Settings from "./Page/Settings";
import ReportNewIssue from "./Page/ReportNewIssue";
import AllIssues from "./Page/AllIssues";
import Header from "./components/Header";
import MyIssue from "./Page/MyIssue";

// Layout for protected routes with Header
function ProtectedLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

// Layout for auth routes (login/register)
function AuthLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

// Root and catch-all redirect helper
function RootOrCatchAllRedirect() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <Routes>
      {/* Auth (public) routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-issues" element={<AllIssues />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-reports" element={<MyIssue />} />
        <Route path="/report-issue" element={<ReportNewIssue />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Root and catch-all */}
      <Route path="/" element={<RootOrCatchAllRedirect />} />
      <Route path="*" element={<RootOrCatchAllRedirect />} />
    </Routes>
  );
}

export default App;
