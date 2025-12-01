import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Users</h1>

      {/* Loading */}
      {loading && (
        <p className="text-gray-600">Loading users...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">{u.firstName}</td>
                <td className="p-3">{u.lastName}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <Link className="text-blue-500" to={`/users/${u.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
