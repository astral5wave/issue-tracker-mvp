import { useState } from "react";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Password from "../components/Password";
import isValidEmail from "../utils/isValidEmail";
import axiosInstance from "../utils/axiosInstance";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("Tester"); // Default role

  async function handleLogin(e) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid Email");
      return;
    }
    if (!password) {
      setError("Please enter the Password");
      return;
    }
    setError("");
    try {
      const requestBody = { email, password };
      let response;
      if (role === "Tester") {
        response = await axiosInstance.post("/api/tester/login", requestBody);
      } else {
        response = await axiosInstance.post(
          "/api/developer/login",
          requestBody
        );
      }
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Login to your account
        </h2>
        <p className="text-gray-600 mb-6">Welcome back!</p>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email address:
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            className="w-full pr-2 pl-4 py-2 border border-gray-300/50 bg-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800"
          />
        </div>
        <div className="mb-4">
          <Password password={password} setPassword={setPassword} />
        </div>
        {/* Role Field */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-slate-800 font-medium mb-2"
          >
            Role:
          </label>
          <select
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300/50 bg-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={role}
          >
            <option value="Tester">Tester</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        <div className="text-red-500 text-xs my-1 w-full">
          {error && `* ${error}`}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-fuchsia-600 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          LOG IN
        </button>
        <p className="text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>

        {/* <div className="mt-4">
          <Link
            to="/register"
            className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-700"
          >
            Go to Registration
          </Link>
        </div> */
        /* <p className="text-gray-600 mt-6">
          <strong>Demo User:</strong> <br />
          Email: user@example.com <br />
          Password: password12345
        </p> */}
      </form>
    </div>
  );
}

export default LoginForm;
