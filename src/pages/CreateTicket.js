import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api"; // ✅ USE API (not axios)
import { useSelector } from "react-redux";

function CreateTicket() {
  const { user } = useSelector((state) => state.user);
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    asset: "",
    issue: ""
  });
  

  useEffect(() => {
  if (user) {
    fetchAssets();
  }
}, [user]);

 const fetchAssets = async () => {
  try {
    const res = await API.get(`assignments/?all=true&employee=${user.id}`);

    const assignData = res.data.results || res.data;

    // ✅ extract only asset info
    const myAssets = Array.isArray(assignData)
      ? assignData.map((a) => ({
          id: a.asset,              // asset id
          name: a.asset_name,
          serial_number :a.serial_number,      // asset name from serializer
        }))
      : [];

    setAssets(myAssets);

  } catch (err) {
    console.log("ERROR ❌", err.response?.data);
    setAssets([]);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.asset || !formData.issue) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      await API.post("tickets/", {   // ✅ FIX
        asset: Number(formData.asset),
        issue: formData.issue,
        employee:user.id,
        status: "open",
        
      });

      alert("Ticket Created ✅");

      setFormData({
        asset: "",
        issue: ""
      });

    } catch (err) {
      console.log("ERROR ❌", err.response?.data);

      const msg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to create ticket ❌";

      alert(msg);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-lg">

        <h2 className="text-xl font-bold mb-4">Create Ticket</h2>

        <form onSubmit={handleSubmit}>

          {/* ASSET DROPDOWN */}
         <select
            value={formData.asset}
            onChange={(e) =>
              setFormData({ ...formData, asset: e.target.value })
            }
            className="border p-2 w-full mb-3 rounded"
          >
            <option value="">Select Asset</option>

            {assets.length > 0 ? (
              assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} - {a.serial_number}
                </option>
              ))
            ) : (
              <option disabled>No assigned assets</option>
            )}
          </select>

          {/* ISSUE */}
          <textarea
            value={formData.issue}
            onChange={(e) =>
              setFormData({ ...formData, issue: e.target.value })
            }
            placeholder="Describe the issue..."
            className="border p-2 w-full mb-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>

        </form>

      </div>
    </MainLayout>
  );
}

export default CreateTicket;