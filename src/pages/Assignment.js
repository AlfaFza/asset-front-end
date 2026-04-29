import { useEffect, useState } from "react";
import API from "../services/api";   // ✅ USE THIS
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

function Assignment() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
  fetchAssignments();
}, [page]);

const fetchAssignments = async () => {
  try {
    const res = await API.get(`assignments/?&page=${page}`);

    // ✅ pagination links
    setNext(res.data.next);
    setPrev(res.data.previous);

    const assignmentData = res.data.results || res.data;
    setData(Array.isArray(assignmentData) ? assignmentData : []);

  } catch (err) {
    console.log("ERROR ❌", err.response?.data || err.message);
    setData([]);
  }
};

  const handleDelete = async (id) => {
    try {
      await API.delete(`assignments/${id}/`); // ✅ FIX
      fetchAssignments();
    } catch (err) {
      console.log("DELETE ERROR ❌", err.response?.data);
    }
  };

  const handleEdit = (assignment) => {
    navigate("/assign", { state: assignment });
  };

  const handleReturn = async (a) => {
    try {
      await API.patch(`assignments/${a.id}/`, {   // ✅ FIX
        status: "returned",
        date_returned: new Date().toISOString().split("T")[0],
      });

      fetchAssignments();
    } catch (err) {
      console.log("RETURN ERROR ❌", err.response?.data);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Assignment</h2>

          <button
            onClick={() => navigate("/assign")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Assign Asset
          </button>
        </div>

        <table className="w-full bg-white shadow rounded">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Asset</th>
              <th className="p-2">Employee</th>
              <th className="p-2">Assigned Date</th>
              <th className="p-2">Return Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((a) => (
                <tr key={a.id} className="border-t">

                  <td className="p-2">{a.asset_name}</td>
                  <td className="p-2">{a.employee_name}</td>
                  <td className="p-2">{a.date_assigned}</td>
                  <td className="p-2">{a.date_returned || "-"}</td>

                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        a.status === "active"
                          ? "bg-green-200"
                          : "bg-gray-300"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>

                    {a.status === "active" && (
                      <button
                        onClick={() => handleReturn(a)}
                        className="text-green-600"
                      >
                        Return
                      </button>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No assignments ❌
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

      </div>
    </MainLayout>
  );
}

export default Assignment;