import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import API_BASE_URL from "../config";

import CreateUserForm from "../utils/CreateUserForm"; // ⬅ ADD THIS
import "../styles/manageuser.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [displayCreateUser, setDisplayCreateUser] = useState(false); // ⬅ ADD THIS

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------- ROLE BADGE ----------
  const roleTemplate = (row) => {
    const colors = {
      Admin: "bg-red-100 text-red-700",
      Manager: "bg-blue-100 text-blue-700",
      User: "bg-green-100 text-green-700",
      Developer: "bg-purple-100 text-purple-700",
      Support: "bg-yellow-100 text-yellow-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          colors[row.role] || "bg-gray-100 text-gray-700"
        }`}
      >
        {row.role}
      </span>
    );
  };

  // ---------- ACTION BUTTON ----------
  const actionTemplate = (row) => (
    <Link
      to={`/users/${row.id}`}
      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
    >
      View
    </Link>
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>

        {/* ---------- CREATE USER BUTTON ---------- */}
        <button
          onClick={() => setDisplayCreateUser(true)}
          className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Create User
        </button>
      </div>

      {/* ---------- CREATE USER DIALOG ---------- */}
      <Dialog
        className="dialog-form"
        maskClassName="bg-black/80"
        visible={displayCreateUser}
        style={{ width: "50vw" }}
        onHide={() => setDisplayCreateUser(false)}
      >
        <CreateUserForm
          onSuccess={() => {
            setDisplayCreateUser(false);
            fetchUsers(); // refresh table after creating user
          }}
        />
      </Dialog>

      {/* TABLE CONTAINER */}
      <div className="bg-white p-5 shadow-lg rounded-xl border border-gray-100">
        <DataTable
          value={users}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          sortMode="multiple"
          filterDisplay="row"
          className="rounded-xl overflow-hidden shadow"
        >
          <Column
            field="firstName"
            header="First Name"
            sortable
            filter
            filterPlaceholder="Search..."
            headerClassName="text-gray-700 font-semibold bg-gray-50"
            className="py-3"
          />

          <Column
            field="lastName"
            header="Last Name"
            sortable
            filter
            filterPlaceholder="Search..."
            headerClassName="text-gray-700 font-semibold bg-gray-50"
          />

          <Column
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search..."
            headerClassName="text-gray-700 font-semibold bg-gray-50"
          />

          <Column
            field="role"
            header="Role"
            sortable
            filter
            body={roleTemplate}
            filterPlaceholder="Search..."
            headerClassName="text-gray-700 font-semibold bg-gray-50"
          />

          <Column
            header="Actions"
            body={actionTemplate}
            headerClassName="text-gray-700 font-semibold bg-gray-50 text-center"
            bodyClassName="text-center"
            style={{ width: "140px" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
