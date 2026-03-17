import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post("/auth/login", form);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success("Login Successful 🎉");
    navigate("/dashboard");
  } catch (err) {
    toast.error(err.response?.data?.message || "Login Failed");
  }
};

 return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform hover:scale-105 transition duration-300"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome Back
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
        Login
      </button>
    </form>
  </div>
);
}

export default Login;