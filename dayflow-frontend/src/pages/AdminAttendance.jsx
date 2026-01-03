import { useEffect, useState } from "react";
import api from "../api";

export default function AdminAttendance() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/attendance/all").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>All Attendance</h2>

      <table border="1">
        <tr>
          <th>Employee</th>
          <th>Date</th>
          <th>Status</th>
        </tr>

        {data.map((a, i) => (
          <tr key={i}>
            <td>{a.userId.name}</td>
            <td>{a.date}</td>
            <td>{a.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
