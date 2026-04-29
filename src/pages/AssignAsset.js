import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

function AssignAsset() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [asset, setAsset] = useState("");
  const [employee, setEmployee] = useState("");

  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [aRes, uRes] = await Promise.all([
        API.get("assets/?available=true"),
        API.get("users/?all=true")
      ]);

      // ✅ FIX HERE
      setAssets(aRes.data.results || aRes.data);
      setUsers(uRes.data.results || uRes.data);

    } catch (err) {
      console.log("FETCH ERROR", err.response?.data || err.message);
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (!asset || !employee) {
      setError("Select asset & employee ❌");
      return;
    }

    try {
      const payload = {
        asset: Number(asset),
        employee: Number(employee),
        status: "active"
      };

      await API.post("assignments/", payload);

      alert("Assigned Successfully ✅");
      navigate("/assignment");

    } catch (err) {
      const errorData = err.response?.data;

      // ✅ HANDLE BACKEND ERROR
      if (errorData?.non_field_errors?.length > 0) {
        setError(errorData.non_field_errors[0]);
      } else {
        setError("Something went wrong ❌");
      }
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-md mx-auto">

        <h2 className="text-xl font-bold mb-4">Assign Asset</h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        {/* Asset */}
        <select
          className="border p-2 w-full mb-3"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
        >
          <option value="">Select Asset</option>

          {Array.isArray(assets) &&
            assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
        </select>

        {/* Employee */}
        <select
          className="border p-2 w-full mb-3"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>

          {Array.isArray(users) &&
            users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full p-2"
        >
          Assign
        </button>

      </div>
    </MainLayout>
  );
}

export default AssignAsset;