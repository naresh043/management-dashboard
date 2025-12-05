import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { User } from "lucide-react";

export default function UserProfile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-lg shadow-lg p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center flex items-center gap-2">
          <User size={22} /> User Profile
        </h2>

        <div className="space-y-5">
          <div>
            <label className="font-medium">First Name</label>
            <InputText value={user.firstName} className="w-full mt-1" readOnly />
          </div>

          <div>
            <label className="font-medium">Last Name</label>
            <InputText value={user.lastName} className="w-full mt-1" readOnly />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <InputText value={user.email} className="w-full mt-1" readOnly />
          </div>

          <div>
            <label className="font-medium">Role</label>
            <InputText value={user.role || "N/A"} className="w-full mt-1" readOnly />
          </div>

          <div>
            <label className="font-medium">Contact Number</label>
            <InputText value={user.contactNumber || "N/A"} className="w-full mt-1" readOnly />
          </div>
        </div>
      </Card>
    </div>
  );
}
