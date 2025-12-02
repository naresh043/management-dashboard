import { Menu } from "lucide-react";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useLocation } from "react-router-dom";   // ⬅ ADD THIS
import "../../styles/header.css";
import CreateUserForm from "../../utils/CreateUserForm";
import CreateRoleForm from "../../utils/CreateRoleForm";

export default function Header({ toggleSidebar }) {
  const [displayCreateUser, setDisplayCreateUser] = useState(false);
  const [displayCreateRole, setDisplayCreateRole] = useState(false);

  const location = useLocation();   

  const isRolesPage = location.pathname === "/roles"; 

  return (
    <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 lg:px-6">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-3">

        {/* SHOW BUTTON BASED ON ROUTE */}
        {isRolesPage ? (
          /* ------------------- Create Role button ------------------- */
          <>
            <button
              onClick={() => setDisplayCreateRole(true)}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Create Role
            </button>

            <Dialog
              className="dialog-form"
              maskClassName="bg-black/80"
              visible={displayCreateRole}
              style={{ width: "40vw" }}
              onHide={() => setDisplayCreateRole(false)}
            >
              {/* Your Create Role Form */}
              <CreateRoleForm onSuccess={() => setDisplayCreateUser(false)} />
            </Dialog>
          </>
        ) : (
          <>
            <button
              onClick={() => setDisplayCreateUser(true)}
              className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Create User
            </button>

            <Dialog
              className="dialog-form"
              maskClassName="bg-black/80"
              visible={displayCreateUser}
              style={{ width: "50vw" }}
              onHide={() => setDisplayCreateUser(false)}
            >
              <CreateUserForm onSuccess={() => setDisplayCreateUser(false)} />
            </Dialog>
          </>
        )}
      </div>
    </header>
  );
}
