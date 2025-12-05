import { useRef } from "react";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
// import { Users, IdCard, CheckCircle, Calendar } from "lucide-react";
import {
  Menu as MenuIcon,
  User,
  Users,
  CheckCircle,
  Calendar,
  IdCard,
} from "lucide-react";
import {} from "lucide-react";

import { Menu } from "primereact/menu";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/sidebar.css";
import useAuth from "../../hook/useAuth";

export default function Sidebar({ open, toggle }) {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: useRef instead of useState (prevents infinite re-render)
  const profileMenuRef = useRef(null);

  const menuItems = [
    { label: "Manage Users", icon: <Users size={18} />, path: "/users" },
    { label: "Manage Roles", icon: <IdCard size={18} />, path: "/roles" },
    {
      label: "Mark Attendance",
      icon: <CheckCircle size={18} />,
      path: "/attendance",
    },
    {
      label: "View Attendance",
      icon: <Calendar size={18} />,
      path: "/attendance-list",
    },
  ];

  const profileItems = [
    {
      label: "User Profile",
      icon: <User size={18} />,
      command: () => navigate("/profile"),
    },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="lg:hidden p-3 border rounded-md shadow-sm bg-white ml-3 mt-3 h-12"
        onClick={toggle}
      >
        <MenuIcon size={28} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64">
        <div className="h-screen bg-white shadow-md border-r flex flex-col justify-between">
          {/* TOP MENU */}
          <div>
            <div className="p-5 text-2xl font-bold border-b bg-gray-50">
              Admin Panel
            </div>
            <ul className="mt-5 space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
        hover:bg-gray-100 transition-all
        ${
          location.pathname === item.path
            ? "bg-gray-200 font-semibold shadow-sm"
            : ""
        }
      `}
                  >
                    {item.icon} {/* ← FIX HERE */}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* USER PROFILE DROPDOWN */}
          <div className="p-4 border-t bg-gray-50">
            <div
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              onClick={(e) => profileMenuRef.current.toggle(e)} // ✅ FIXED
            >
              <User size={22} />
              <div>
                <p className="font-semibold">{user?.firstName}</p>
                <p className="text-xs text-gray-500">View & Attendance</p>
              </div>
            </div>

            {/* FIXED: useRef instead of setState */}
            <Menu model={profileItems} popup ref={profileMenuRef} />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <PrimeSidebar
        visible={open}
        onHide={toggle}
        className="sidebar-container p-2 w-64"
        dismissable
      >
        <div className="h-full flex flex-col justify-between">
          {/* TOP MOBILE MENU */}
          <div>
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
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
        hover:bg-gray-100 transition-all
        ${
          location.pathname === item.path
            ? "bg-gray-200 font-semibold shadow-sm"
            : ""
        }
      `}
                  >
                    {item.icon} {/* ← FIX HERE AS WELL */}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* MOBILE USER PROFILE DROPDOWN */}
          <div className="p-4 border-t bg-gray-50">
            <div
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              onClick={(e) => profileMenuRef.current.toggle(e)} // FIXED
            >
              <User size={22} />
              <div>
                <p className="font-semibold">User Profile</p>
                <p className="text-xs text-gray-500">View & Attendance</p>
              </div>
            </div>

            <Menu model={profileItems} popup ref={profileMenuRef} />
          </div>
        </div>
      </PrimeSidebar>
    </>
  );
}
