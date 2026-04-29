import { Bell, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";
import { useState } from "react";

function Navbar({ onSearch }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (onSearch) {
      onSearch(value); // send to parent
    }
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* Left */}
      <h2 className="text-lg font-semibold">Dashboard</h2>

      {/* Search */}
      {/* <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <Search size={16} className="text-gray-500" />
        <input
          value={search}
          onChange={handleSearch}
          className="bg-transparent outline-none ml-2 w-full"
          placeholder="Search..."
        />
      </div> */}

      {/* Right */}
      <div className="flex items-center gap-5">

        <Bell className="cursor-pointer text-gray-600" />

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="text-sm">
            <p>{user?.username || "User"}</p>
            <p className="text-gray-500 text-xs">{user?.role}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => dispatch(logout())}
          className="text-red-500 text-sm"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;