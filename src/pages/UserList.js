import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layout/MainLayout";

function UserList() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [count, setCount] = useState(0);

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "employee"
  });

useEffect(() => {
  
  fetchUsers();
}, [page]);

 const fetchUsers = async () => {
  try {
    const res = await API.get(`users/?all=true&page=${page}`);

    // ✅ pagination info
    setNext(res.data.next);
    setPrev(res.data.previous);
    setCount(res.data.count || 0);

    const users = res.data.results || res.data;
    setData(Array.isArray(users) ? users : []);

  } catch (err) {
    console.log(err.response?.data);
    setData([]);
  }
};

  // ✅ ADD / UPDATE
  const handleSubmit = async () => {
    try {
      if (editId) {
        await API.patch(`users/${editId}/`, form);
        setEditId(null);
      } else {
        await API.post("users/", {
          ...form,
          password: "1234" // default for now
        });
      }

      setForm({ username: "", email: "", role: "employee" });
      fetchUsers();

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    await API.delete(`users/${id}/`);
    fetchUsers();
  };

  // ✅ EDIT
  const handleEdit = (u) => {
    setForm({
      username: u.username,
      email: u.email,
      role: u.role
    });
    setEditId(u.id);
  };
  // setPage(1);
  // fetchUsers();

  return (
    <MainLayout>
      <div className="p-6">

        <h2 className="text-xl font-bold mb-4">Users</h2>

        {/* FORM */}
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="border p-2"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="border p-2"
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            className="border p-2"
          >
            <option value="employee">Employee</option>
            <option value="technician">Technician</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(data) &&
              data.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.username}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>

                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="text-blue-600 mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* 🔄 PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={!prev}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-1 rounded ${
              prev ? "bg-gray-300" : "bg-gray-100 text-gray-400"
            }`}
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} {count ? `/ ${Math.ceil(count / 5)}` : ""}
          </span>

          <button
            disabled={!next}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-1 rounded ${
              next ? "bg-gray-300" : "bg-gray-100 text-gray-400"
            }`}
          >
            Next
          </button>

        </div>

      </div>
    </MainLayout>
  );
}

export default UserList;