import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingLeaves: 0,
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    loadUser();
    loadEmployees();
    loadStats();
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

  const loadStats = async () => {
    try {
      const [employeesRes, attendanceRes, leavesRes] = await Promise.all([
        api.get("/admin/employees"),
        api.get("/attendance/all"),
        api.get("/leaves/all"),
      ]);

      const today = new Date().toISOString().slice(0, 10);
      const todayAttendance = attendanceRes.data.filter(
        (a) => a.date === today && a.status === "PRESENT"
      );

      const pendingLeaves = leavesRes.data.filter(
        (l) => l.status === "PENDING"
      );

      setStats({
        totalEmployees: employeesRes.data.length,
        presentToday: todayAttendance.length,
        onLeave: leavesRes.data.filter(
          (l) => l.status === "APPROVED" && l.toDate >= today
        ).length,
        pendingLeaves: pendingLeaves.length,
      });
    } catch (err) {
      console.error(err);
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
            <Link to="/admin" style={{ textDecoration: "none", color: "#333" }}>
              Home
            </Link>
            <Link
              to="/admin/attendance"
              style={{ textDecoration: "none", color: "#333" }}
            >
              Attendance
            </Link>
            <Link
              to="/admin/leaves"
              style={{ textDecoration: "none", color: "#333" }}
            >
              Time Off
            </Link>
            <Link
              to="/admin/create-employee"
              style={{ textDecoration: "none", color: "#333" }}
            >
              Employees
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
              {user?.name?.charAt(0) || "A"}
            </div>
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
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Total Employees
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "32px", fontWeight: "bold", color: "#007bff" }}>
              {stats.totalEmployees}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Present Today
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "32px", fontWeight: "bold", color: "#28a745" }}>
              {stats.presentToday}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              On Leave
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "32px", fontWeight: "bold", color: "#ffc107" }}>
              {stats.onLeave}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Pending Leaves
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "32px", fontWeight: "bold", color: "#dc3545" }}>
              {stats.pendingLeaves}
            </p>
          </div>
        </div>

        {/* Employee List */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0 }}>All Employees</h3>
            <Link to="/admin/create-employee">
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                + Create Employee
              </button>
            </Link>
          </div>
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
                onClick={() => navigate(`/admin/employee/${emp._id}`)}
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {emp.name?.charAt(0) || "E"}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                  {getStatusDot(emp)}
                  <strong>{emp.name || "Employee"}</strong>
                </div>
                <p style={{ margin: "5px 0", color: "#666", fontSize: "12px" }}>
                  {emp.employeeId}
                </p>
                <p style={{ margin: "5px 0", color: "#666", fontSize: "12px" }}>
                  {emp.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
