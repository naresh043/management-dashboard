import { Menu } from "lucide-react";
import { useContext } from "react";
import "../../styles/header.css";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ toggleSidebar }) {
  const { isAuth, logout } = useContext(AuthContext);

  return (
    <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 lg:px-6">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <Menu className="cursor-pointer lg:hidden" onClick={toggleSidebar} />
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {isAuth && (
          <button
            onClick={logout}
            className="px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
