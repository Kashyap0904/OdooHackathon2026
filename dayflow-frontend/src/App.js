import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEmployee from "./pages/CreateEmployee";
import Profile from "./pages/Profile";
import MyAttendance from "./pages/MyAttendance";
import AdminAttendance from "./pages/AdminAttendance";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import AdminLeaves from "./pages/AdminLeaves";
import SalaryInfo from "./pages/SalaryInfo";
import AdminSalaryInfo from "./pages/AdminSalaryInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-employee"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/attendance"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <MyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/leave/apply"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <ApplyLeave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/leaves"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <MyLeaves />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leaves"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLeaves />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/salary"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <SalaryInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/salary/:userId"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminSalaryInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile/:userId"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employee/:userId"
          element={
            <ProtectedRoute role="ADMIN">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
