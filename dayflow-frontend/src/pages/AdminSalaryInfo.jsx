import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function AdminSalaryInfo() {
  const { userId } = useParams();
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    basicSalary: 0,
    specialAllowance: 0,
    professionalTax: 200,
  });

  useEffect(() => {
    if (userId) {
      loadSalary();
    }
  }, [userId]);

  const loadSalary = async () => {
    try {
      const res = await api.get(`/salary/employee/${userId}`);
      setSalary(res.data);
      setForm({
        basicSalary: res.data.basicSalary || 0,
        specialAllowance: res.data.specialAllowance || 0,
        professionalTax: res.data.professionalTax || 200,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await api.put(`/salary/employee/${userId}`, form);
      await loadSalary();
      setEditing(false);
      alert("Salary updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update salary");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!salary) return <div>Salary information not available</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Salary Information</h2>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            style={{
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
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
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
                loadSalary();
              }}
              style={{
                padding: "10px 20px",
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
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {editing ? (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Basic Salary
              </label>
              <input
                type="number"
                value={form.basicSalary}
                onChange={(e) =>
                  setForm({ ...form, basicSalary: parseFloat(e.target.value) || 0 })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Special Allowance
              </label>
              <input
                type="number"
                value={form.specialAllowance}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialAllowance: parseFloat(e.target.value) || 0,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Professional Tax
              </label>
              <input
                type="number"
                value={form.professionalTax}
                onChange={(e) =>
                  setForm({
                    ...form,
                    professionalTax: parseFloat(e.target.value) || 200,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <h3 style={{ marginTop: 0, color: "#007bff" }}>Salary Structure</h3>

            <div style={{ marginTop: "20px" }}>
              <h4>Earnings</h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px",
                }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px", fontWeight: "bold" }}>
                      Basic Salary
                    </td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ₹{salary.basicSalary?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>HRA (40% of Basic)</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ₹{salary.hra?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>DA (20% of Basic)</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ₹{salary.da?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>Special Allowance</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ₹{salary.specialAllowance?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "2px solid #333",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <td style={{ padding: "10px", fontWeight: "bold" }}>
                      Gross Salary
                    </td>
                    <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>
                      ₹{salary.grossSalary?.toLocaleString() || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h4>Deductions</h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px",
                }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>PF (12% of Basic)</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ₹{salary.pf?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>ESI (0.75% of Gross)</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ₹{salary.esi?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>Professional Tax</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ₹{salary.professionalTax?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "2px solid #333",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <td style={{ padding: "10px", fontWeight: "bold" }}>
                      Total Deductions
                    </td>
                    <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>
                      ₹{(
                        (salary.pf || 0) +
                        (salary.esi || 0) +
                        (salary.professionalTax || 0)
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "30px" }}>
              <div
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0 }}>Net Salary</h3>
                <h2 style={{ margin: 0 }}>
                  ₹{salary.netSalary?.toLocaleString() || 0}
                </h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

