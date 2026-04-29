import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api";   // ✅ FIX
import { useSelector } from "react-redux";

function EmployeeDashboard() {
  const { user } = useSelector((state) => state.user);

  const [assets, setAssets] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetchMyAssets();
    fetchMyTickets();
  }, [user]);

  const fetchMyAssets = async () => {
    try {
      const res = await API.get(`assignments/?employee=${user.id}`); // ✅ FIX

      const data = res.data.results || res.data;
      setAssets(Array.isArray(data) ? data : []);

    } catch (err) {
      console.log("ASSET ERROR ❌", err.response?.data);
      setAssets([]);
    }
  };

  const fetchMyTickets = async () => {
    try {
      const res = await API.get(`tickets/?employee=${user.id}`); // ✅ FIX

      const data = res.data.results || res.data;
      setTickets(Array.isArray(data) ? data : []);

    } catch (err) {
      console.log("TICKET ERROR ❌", err.response?.data);
      setTickets([]);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">

        <h2 className="text-xl font-bold mb-6">Employee Dashboard</h2>

        {/* PROFILE */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h3 className="font-semibold mb-2">Profile</h3>
          <p>Name: {user?.username}</p>
          <p>Role: {user?.role}</p>
        </div>

        {/* MY ASSETS */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h3 className="font-semibold mb-2">My Assets</h3>

          {assets.length === 0 ? (
            <p>No assets assigned</p>
          ) : (
            assets.map((a) => (
              <p key={a.id}>
                - {a.asset_name} ({a.status})
              </p>
            ))
          )}
        </div>

        {/* MY TICKETS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-2">My Tickets</h3>

          {tickets.length === 0 ? (
            <p>No tickets</p>
          ) : (
            tickets.map((t) => (
              <p key={t.id}>
                {t.asset_name} - {t.issue} ({t.status})
              </p>
            ))
          )}
        </div>

      </div>
    </MainLayout>
  );
}

export default EmployeeDashboard;