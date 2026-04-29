import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

function Inventory() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const [formData, setFormData] = useState({
    item_name: "",
    quantity: "",
    threshold: ""
  });

  const [editId, setEditId] = useState(null);
  

 useEffect(() => {
  fetchInventory();
}, [page]);

  const fetchInventory = async () => {
    try {
      const res = await API.get(`inventory/?page=${page}`);

      // ✅ pagination control
    setNext(res.data.next);
    setPrev(res.data.previous);

    const inventoryData = res.data.results || res.data;
    setData(Array.isArray(inventoryData) ? inventoryData : []);

  } catch (err) {
    console.log("GET ERROR ❌", err.response?.data);
    setData([]);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(
          `inventory/${editId}/`,
          formData
        );
      } else {
        await API.post(
          "inventory/",
          formData
        );
      }

      setFormData({ item_name: "", quantity: "", threshold: "" });
      setEditId(null);
      fetchInventory();

    } catch (err) {
      console.log("ERROR ❌", err.response?.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`inventory/${id}/`);
      fetchInventory();
    } catch (err) {
      console.log("DELETE ERROR ❌", err.response?.data);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      item_name: item.item_name,
      quantity: item.quantity,
      threshold: item.threshold
    });
    setEditId(item.id);
  };

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Inventory</h2>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap">

        <input
          placeholder="Item Name"
          value={formData.item_name}
          onChange={(e) =>
            setFormData({ ...formData, item_name: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Total Quantity"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Threshold"
          value={formData.threshold}
          onChange={(e) =>
            setFormData({ ...formData, threshold: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      {/* TABLE */}
      <table className="w-full bg-white rounded-xl shadow">

        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">Item</th>
            <th className="p-3">Total</th>
            <th className="p-3">Used</th>
            <th className="p-3">Available</th>
            <th className="p-3">Threshold</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">

                <td className="p-3">{item.item_name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.used}</td>
                <td className="p-3">{item.available}</td>
                <td className="p-3">{item.threshold}</td>

               <td className="p-3">
  {item.available === 0 ? (
    <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">
      🔴 Out of Stock
    </span>
  ) : item.available <= item.threshold ? (
    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
      🟡 Low Stock
    </span>
  ) : (
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      🟢 In Stock
    </span>
  )}
</td>

                <td className="p-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No inventory data ❌
              </td>
            </tr>
          )}
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

        <span className="font-semibold">Page {page}</span>

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

    </MainLayout>
  );
}

export default Inventory;