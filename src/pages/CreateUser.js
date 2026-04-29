import { useState } from "react";
import API from "../services/api";
import MainLayout from "../layout/MainLayout";

function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "employee"
  });

  const handleSubmit = async () => {
    try {
      await API.post("users/", form);
      alert("User Created ✅");

      setForm({
        username: "",
        password: "",
        role: "employee"
      });

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-md">

        <h2 className="text-xl font-bold mb-4">Create User</h2>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="border p-2 w-full mb-3"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          className="border p-2 w-full mb-3"
        >
          <option value="employee">Employee</option>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full p-2"
        >
          Create
        </button>

      </div>
    </MainLayout>
  );
}

export default CreateUser;