import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import CreateRoleForm from "../utils/CreateRoleForm";

export default function ManageRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For Dialog
  const [displayCreateRole, setDisplayCreateRole] = useState(false);

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/roles`);
      const data = await res.json();
      setRoles(data);
    } catch (err) {
      setError("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Manage Roles</h1>

        {/* ---------- CREATE ROLE BUTTON ---------- */}
        <button
          onClick={() => setDisplayCreateRole(true)}
          className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Create Role
        </button>

        {/* ---------- CREATE ROLE POPUP ---------- */}
        <Dialog
          className="dialog-form"
          maskClassName="bg-black/80"
          visible={displayCreateRole}
          style={{ width: "40vw" }}
          onHide={() => setDisplayCreateRole(false)}
        >
          <CreateRoleForm
            onSuccess={() => {
              setDisplayCreateRole(false);
              fetchRoles(); // refresh roles list
            }}
          />
        </Dialog>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-600">Loading roles...</p>}

      {/* ERROR */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ROLES TABLE */}
      {!loading && !error && (
        <DataTable
          value={roles}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport"
        >
          <Column
            showFilterMenuOptions={false}
            field="id"
            header="ID"
            sortable
            filter
          />

          <Column
            showFilterMenuOptions={false}
            field="name"
            header="Name"
            sortable
            filter
          />

          <Column
            showFilterMenuOptions={false}
            style={{ width: "400px" }}
            field="description"
            header="Description"
            sortable
            filter
          />
        </DataTable>
      )}
    </div>
  );
}
