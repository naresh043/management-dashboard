import { useRef, useContext } from "react";
import { Toast } from "primereact/toast";
import { LogOut } from "lucide-react";
import "../../styles/header.css";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ toggleSidebar }) {
  const { isAuth, logout } = useContext(AuthContext);
  const toast = useRef(null);

  const handleLogout = () => {
    // 1) Show toast first
    toast.current.show({
      severity: "success",
      summary: "Logged Out",
      detail: "You have successfully logged out",
      life: 1500,
    });

    // 2) Logout after a delay (so toast can show)
    setTimeout(() => {
      logout();  // This redirects to login page
    }, 1200);
  };

  return (
    <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 lg:px-6">
      <Toast ref={toast} position="top-right" />

      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {isAuth && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
