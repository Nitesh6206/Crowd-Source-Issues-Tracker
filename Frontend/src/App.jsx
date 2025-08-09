import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Dashboard from "./Page/Dashboard";
import Profile from "./Page/Profile";
import Settings from "./Page/Settings";
import ReportNewIssue from "./Page/ReportNewIssue";
import AllIssues from "./Page/AllIssues";
import MyIssue from "./Page/MyIssue";
import ProtectedLayout from "./components/ProtectedRoute";

// Public Auth Layout
function AuthLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

// Redirect for root & unknown URLs
function RootOrCatchAllRedirect() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

// Role-based route wrapper
function RoleProtectedRoute({ allowedRoles }) {
  const userData = useSelector((state) => state.auth.user);
  return allowedRoles.includes(userData.role) ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        {/* Dashboard is accessible to both roles */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Citizen-only routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["CITIZEN"]} />}>
          <Route path="/all-issues" element={<AllIssues />} />
          <Route path="/my-reports" element={<MyIssue />} />
          <Route path="/report-issue" element={<ReportNewIssue />} />
        </Route>

        {/* Department-only routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["DEPARTMENT"]} />}>
          <Route path="/all-issues" element={<AllIssues />} />

        </Route>

        {/* Shared routes for both roles */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>


      {/* Catch-all */}
      <Route path="/" element={<RootOrCatchAllRedirect />} />
      <Route path="*" element={<RootOrCatchAllRedirect />} />
    </Routes>
  );
}
