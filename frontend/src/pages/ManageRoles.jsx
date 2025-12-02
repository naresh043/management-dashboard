import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

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
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 border-b text-left">
              <th className="p-3 font-semibold text-gray-700 w-20">ID</th>
              <th className="p-3 font-semibold text-gray-700">Name</th>
              <th className="p-3 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>

          <tbody>
            {roles?.map((role) => (
              <tr
                key={role.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 text-gray-800">{role.id}</td>
                <td className="p-3 font-medium text-gray-900">{role.name}</td>
                <td className="p-3 text-gray-700">{role.description}</td>
              </tr>
            ))}

            {roles.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-5 text-gray-500 italic"
                >
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
