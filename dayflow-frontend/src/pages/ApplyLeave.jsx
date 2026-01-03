import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "PAID_TIME_OFF",
    fromDate: "",
    toDate: "",
    reason: "",
    attachment: "",
  });
  const [totalDays, setTotalDays] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (form.fromDate && form.toDate) {
      const start = new Date(form.fromDate);
      const end = new Date(form.toDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(days);
      } else {
        setTotalDays(1);
      }
    } else {
      setTotalDays(1);
    }
  }, [form.fromDate, form.toDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this to a server and get a URL
      // For now, we'll just store the filename
      setForm({ ...form, attachment: file.name });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fromDate || !form.toDate) {
      setError("Please select both start and end dates");
      return;
    }

    if (!form.reason) {
      setError("Please provide a reason");
      return;
    }

    try {
      await api.post("/leaves/apply", {
        ...form,
        totalDays,
      });
      alert("Leave applied successfully!");
      navigate("/employee/leaves");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply leave");
    }
  };

  const handleCancel = () => {
    navigate("/employee/leaves");
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "50px auto",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Time Off Request</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Time Off Type *
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          >
            <option value="PAID_TIME_OFF">Paid Time Off</option>
            <option value="SICK">Sick Leave</option>
            <option value="UNPAID">Unpaid Leaves</option>
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Start Date *
            </label>
            <input
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              End Date *
            </label>
            <input
              type="date"
              name="toDate"
              value={form.toDate}
              onChange={handleChange}
              required
              min={form.fromDate}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Total Days
          </label>
          <input
            type="number"
            value={totalDays}
            disabled
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Reason *
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Please provide a reason for your leave request"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Attachment (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
          {form.attachment && (
            <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>
              Selected: {form.attachment}
            </p>
          )}
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "20px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={handleCancel}
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
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
