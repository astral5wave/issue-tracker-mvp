import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email, password };
      const response = await axios.post("http://localhost:5174/", requestBody);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/");
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
    <div className="flex justify-center items-center max-h-screen">
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="w-full px-4 py-2 border border-gray-600 bg-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password:
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="w-full px-4 py-2 border border-gray-600 bg-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-fuchsia-300 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-700"
        >
          LOG IN
        </button>
        <p className="text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
        {/* <p className="text-gray-600 mt-6">
          <strong>Demo User:</strong> <br />
          Email: user@example.com <br />
          Password: password12345
        </p> */}
      </form>
    </div>
  );
}

export default LoginForm;
