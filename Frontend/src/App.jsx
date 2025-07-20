import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Page/Login';
import Register from './Page/Register';
import Dashboard from './Page/Dashboard';
import Profile from './Page/Profile';
import Settings from './Page/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import AllIssues from './Page/AllIssues';
import ReportNewIssue from './Page/ReportNewIssue';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AllIssues"
        element={
          <ProtectedRoute>
            <AllIssues />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportIssue"
        element={
          <ProtectedRoute>
            <ReportNewIssue />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;