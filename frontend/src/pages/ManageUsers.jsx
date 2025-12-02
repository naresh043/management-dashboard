import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
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

  // ---------- Pagination Logic ----------
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  // --------------------------------------

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Users</h1>

      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && !error && (
        <>
          {/* ---------- Users Table ---------- */}
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b text-left">
                <th className="p-3 font-semibold text-gray-700">First Name</th>
                <th className="p-3 font-semibold text-gray-700">Last Name</th>
                <th className="p-3 font-semibold text-gray-700">Email</th>
                <th className="p-3 font-semibold text-gray-700">Role</th>
                <th className="p-3 font-semibold text-gray-700 text-center w-32">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{u.firstName}</td>
                  <td className="p-3">{u.lastName}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>

                  <td className="p-3 text-center">
                    <Link
                      className="text-blue-600 hover:underline font-medium"
                      to={`/users/${u.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-5 text-gray-500 italic"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ---------- Pagination UI ---------- */}
          <div className="flex justify-center items-center gap-2 mt-5">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              First
            </button>

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
}
