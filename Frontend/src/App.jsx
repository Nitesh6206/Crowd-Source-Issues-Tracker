import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AllIssues from "./Page/Common/AllIssues.jsx";
import ProtectedLayout from "./components/ProtectedRoute";
import Login from "./Page/Authention/Login.jsx";
import Register from "./Page/Authention/Register.jsx";
import Profile from "./Page/Common/Profile.jsx";
import ReportNewIssue from "./Page/Users/ReportNewIssue.jsx";
import MyIssue from "./Page/Users/MyIssue.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DepartmentIssues from "./Page/Department/DepartmentIsuses.jsx";
import { Settings } from "lucide-react";
import Analytics from "./Page/Common/Analytics.jsx";

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
          <Route path="/department-issues" element={<DepartmentIssues />} />

        </Route>

        {/* Shared routes for both roles */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>


      {/* Catch-all */}
      <Route path="/" element={<RootOrCatchAllRedirect />} />
      <Route path="*" element={<RootOrCatchAllRedirect />} />
    </Routes>
  );
}
