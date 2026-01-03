import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    basicSalary: "",
    specialAllowance: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        emergencyContact: {
          ...form.emergencyContact,
          [field]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.firstName) {
      setError("First Name and Email are required");
      return;
    }

    try {
      const res = await api.post("/admin/create-employee", {
        ...form,
        basicSalary: form.basicSalary ? parseFloat(form.basicSalary) : undefined,
        specialAllowance: form.specialAllowance
          ? parseFloat(form.specialAllowance)
          : undefined,
      });

      setResult(res.data);
      alert(
        `Employee created successfully!\nEmployee ID: ${res.data.employeeId}\nPassword: ${res.data.password}`
      );
      // Reset form
      setForm({
        companyName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        emergencyContact: {
          name: "",
          relationship: "",
          phone: "",
        },
        basicSalary: "",
        specialAllowance: "",
      });
      setResult(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create employee");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Create New Employee</h2>
      <form onSubmit={submit}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Personal Information</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Company Name *
              </label>
              <input
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
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
                First Name *
              </label>
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
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
                Last Name
              </label>
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
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
                Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
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
                Phone
              </label>
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
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
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
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
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
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
                name="maritalStatus"
                value={form.maritalStatus}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Select Status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Widowed</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Address
              </label>
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                rows={3}
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

          <h3 style={{ marginTop: "30px" }}>Emergency Contact</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Name
              </label>
              <input
                name="emergencyContact.name"
                placeholder="Name"
                value={form.emergencyContact.name}
                onChange={handleChange}
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
                Relationship
              </label>
              <input
                name="emergencyContact.relationship"
                placeholder="Relationship"
                value={form.emergencyContact.relationship}
                onChange={handleChange}
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
                Phone
              </label>
              <input
                name="emergencyContact.phone"
                placeholder="Phone"
                value={form.emergencyContact.phone}
                onChange={handleChange}
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

          <h3 style={{ marginTop: "30px" }}>Salary Information</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                placeholder="Basic Salary"
                value={form.basicSalary}
                onChange={handleChange}
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
                Special Allowance
              </label>
              <input
                type="number"
                name="specialAllowance"
                placeholder="Special Allowance"
                value={form.specialAllowance}
                onChange={handleChange}
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

          {error && (
            <div style={{ color: "red", marginTop: "20px" }}>{error}</div>
          )}

          <button
            type="submit"
            style={{
              marginTop: "30px",
              padding: "12px 30px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Create Employee
          </button>
        </div>
      </form>
    </div>
  );
}
