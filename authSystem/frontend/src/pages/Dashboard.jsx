import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get("/auth/dashboard");
      setMessage(data.message);
    };
    fetchData();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {user?.name} 👋
      </h1>

      <p className="mb-8 text-lg">{message}</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-xl font-bold mb-2">Profile</h2>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>

        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-xl font-bold mb-2">Security</h2>
          <p>JWT Authentication</p>
          <p>Password Hashed</p>
        </div>

        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-xl font-bold mb-2">System Status</h2>
          <p>Backend Connected ✅</p>
          <p>Database Connected ✅</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;