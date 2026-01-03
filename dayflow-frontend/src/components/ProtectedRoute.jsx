import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;

  if (role && userRole !== role) {
    // Allow HR_OFFICER to access admin routes
    if (role === "ADMIN" && userRole === "HR_OFFICER") {
      return children;
    }
    return <Navigate to="/" />;
  }

  return children;
}
