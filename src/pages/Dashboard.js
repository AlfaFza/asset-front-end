import MainLayout from "../layout/MainLayout";
import Card from "../components/common/layout/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    totalAssets: 0,
    assigned: 0,
    available: 0,
    tickets: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

 const fetchDashboard = async () => {
  try {
    const [assetRes, assignRes, ticketRes] = await Promise.all([
      API.get("assets/"),
      API.get("assignments/"),
      API.get("tickets/")
    ]);

    // ✅ FIX PAGINATION
    const assets = assetRes.data.results || assetRes.data;
    const assignments = assignRes.data.results || assignRes.data;
    const tickets = ticketRes.data.results || ticketRes.data;

    // ✅ SAFE CALCULATIONS
    const totalAssets = assets.length;
    const assigned = assignments.filter(a => a.status === "active").length;
    const available = assets.filter(a => a.status === "available").length;
    const totalTickets = tickets.length;

    setStats({
      totalAssets,
      assigned,
      available,
      tickets: totalTickets
    });

    setChartData([
      { name: "Assets", value: totalAssets },
      { name: "Assigned", value: assigned },
      { name: "Tickets", value: totalTickets }
    ]);

  } catch (err) {
    console.log("DASHBOARD ERROR ❌", err.response?.data);
  }
};
  return (
    <MainLayout>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card title="Total Assets" value={stats.totalAssets} />
        <Card title="Assigned" value={stats.assigned} />
        <Card title="Available" value={stats.available} />
        <Card title="Tickets" value={stats.tickets} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="mb-4 font-semibold">Overview</h3>

        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>

      </div>

    </MainLayout>
  );
}

export default Dashboard;