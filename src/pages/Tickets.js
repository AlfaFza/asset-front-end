import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useSelector } from "react-redux";

function Tickets() {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [page, setPage] = useState(1);

useEffect(() => {
  if (user) {
    fetchTickets();
  }
}, [user, page]);


 const fetchTickets = async () => {
  try {
    let url = `tickets/?page=${page}`;

    // ✅ ROLE BASED
    if (user?.role === "admin") {
      url = `tickets/?&page=${page}`;
    } else {
      url = `tickets/?employee=${user.id}&page=${page}`;
    }

    const res = await API.get(url);

    // ✅ PAGINATION DATA
    setNext(res.data.next);
    setPrev(res.data.previous);

    const ticketData = res.data.results || res.data;
    setData(Array.isArray(ticketData) ? ticketData : []);

  } catch (err) {
    console.log(err.response?.data);
  }
};

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`tickets/${id}/`, { status });
      fetchTickets();
    } catch (err) {
      console.log(err.response?.data);
    }
  };
 
  const handleDelete = async (id) => {
  if (!window.confirm("Delete this ticket?")) return;

  try {
    await API.delete(`tickets/${id}/`);
    fetchTickets();
  } catch (err) {
    console.log("DELETE ERROR ❌", err.response?.data);
  }
};

  return (
    <MainLayout>
      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">Tickets</h2>

        <table className="w-full bg-white shadow rounded-xl overflow-hidden">

          <thead  className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Asset</th>
              <th className="p-3">Serial Number</th>
              <th className="p-3">Issue</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Status</th>
               {user?.role === "admin" && (
              <th className="p-3">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">

                <td className="p-2">{t.asset_name}</td>
                <td className="p-2">{t.serial_number}</td>
                <td className="p-2">{t.issue}</td>
                <td className="p-2">{t.employee_name}</td>

                 <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      t.status === "open"
                        ? "bg-red-100 text-red-600"
                        : t.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {t.status === "open" && "🔴 Open"}
                    {t.status === "in_progress" && "🟡 In Progress"}
                    {t.status === "resolved" && "🟢 Resolved"}
                  </span>
                </td>

               <td className="p-2 space-x-2">

                {/* ADMIN ACTIONS */}
                {user?.role === "admin" && (
                  <>
                    <button
                      disabled={t.status !== "open"}
                      onClick={() => updateStatus(t.id, "in_progress")}
                      className={`px-3 py-1 rounded text-sm ${
                        t.status === "open"
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Start
                    </button>

                    <button
                      disabled={t.status === "resolved"}
                      onClick={() => updateStatus(t.id, "resolved")}
                      className={`px-3 py-1 rounded text-sm ${
                        t.status !== "resolved"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Resolve
                    </button>

                    {/* ✅ DELETE ONLY IF RESOLVED */}
                    {t.status === "resolved" && (
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </>
                )}

              </td>
                 
              </tr>
            ))}
          </tbody>

        </table>
          {/* 🔄 PAGINATION */}
      <div className="flex gap-4 mt-4 items-center">

        <button
          disabled={!prev}
          onClick={() => setPage((p) => p - 1)}
          className={`px-3 py-1 rounded ${
            prev ? "bg-gray-300" : "bg-gray-100 text-gray-400"
          }`}
        >
          Prev
        </button>

        <span className="font-semibold">Page {page}</span>

        <button
          disabled={!next}
          onClick={() => setPage((p) => p + 1)}
          className={`px-3 py-1 rounded ${
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

export default Tickets;