import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Inventory from "./pages/Inventory";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Assignment from "./pages/Assignment";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CreateTicket from "./pages/CreateTicket";
import AssignAsset from "./pages/AssignAsset";
import CreateUser from "./pages/CreateUser";
import UserList from "./pages/UserList";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />

      {/* Main Route */}
      <Route
        path="/"
        element={
          user ? (
            user.role === "admin" ? (
              <Dashboard />
            ) : (
              <EmployeeDashboard />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Admin Routes */}
      <Route
        path="/assets"
        element={user ? <Assets /> : <Navigate to="/login" />}
      />
      <Route
        path="/inventory"
        element={user ? <Inventory /> : <Navigate to="/login" />}
      />
      <Route
        path="/tickets"
        element={user ? <Tickets /> : <Navigate to="/login" />}
      />
      <Route
        path="/assignment"
        element={user ? <Assignment /> : <Navigate to="/login" />}
      />
      <Route
        path="/assign"
        element={user ? <AssignAsset /> : <Navigate to="/login" />}
      />

      <Route
        path="/createuser"
        element={user ? <CreateUser /> : <Navigate to="/login" />}
      />

      <Route
        path="/userlist"
        element={user ? <UserList /> : <Navigate to="/login" />}
      />

      {/* Employee */}
      <Route
        path="/employee"
        element={user ? <EmployeeDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-ticket"
        element={user ? <CreateTicket /> : <Navigate to="/login" />}
      />

      {/* Common */}
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />
     
     


    </Routes>
    
  );
}

export default App;