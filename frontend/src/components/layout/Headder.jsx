import { Menu, UserStar } from "lucide-react";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import "../../styles/header.css";
import Form from "../../utils/Form";

export default function Header({ toggleSidebar }) {
  const [diplayCreateUSer, setDisplayCredateUser] = useState(false);
  return (
    <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 lg:px-6">
      {/* Mobile: Hamburger */}
      <button
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
        onClick={toggleSidebar}
      >
        <Menu size={26} />
      </button>

      {/* Title */}
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Logout */}
        <button
          onClick={() => setDisplayCredateUser(true)}
          className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Create User
        </button>
        <Dialog
          className="dialog-form"
          maskClassName="bg-black/80"
          header="Form"
          visible={diplayCreateUSer}
          draggable={false}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!diplayCreateUSer) return;
            setDisplayCredateUser(false);
          }}
        >
         <Form onSuccess={() => setDisplayCredateUser(false)}/>
        </Dialog>
      </div>
    </header>
  );
}
