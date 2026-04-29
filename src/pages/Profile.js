import MainLayout from "../layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          User Profile
        </h2>

        <div className="flex justify-center mb-4 text-5xl">
          👤
        </div>

        <div className="space-y-3">

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Username</span>
            <span>{user?.username || "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Role</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              user?.role === "admin"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}>
              {user?.role}
            </span>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </MainLayout>
  );
}

export default Profile;