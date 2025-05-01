import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Password from "../components/Password";
import isValidEmail from "../utils/isValidEmail";

function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Tester"); // Default role
  const [error,setError]= useState("");

  async function handleRegister(e) {
    e.preventDefault();
    if(!name){
      setError("Please enter your Full Name")
      return;
    }
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
      const requestBody = { name, email, password };
      let response;
      if(role==="Tester"){
        response = await axiosInstance.post("/api/tester/register", requestBody);
      }else{
        response = await axiosInstance.post("/api/developer/register", requestBody);
      }
      localStorage.setItem("token", response.data.token);
      navigate("/home"); // Redirect to home page
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full pr-2 pl-4 py-2 border border-gray-300/50 bg-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800"
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            className="w-full pr-2 pl-4 py-2 border border-gray-300/50 bg-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800"
          />
        </div>

        {/* Password Field */}
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
          {
            error && `* ${error}`
          }
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-fuchsia-600 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
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
