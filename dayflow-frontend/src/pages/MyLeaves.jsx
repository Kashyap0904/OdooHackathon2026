import { useEffect, useState } from "react";
import api from "../api";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/leaves/my").then((res) => setLeaves(res.data));
  }, []);

  return (
    <div>
      <h2>My Leaves</h2>

      <table border="1">
        <tr>
          <th>Type</th>
          <th>From</th>
          <th>To</th>
          <th>Status</th>
        </tr>

        {leaves.map((l) => (
          <tr key={l._id}>
            <td>{l.type}</td>
            <td>{l.fromDate}</td>
            <td>{l.toDate}</td>
            <td>{l.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
