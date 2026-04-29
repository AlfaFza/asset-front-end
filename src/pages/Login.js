import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password
      });

      const { user, access, refresh } = res.data;

      // ✅ store tokens
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // ✅ store user in redux
      dispatch(setUser(user));

      // ✅ redirect based on role
      if (user.role === "admin") {
        navigate("/");
      } else {
        navigate("/employee");
      }

    } catch (err) {
      console.log("LOGIN ERROR ❌", err.response?.data);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;