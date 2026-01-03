import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e?.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN" || res.data.role === "HR_OFFICER") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Dayflow HRMS
      </h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
        Every workday, perfectly aligned.
      </p>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Sign In</h3>
      <form onSubmit={login}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
        <a href="/forgot-password" style={{ color: "#007bff" }}>
          Forgot Password?
        </a>
      </p>
      <p style={{ marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
        Don't have an account?{" "}
        <a href="/signup" style={{ color: "#007bff" }}>
          Sign Up
        </a>
      </p>
    </div>
  );
}
