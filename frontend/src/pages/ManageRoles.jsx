import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function ManageRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/roles`);

      const data = await res.json();
      //   debugger
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
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Roles</h1>
      {/* Loading */}
      {loading && <p className="text-gray-600">Loading roles...</p>}

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Roles Table */}
      {!loading && !error && (
        <DataTable
          value={roles}
          paginator
          rows={5}
          //  sortMode="multiple"
          // filterDisplay="row" 
          rowsPerPageOptions={[5,10, 20]} 
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport"
        >
          <Column showFilterMenuOptions={false} field="id" header="ID" sortable filter filterPlaceholder="Search"  />
          <Column  showFilterMenuOptions={false} field="name" header="Name"  sortable  filter filterPlaceholder="Search"/>
          <Column 
          // showFilterMatchModes={false}
          // showFilterMenu={false}
          showFilterMenuOptions={false}
          style={{width:'400px'}} field="description" header="Description" sortable  filter filterPlaceholder="Search"/>
        </DataTable>
      )}
    </div>
  ); 
}
