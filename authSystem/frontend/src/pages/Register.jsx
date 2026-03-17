import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminKey: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All required fields must be filled");
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      toast.success("Account created successfully 🚀");

      setTimeout(() => {
        navigate("/register");
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Admin Key (Optional) */}
        <input
          type="text"
          placeholder="Admin Key (Optional)"
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          value={form.adminKey}
          onChange={(e) =>
            setForm({ ...form, adminKey: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-indigo-600 font-semibold hover:underline"
  >
    Login
  </Link>
</p>
      </form>
    </div>
  );
}

export default Register;