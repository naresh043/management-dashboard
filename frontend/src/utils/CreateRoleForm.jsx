import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import API_BASE_URL from "../config";

export default function CreateRoleForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newRole = {
      name,
      description
    };

    try {
      const res = await fetch(`${API_BASE_URL}/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      });

      if (!res.ok) throw new Error("Failed to create role");

      onSuccess(); // close dialog after saving
    } catch (err) {
      setError("Error creating role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4"
    >
      <h2 className="text-xl font-semibold mb-2">Create Role</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Role Name */}
      <div>
        <label className="font-medium block mb-1">Role Name</label>
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter role name"
          className="w-full"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-medium block mb-1">Description</label>
        <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Enter role description"
          className="w-full"
          required
        />
      </div>

      {/* Submit */}
      <Button
        label={loading ? "Saving..." : "Create Role"}
        type="submit"
        className="w-full"
        disabled={loading}
      />
    </form>
  );
}
