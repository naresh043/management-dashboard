import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";
import { Button } from "primereact/button";

export default function EditUserForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    contactNumber: user.contactNumber,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};

    if (!formData.firstName) e.firstName = "First name is required";
    if (!formData.lastName) e.lastName = "Last name is required";

    if (!formData.email) e.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";

    if (!formData.role) e.role = "Role is required";

    if (!formData.contactNumber) e.contactNumber = "Contact required";
    if (!/^\d{10}$/.test(formData.contactNumber))
      e.contactNumber = "Must be 10 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    onSuccess();
  };

  return (
    <div className="space-y-4">

      {/* First Name */}
      <div>
        <label className="font-medium">First Name</label>
        <InputText
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className={`w-full ${errors.firstName && "p-invalid"}`}
        />
        {errors.firstName && <Message severity="error" text={errors.firstName} />}
      </div>

      {/* Last Name */}
      <div>
        <label className="font-medium">Last Name</label>
        <InputText
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className={`w-full ${errors.lastName && "p-invalid"}`}
        />
        {errors.lastName && <Message severity="error" text={errors.lastName} />}
      </div>

      {/* Email */}
      <div>
        <label className="font-medium">Email</label>
        <InputText
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full ${errors.email && "p-invalid"}`}
        />
        {errors.email && <Message severity="error" text={errors.email} />}
      </div>

      {/* Role */}
      <div>
        <label className="font-medium">Role</label>
        <Dropdown
          value={formData.role}
          onChange={(e) => handleChange("role", e.value)}
          options={[
            { label: "Admin", value: "Admin" },
            { label: "User", value: "User" },
            { label: "Manager", value: "Manager" },
          ]}
          className={`w-full ${errors.role && "p-invalid"}`}
        />
        {errors.role && <Message severity="error" text={errors.role} />}
      </div>

      {/* Contact */}
      <div>
        <label className="font-medium">Contact Number</label>
        <InputText
          value={formData.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
          className={`w-full ${errors.contactNumber && "p-invalid"}`}
        />
        {errors.contactNumber && <Message severity="error" text={errors.contactNumber} />}
      </div>

      <Button
        label="Update User"
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
        onClick={handleUpdate}
      />
    </div>
  );
}
