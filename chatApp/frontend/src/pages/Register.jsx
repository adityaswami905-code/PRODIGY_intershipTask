import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    toast.error("Passwords do not match...");
    return;
  }

  try {
    await API.post("/auth/register", form);

    toast.success("Account created!");

    navigate("/login");
  } catch (err) {
    toast.error("Registration failed...");
  }
};

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">

      {/* Card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-96">

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm password"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <button
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition transform duration-200 rounded-lg text-white font-semibold shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;