import { useEffect, useState } from "react";
import api from "../api";

export default function MyAttendance() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const loadData = () => {
    api.get("/attendance/my").then((res) => setData(res.data));
  };

  const checkIn = async () => {
    await api.post("/attendance/checkin", {});
    loadData();
  };

  const checkOut = async () => {
    await api.post("/attendance/checkout", {});
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h2>My Attendance</h2>

      <button onClick={checkIn}>Check In</button>
      <button onClick={checkOut}>Check Out</button>

      <table border="1">
        <tr>
          <th>Date</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Status</th>
        </tr>

        {data.map((a, i) => (
          <tr key={i}>
            <td>{a.date}</td>
            <td>{a.checkIn}</td>
            <td>{a.checkOut || "-"}</td>
            <td>{a.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
