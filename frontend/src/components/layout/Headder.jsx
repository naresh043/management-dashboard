import { Menu, UserStar } from "lucide-react";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import "../../styles/header.css"
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
          header="Header"
          visible={diplayCreateUSer}
          draggable={false}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!diplayCreateUSer) return;
            setDisplayCredateUser(false);
          }}
        >
          <div className="card">
            <div className="flex flex-wrap align-items-center mb-3 gap-2">
              <label htmlFor="username" className="p-hidden-accessible">
                Username
              </label>
              <InputText
                id="username"
                placeholder="Username"
                className="p-invalid mr-2"
              />
              <Message severity="error" text="Username is required" />
            </div>
            <div className="flex flex-wrap align-items-center gap-2">
              <label htmlFor="email" className="p-hidden-accessible">
                Email
              </label>
              <InputText
                id="email"
                placeholder="Email"
                className="p-invalid mr-2"
              />
              <Message severity="error" />
            </div>
          </div>
        </Dialog>
      </div>
    </header>
  );
}
