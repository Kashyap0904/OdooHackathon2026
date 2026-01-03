import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [salary, setSalary] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  const isAdmin = localStorage.getItem("role") === "ADMIN" || localStorage.getItem("role") === "HR_OFFICER";
  const targetUserId = userId || "me";

  useEffect(() => {
    loadUser();
    if (activeTab === "attendance") {
      loadAttendance();
    } else if (activeTab === "salary") {
      loadSalary();
    }
  }, [activeTab, targetUserId]);

  const loadUser = async () => {
    try {
      const endpoint = userId && isAdmin
        ? `/admin/employee/${userId}`
        : "/user/me";
      const res = await api.get(endpoint);
      setUser(res.data);
      setForm({
        firstName: res.data.firstName || res.data.name?.split(" ")[0] || "",
        lastName: res.data.lastName || res.data.name?.split(" ").slice(1).join(" ") || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
        dateOfBirth: res.data.dateOfBirth || "",
        gender: res.data.gender || "",
        maritalStatus: res.data.maritalStatus || "",
        emergencyContact: res.data.emergencyContact || {
          name: "",
          relationship: "",
          phone: "",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const loadAttendance = async () => {
    try {
      if (userId && isAdmin) {
        const res = await api.get(`/attendance/all`);
        setAttendance(res.data.filter((a) => a.userId._id === userId));
      } else {
        const res = await api.get("/attendance/my");
        setAttendance(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadSalary = async () => {
    try {
      if (userId && isAdmin) {
        const res = await api.get(`/salary/employee/${userId}`);
        setSalary(res.data);
      } else {
        const res = await api.get("/salary/my");
        setSalary(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (userId && isAdmin) {
        await api.put(`/admin/employee/${userId}`, form);
      } else {
        await api.put("/user/me", form);
      }
      await loadUser();
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${dateString} ${days[date.getDay()]}`;
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Employee Profile</h2>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveTab("profile")}
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            borderBottom:
              activeTab === "profile" ? "2px solid #007bff" : "none",
            color: activeTab === "profile" ? "#007bff" : "#666",
            fontWeight: activeTab === "profile" ? "bold" : "normal",
          }}
        >
          My Profile
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            borderBottom:
              activeTab === "attendance" ? "2px solid #007bff" : "none",
            color: activeTab === "attendance" ? "#007bff" : "#666",
            fontWeight: activeTab === "attendance" ? "bold" : "normal",
          }}
        >
          Attendance Info
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveTab("salary")}
            style={{
              padding: "10px 20px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              borderBottom:
                activeTab === "salary" ? "2px solid #007bff" : "none",
              color: activeTab === "salary" ? "#007bff" : "#666",
              fontWeight: activeTab === "salary" ? "bold" : "normal",
            }}
          >
            Salary Info
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {activeTab === "profile" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: 0 }}>Personal Information</h3>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit Profile
                </button>
              ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={handleSave}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      loadUser();
                    }}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
              }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Employee ID
                </label>
                <input
                  value={user.employeeId || ""}
                  disabled
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Company Name
                </label>
                <input
                  value={user.companyName || ""}
                  disabled
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  First Name
                </label>
                <input
                  value={form.firstName || ""}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing ? "#fff" : "#f5f5f5",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Last Name
                </label>
                <input
                  value={form.lastName || ""}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing ? "#fff" : "#f5f5f5",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!editing || !isAdmin}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing && isAdmin ? "#fff" : "#f5f5f5",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Phone
                </label>
                <input
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing ? "#fff" : "#f5f5f5",
                  }}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Address
                </label>
                <textarea
                  value={form.address || ""}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  disabled={!editing}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing ? "#fff" : "#f5f5f5",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={form.dateOfBirth || ""}
                  onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                  disabled={!editing || !isAdmin}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing && isAdmin ? "#fff" : "#f5f5f5",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Gender
                </label>
                <select
                  value={form.gender || ""}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  disabled={!editing || !isAdmin}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing && isAdmin ? "#fff" : "#f5f5f5",
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Marital Status
                </label>
                <select
                  value={form.maritalStatus || ""}
                  onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
                  disabled={!editing || !isAdmin}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: editing && isAdmin ? "#fff" : "#f5f5f5",
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="SINGLE">Single</option>
                  <option value="MARRIED">Married</option>
                  <option value="DIVORCED">Divorced</option>
                  <option value="WIDOWED">Widowed</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h4>Emergency Contact</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  marginTop: "15px",
                }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Name
                  </label>
                  <input
                    value={form.emergencyContact?.name || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        emergencyContact: {
                          ...form.emergencyContact,
                          name: e.target.value,
                        },
                      })
                    }
                    disabled={!editing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: editing ? "#fff" : "#f5f5f5",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Relationship
                  </label>
                  <input
                    value={form.emergencyContact?.relationship || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        emergencyContact: {
                          ...form.emergencyContact,
                          relationship: e.target.value,
                        },
                      })
                    }
                    disabled={!editing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: editing ? "#fff" : "#f5f5f5",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Phone
                  </label>
                  <input
                    value={form.emergencyContact?.phone || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        emergencyContact: {
                          ...form.emergencyContact,
                          phone: e.target.value,
                        },
                      })
                    }
                    disabled={!editing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: editing ? "#fff" : "#f5f5f5",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div>
            <h3 style={{ marginTop: 0 }}>Attendance Information</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                    Date
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                    Day
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                    Check In
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                    Check Out
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  attendance.slice(0, 10).map((a, i) => {
                    const date = new Date(a.date);
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "12px" }}>{a.date}</td>
                        <td style={{ padding: "12px" }}>{days[date.getDay()]}</td>
                        <td style={{ padding: "12px" }}>{a.checkIn || "-"}</td>
                        <td style={{ padding: "12px" }}>{a.checkOut || "-"}</td>
                        <td style={{ padding: "12px" }}>
                          <span
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              backgroundColor:
                                a.status === "PRESENT"
                                  ? "#28a745"
                                  : a.status === "LEAVE"
                                  ? "#ffc107"
                                  : "#dc3545",
                              color: "white",
                              fontSize: "12px",
                            }}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            {attendance.length > 10 && (
              <button
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View All
              </button>
            )}
          </div>
        )}

        {activeTab === "salary" && isAdmin && salary && (
          <div>
            <h3 style={{ marginTop: 0 }}>Salary Information</h3>
            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Basic Salary:</strong> ₹{salary.basicSalary?.toLocaleString() || 0}
              </p>
              <p>
                <strong>HRA:</strong> ₹{salary.hra?.toLocaleString() || 0}
              </p>
              <p>
                <strong>DA:</strong> ₹{salary.da?.toLocaleString() || 0}
              </p>
              <p>
                <strong>Special Allowance:</strong> ₹{salary.specialAllowance?.toLocaleString() || 0}
              </p>
              <p>
                <strong>Gross Salary:</strong> ₹{salary.grossSalary?.toLocaleString() || 0}
              </p>
              <p>
                <strong>PF:</strong> ₹{salary.pf?.toLocaleString() || 0}
              </p>
              <p>
                <strong>ESI:</strong> ₹{salary.esi?.toLocaleString() || 0}
              </p>
              <p>
                <strong>Professional Tax:</strong> ₹{salary.professionalTax?.toLocaleString() || 0}
              </p>
              <p>
                <strong>Net Salary:</strong> ₹{salary.netSalary?.toLocaleString() || 0}
              </p>
            </div>
            <button
              onClick={() => navigate(`/admin/salary/${userId || "me"}`)}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit Salary Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
