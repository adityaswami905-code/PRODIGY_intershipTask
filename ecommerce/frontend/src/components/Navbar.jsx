import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = ({ search, setSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">

      <div className="flex items-center justify-between px-6 py-3">

        {/*  LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide"
        >
           ShopElite
        </Link>

        {/*  SEARCH */}
        <div className="flex-1 mx-6 hidden md:block">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search premium products..."
            className="w-full px-4 py-2 rounded-full bg-white/80 text-black outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/*  RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/*  CART */}
          <Link
            to="/cart"
            className="relative bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition"
          >
            

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 🛠 ADMIN */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-green-500 px-3 py-1 rounded-full text-white hover:scale-105 transition"
            >
              Admin
            </Link>
          )}

          {/*  USER DROPDOWN */}
          {user && (
            <div className="relative">

              {/* Avatar */}
              <div
                onClick={() => setOpen(!open)}
                className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg text-black overflow-hidden">

                  <div className="px-4 py-2 border-b">
                    {user.name}
                  </div>

                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;