import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import API_BASE_URL from "../config";

function CreateUserForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // clear error while typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.role)
      newErrors.role = "Role is required";

    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Enter a valid 10-digit number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT API
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create user");

      // Reset Form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        contactNumber: "",
      });

      onSuccess && onSuccess();
      alert("User created successfully!");
    } catch (err) {
      alert("Failed to create user");
      console.error(err);
    }
  };

  return (
    <div className="card space-y-4">

      {/* First Name */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">First Name</label>
        <InputText
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="Enter first name"
          className={`w-full ${errors.firstName ? "p-invalid" : ""}`}
        />
        {errors.firstName && (
          <Message severity="error" text={errors.firstName} />
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Last Name</label>
        <InputText
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Enter last name"
          className={`w-full ${errors.lastName ? "p-invalid" : ""}`}
        />
        {errors.lastName && (
          <Message severity="error" text={errors.lastName} />
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Email ID</label>
        <InputText
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter email"
          className={`w-full ${errors.email ? "p-invalid" : ""}`}
        />
        {errors.email && <Message severity="error" text={errors.email} />}
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Role</label>
        <Dropdown
          value={formData.role}
          onChange={(e) => handleChange("role", e.value)}
          placeholder="Select role"
          options={[
            { label: "Admin", value: "Admin" },
            { label: "User", value: "User" },
            { label: "Manager", value: "Manager" },
          ]}
          className={`w-full border rounded-md shadow-sm ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.role && <Message severity="error" text={errors.role} />}
      </div>

      {/* Contact Number */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Contact Number</label>
        <InputText
          value={formData.contactNumber}
          onChange={(e) =>
            handleChange("contactNumber", e.target.value)
          }
          placeholder="Enter contact number"
          className={`w-full ${errors.contactNumber ? "p-invalid" : ""}`}
        />
        {errors.contactNumber && (
          <Message severity="error" text={errors.contactNumber} />
        )}
      </div>

      {/* Submit */}
      <div className="pt-3">
        <Button
          label="Create User"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2"
        />
      </div>
    </div>
  );
}

export default CreateUserForm;
