import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";
import { useCallback } from "react";

function Assets() {

  const [data, setData] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  
  

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serial_number: "",
    purchase_date: "",
    status: "available",
    inventory_item: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchAssets();
    }, 300); // debounce

    return () => clearTimeout(delay);
  } );


   const fetchAssets = useCallback(async () => {
  try {
    const res = await API.get(
      `assets/?search=${search}&status=${status}&page=${page}`
    );

    setData(res.data.results);
    setNext(res.data.next);
    setPrev(res.data.previous);

  } catch (err) {
    console.log("ERROR ❌", err.response?.data);
  }
}, [search, status, page]);

useEffect(() => {
  fetchAssets();
}, [fetchAssets]);

// 🔥 FETCH INVENTORY (ON LOAD)
  useEffect(() => {
    fetchInventory();
  }, []);
  
 const fetchInventory = async () => {
  try {
    const res = await API.get("inventory/");
    console.log("INVENTORY 👉", res.data);

    setInventoryList(res.data.results || res.data);

  } catch (err) {
    console.log("INV ERROR ❌", err.response?.data);
  }
};

  // ✅ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(
          `assets/${editId}/`,
          formData
        );
      } else {
        await API.post(
          "assets/",
          formData
        );
      }

    
      setEditId(null);
      setFormData({
        name: "",
        type: "",
        serial_number: "",
        purchase_date: "",
        status: "available",
        inventory_item: ""
      });
      fetchAssets();

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete asset?")) return;

    try {
      await API.delete(`assets/${id}/`);
      fetchAssets();
    } catch (err) {
      console.log("DELETE ERROR ❌", err.response?.data);
    }
  };

  // ✅ EDIT
  const handleEdit = (a) => {
    setFormData({
      name: a.name,
      type: a.type,
      serial_number: a.serial_number,
      purchase_date: a.purchase_date,
      status: a.status,
      inventory_item: a.inventory_item
    });
    setEditId(a.id);
  };
 

  return (
    <MainLayout>
     <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assets</h2>
        {/* 🔍 SEARCH + FILTER */}
        <div className="flex gap-3 mb-4">

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2"
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="assigned">Assigned</option>
            <option value="repair">Repair</option>
          </select>

        </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 flex-wrap">

        <input placeholder="Name"
          value={formData.name}
          onChange={(e)=>setFormData({...formData,name:e.target.value})}
        />

        <input placeholder="Type"
          value={formData.type}
          onChange={(e)=>setFormData({...formData,type:e.target.value})}
        />

        <input placeholder="Serial Number"
          value={formData.serial_number}
          onChange={(e)=>setFormData({...formData,serial_number:e.target.value})}
        />

        <input type="date"
          value={formData.purchase_date}
          onChange={(e)=>setFormData({...formData,purchase_date:e.target.value})}
        />

        {/* 🔥 Inventory dropdown */}
        <select
          value={formData.inventory_item}
          onChange={(e)=>setFormData({...formData,inventory_item:e.target.value})}
        >
          <option value="">Select Inventory</option>
          {Array.isArray(inventoryList) &&
          inventoryList.map((i)=>(
            <option key={i.id} value={i.id}>
              {i.item_name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      {/* TABLE */}
      <table className="w-full bg-white shadow">

        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Serial</th>
            <th>Inventory</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a)=>(
            <tr key={a.id} className="border-t">

              <td>{a.name}</td>
              <td>{a.type}</td>
              <td>{a.serial_number}</td>
              <td>{a.inventory_name}</td>
              <td>{a.status}</td>
              <td>{a.assigned_to || "—"}</td>

              <td>
                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={()=>handleEdit(a)}>Edit</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={()=>handleDelete(a.id)}>Delete</button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
         {/* 🔄 PAGINATION */}
        <div className="flex gap-4 mt-4">

          <button
            disabled={!prev}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 px-3 py-1"
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            disabled={!next}
            onClick={() => setPage(page + 1)}
            className="bg-gray-300 px-3 py-1"
          >
            Next
          </button>

        </div>
         </div>

    </MainLayout>
  );
}

export default Assets;