import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "EMPLOYEE",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const { confirmPassword, ...signupData } = form;
      const res = await api.post("/auth/signup", signupData);

      if (res.data.employeeId) {
        alert(
          `Sign up successful! Your Employee ID is: ${res.data.employeeId}\nYour password is: ${res.data.password}`
        );
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="HR_OFFICER">HR Officer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account?{" "}
        <a href="/" style={{ color: "#007bff" }}>
          Sign In
        </a>
      </p>
    </div>
  );
}

