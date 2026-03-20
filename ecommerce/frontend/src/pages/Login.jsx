import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      login(res.data);
      toast.success("Welcome back 🎉");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
  <PageWrapper>
      <div className="min-h-screen flex bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]">

      {/*  LEFT SIDE (BRANDING) */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-white px-10">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
           ShopElite
        </motion.h1>

        <p className="text-gray-400 text-lg text-center max-w-md">
          Discover premium products with a seamless shopping experience 
        </p>

      </div>

      {/*  RIGHT SIDE (FORM) */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-[380px]"
        >

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
             Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full mt-1 p-3 rounded-lg bg-white/80 text-black outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full mt-1 p-3 rounded-lg bg-white/80 text-black outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg text-white font-semibold hover:scale-105 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Footer */}
          <p className="text-gray-300 text-sm mt-5 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-400 hover:underline">
              Register
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  </PageWrapper>
  );
};

export default Login;