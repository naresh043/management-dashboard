import { useState } from "react";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/sidebar.css"

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Manage Users", icon: "pi pi-users", path: "/users" },
    { label: "Manage Roles", icon: "pi pi-id-card", path: "/roles" },
  ];

  return (
    <>
      {/* ⭐ Hamburger Button (Mobile Only) */}
      <button
        className="lg:hidden p-3 border rounded-md shadow-sm bg-white ml-3 mt-3 h-12"
        onClick={toggle}
      >
        <Menu size={28} />
      </button>

      {/* ⭐ Desktop Sidebar */}
      <aside className="hidden lg:block w-64">
        <div className="h-screen bg-white shadow-md border-r flex flex-col">
          <div className="p-5 text-2xl font-bold border-b bg-gray-50">
            Admin Panel
          </div>

          <ul className="mt-5 space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                    hover:bg-gray-100 
                    ${location.pathname === item.path ? "bg-gray-200 font-semibold shadow-sm" : ""}`}
                >
                  <i className={`${item.icon} text-gray-700`}></i>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ⭐ Mobile Sidebar (PrimeReact) */}
      <PrimeSidebar
        visible={open}
        onHide={toggle}
        className="sidebar-container p-2 w-64"
        dismissable
      >
        <div className="p-5 text-2xl font-bold border-b bg-gray-50">
          Admin Panel
        </div>

        <ul className="mt-5 space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => {
                  navigate(item.path);
                  toggle();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                  hover:bg-gray-100
                  ${location.pathname === item.path ? "bg-gray-200 font-semibold shadow-sm" : ""}`}
              >
                <i className={`${item.icon} text-gray-700`}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </PrimeSidebar>
    </>
  );
}
