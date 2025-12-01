import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Sidebar from "./components/layout/Sidebar";

// User Pages
import ManageUsers from "./pages/ManageUsers";
// import ViewUser from "../pages/users/ViewUser";

// // Role Pages
// import ManageRoles from "../pages/roles/ManageRoles";
// import ViewRole from "../pages/roles/ViewRole";

export default function AppRoutes() {
  return (
   <Routes>
    <Route path="/" element={<Layout />}>
        // {/* User Routes */}
        <Route path="users" element={<ManageUsers />} />
        // {/* // <Route path="users/:id" element={<ViewUser />} /> */}
        // {/* Role Routes */}
        // {/* <Route path="roles" element={<ManageRoles />} /> */}
        // {/* <Route path="roles/:id" element={<ViewRole />} /> */}
      </Route>
    </Routes>
  );
}



