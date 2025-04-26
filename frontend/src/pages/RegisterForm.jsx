import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin"); // Default role

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const requestBody = { name, email, password, role };
      const response = await axios.post(
        "http://localhost:5174/register",
        requestBody
      );
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create an account
        </h2>
        <p className="text-gray-600 mb-6">Join us today!</p>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name:
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border border-gray-600 bg-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email address:
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-4 py-2 border border-gray-600 bg-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password:
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-2 border border-gray-600 bg-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            required
          />
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Role:
          </label>
          <select
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 bg-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="role"
            value={role}
          >
            <option value="Admin">Admin</option>
            <option value="Tester">Tester</option>
            <option value="Developer">Developer</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-fuchsia-600 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-700"
        >
          REGISTER
        </button>

        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
