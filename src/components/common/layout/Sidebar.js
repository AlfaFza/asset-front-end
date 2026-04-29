import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">

      <h2 className="mb-6 font-bold">Asset System</h2>

      <ul className="space-y-3">

        {/* <li><Link to="/">Dashboard</Link></li> */}

        {user?.role === "admin" && (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/assets">Assets</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
            <li><Link to="/assignment">Assignment</Link></li>
            <li><Link to="/tickets">Tickets</Link></li>
            <li><Link to="/createuser">Create User</Link></li>
            <li><Link to="/userlist">Users</Link></li>
          </>
        )}

        {user?.role === "employee" && (
          <>
            <li><Link to="/employee">Dashboard</Link></li>
            <li><Link to="/create-ticket">Create Ticket</Link></li>
            <li><Link to="/tickets">My Tickets</Link></li>
          </>
        )}

        <li><Link to="/profile">Profile</Link></li>

      </ul>

    </div>
  );
}

export default Sidebar;



