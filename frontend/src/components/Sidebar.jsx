import React from "react";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();

    const items = [
        {
            label: "Manage Users",
            icon: "pi pi-users",
            command: () => {
                navigate("/manage-user");
                setIsOpen(false);
            }
        },
        {
            label: "Manage Roles",
            icon: "pi pi-id-card",
            command: () => {
                navigate("/manage-role");
                setIsOpen(false);
            }
        }
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col w-64 h-screen bg-white shadow-md">
                <div className="p-5 border-b text-xl font-semibold">
                    Admin Dashboard
                </div>

                <PanelMenu model={items} className="mt-3" />
            </div>

            {/* Mobile Sidebar (PrimeReact overlay) */}
            <PrimeSidebar
                visible={isOpen}
                position="left"
                onHide={() => setIsOpen(false)}
                className="!w-64"
            >
                <div className="p-5 border-b text-xl font-semibold">
                    Admin Dashboard
                </div>

                <PanelMenu model={items} className="mt-3" />
            </PrimeSidebar>
            <h1 className="p-10 bg-red">hello </h1>
        </>
    );
}
