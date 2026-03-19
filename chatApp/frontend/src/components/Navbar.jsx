import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="h-14 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6 text-white">
      
      {/* Logo */}
      <h1 className="text-lg font-bold text-blue-400">
         ChatApp
      </h1>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          {user?.username}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;