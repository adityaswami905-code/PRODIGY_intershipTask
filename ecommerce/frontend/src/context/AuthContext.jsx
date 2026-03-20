import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Load user safely
  useEffect(() => {
    try {
      const data = localStorage.getItem("user");

      if (data && data !== "undefined") {
        setUser(JSON.parse(data));
      }
    } catch (err) {
      console.error("Invalid user data in localStorage");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  //  Login
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  //  Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};