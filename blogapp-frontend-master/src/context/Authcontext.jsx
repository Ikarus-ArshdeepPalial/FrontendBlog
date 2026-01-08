import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from '../services';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      async function fetchUser() {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (e) {
          console.error("Failed to fetch user on load:", e);
          // Token might be expired, log out user
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
      fetchUser();
    }
  }, []);

  const login = async (data) => {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    try {
        const userData = await getMe();
        setUser(userData);
    } catch (e) {
        console.error("Failed to fetch user after login:", e);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
