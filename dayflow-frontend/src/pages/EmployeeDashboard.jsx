import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    loadUser();
    loadEmployees();
    loadTodayAttendance();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await api.get("/admin/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadTodayAttendance = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await api.get("/attendance/my");
      const todayRecord = res.data.find((a) => a.date === today);
      setTodayAttendance(todayRecord);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckIn = async () => {
    try {
      await api.post("/attendance/checkin");
      await loadTodayAttendance();
      await loadUser();
      alert("Checked in successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await api.post("/attendance/checkout");
      await loadTodayAttendance();
      alert("Checked out successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Check-out failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PRESENT":
        return "#28a745";
      case "ABSENT":
        return "#dc3545";
      case "ON_LEAVE":
        return "#ffc107";
      case "SPECIAL_LEAVE":
        return "#6c757d";
      default:
        return "#dc3545";
    }
  };

  const getStatusDot = (employee) => {
    const color = getStatusColor(employee.currentStatus || "ABSENT");
    return (
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          marginRight: "8px",
        }}
      />
    );
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#fff",
          padding: "15px 30px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <h2 style={{ margin: 0, color: "#007bff" }}>Dayflow HRMS</h2>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link to="/employee" style={{ textDecoration: "none", color: "#333" }}>
              Home
            </Link>
            <Link
              to="/employee/attendance"
              style={{ textDecoration: "none", color: "#333" }}
            >
              Attendance
            </Link>
            <Link
              to="/employee/leave/apply"
              style={{ textDecoration: "none", color: "#333" }}
            >
              Time Off
            </Link>
            <Link
              to="/employee/leaves"
              style={{ textDecoration: "none", color: "#333" }}
            >
              My Leaves
            </Link>
          </nav>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </div>
            {getStatusDot(user || {})}
          </div>
          {showProfileMenu && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "0",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderRadius: "4px",
                minWidth: "150px",
                zIndex: 1000,
              }}
            >
              <Link
                to="/employee/profile"
                style={{
                  display: "block",
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: "#333",
                }}
                onClick={() => setShowProfileMenu(false)}
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  border: "none",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      <div style={{ padding: "30px" }}>
        {/* Check-in/Check-out Section */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Attendance</h3>
          <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
            <button
              onClick={handleCheckIn}
              disabled={todayAttendance?.checkIn}
              style={{
                padding: "10px 20px",
                backgroundColor: todayAttendance?.checkIn ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: todayAttendance?.checkIn ? "not-allowed" : "pointer",
              }}
            >
              Check In
            </button>
            <button
              onClick={handleCheckOut}
              disabled={!todayAttendance?.checkIn || todayAttendance?.checkOut}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  !todayAttendance?.checkIn || todayAttendance?.checkOut
                    ? "#ccc"
                    : "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor:
                  !todayAttendance?.checkIn || todayAttendance?.checkOut
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Check Out
            </button>
          </div>
          {todayAttendance && (
            <div style={{ marginTop: "15px", color: "#666" }}>
              <p>
                Check In: {todayAttendance.checkIn || "Not checked in"}
              </p>
              <p>
                Check Out: {todayAttendance.checkOut || "Not checked out"}
              </p>
            </div>
          )}
        </div>

        {/* Employee Cards Grid */}
        <div>
          <h3 style={{ marginBottom: "20px" }}>Employees</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {employees.map((emp) => (
              <div
                key={emp._id}
                onClick={() => navigate(`/employee/profile/${emp._id}`)}
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {emp.name?.charAt(0) || "E"}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                  {getStatusDot(emp)}
                  <strong>{emp.name || "Employee"}</strong>
                </div>
                <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                  {emp.employeeId}
                </p>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
