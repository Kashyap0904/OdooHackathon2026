import { useEffect, useState } from "react";
import api from "../api";

export default function SalaryInfo() {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSalary();
  }, []);

  const loadSalary = async () => {
    try {
      const res = await api.get("/salary/my");
      setSalary(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!salary) return <div>Salary information not available</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Salary Information</h2>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
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

        <div style={{ marginTop: "30px" }}>
          <h4>Leave Balances</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                Paid Time Off
              </p>
              <p style={{ margin: "5px 0 0", fontSize: "24px", fontWeight: "bold" }}>
                {salary.paidTimeOffBalance || 0} days
              </p>
            </div>
            <div
              style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                Sick Leave
              </p>
              <p style={{ margin: "5px 0 0", fontSize: "24px", fontWeight: "bold" }}>
                {salary.sickLeaveBalance || 0} days
              </p>
            </div>
            <div
              style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                Unpaid Leaves
              </p>
              <p style={{ margin: "5px 0 0", fontSize: "24px", fontWeight: "bold" }}>
                {salary.unpaidLeavesBalance || 0} days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

