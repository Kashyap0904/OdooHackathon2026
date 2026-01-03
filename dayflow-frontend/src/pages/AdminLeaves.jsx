import { useEffect, useState } from "react";
import api from "../api";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/leaves/all").then((res) => setLeaves(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/leaves/${id}`, { status });
    window.location.reload();
  };

  return (
    <div>
      <h2>Leave Requests</h2>

      <table border="1">
        <tr>
          <th>Employee</th>
          <th>Type</th>
          <th>Dates</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

        {leaves.map((l) => (
          <tr key={l._id}>
            <td>{l.userId.name}</td>
            <td>{l.type}</td>
            <td>
              {l.fromDate} → {l.toDate}
            </td>
            <td>{l.status}</td>
            <td>
              <button onClick={() => updateStatus(l._id, "APPROVED")}>
                Approve
              </button>
              <button onClick={() => updateStatus(l._id, "REJECTED")}>
                Reject
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
