import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_BASE_URL from "../config";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim()) {
      alert("Email is required");
      return;
    }
    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/userCredentials?email=${email}&password=${password}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Network error");

      const users = await response.json();

      if (users.length === 1) {
        localStorage.setItem("user", JSON.stringify(users[0]));
        login();
        navigate("/");
      } else {
        alert("Email or password is incorrect");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email *"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password *"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
