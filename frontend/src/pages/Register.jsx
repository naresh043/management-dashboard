import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const validateFields = () => {
    if (!firstName.trim()) return "First name is required";
    if (!lastName.trim()) return "Last name is required";
    if (!email.trim()) return "Email is required";
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleRegister = async () => {
    const error = validateFields();
    if (error) {
      alert(error);
      return; // STOP HERE!!
    }

    try {
      // Check if already exists
      const checkRes = await fetch(
        `${API_BASE_URL}/userCredentials?email=${email}`
      );

      const exists = await checkRes.json();

      if (exists.length > 0) {
        alert("User already exists. Please login.");
        navigate("/login");
        return;
      }

      // Save new user
      const response = await fetch(`${API_BASE_URL}/userCredentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) throw new Error("Failed to register");

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during registration!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="First Name *"
          value={firstName}  // <-- CONTROLLED
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name *"
          value={lastName}  // <-- CONTROLLED
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email *"
          value={email}  // <-- CONTROLLED
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password * (min 6 chars)"
          value={password}  // <-- CONTROLLED
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
