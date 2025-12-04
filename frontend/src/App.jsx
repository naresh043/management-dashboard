import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// User Pages
import ManageUsers from "./pages/ManageUsers";
import ViewUser from "./pages/ViewUser";
import ManageRoles from "./pages/ManageRoles";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./routes/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* User Routes */}
        <Route path="users" element={<ManageUsers />} />
        <Route path="users/:id" element={<ViewUser />} />

        {/* Role Routes */}
        <Route path="roles" element={<ManageRoles />} />
      </Route>
    </Routes>
  );
}
