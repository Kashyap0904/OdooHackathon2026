import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/me", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setUser(res.data));
  }, []);

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Employee ID: {user.employeeId}</p>
    </div>
  );
}
