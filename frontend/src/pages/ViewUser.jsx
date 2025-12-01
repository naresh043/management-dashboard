import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Mail, Phone, UserCircle2, ShieldCheck, Pencil } from "lucide-react";
import "../styles/viewuser.css"
import EditUserForm from "../utils/EditUserForm";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  console.log(user);
  // Fetch User by ID
  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message || "Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading user...</p>;
  if (error) return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <>
      <Card className="shadow-md border rounded-xl p-5 bg-white max-w-md mx-auto mt-10 relative">

        {/* Edit Icon (top-right) */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setShowEdit(true)}
        >
          <Pencil size={20} className="text-blue-600" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <UserCircle2 size={32} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 text-sm">User ID: {user.id}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-3">

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-700" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-gray-700" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{user.role}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-gray-700" />
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{user.contactNumber}</p>
            </div>
          </div>

        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        header="Edit User"
        className="dialog-form-editUser"
        visible={showEdit}
        onHide={() => setShowEdit(false)}
        style={{ width: "45vw" }}
      >
        <EditUserForm
          user={user}
          onSuccess={() => {
            setShowEdit(false);
            fetchUser(); // refresh user details
          }}
        />
      </Dialog>
    </>
  );
}
