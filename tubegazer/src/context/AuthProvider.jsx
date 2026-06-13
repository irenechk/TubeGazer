import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "tubegazer_auth";
const USERS_KEY   = "tubegazer_users";

// Demo account always available
const DEMO_USER = { username: "studio", password: "tubegazer123", displayName: "TubeGazer Studio", avatar: "🎥" };

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Load persisted session on mount (useEffect)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get registered users from localStorage
  const getUsers = useCallback(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [DEMO_USER];
    } catch {
      return [DEMO_USER];
    }
  }, []);

  // Register a new account
  const register = useCallback((username, password, displayName) => {
    const users = getUsers();
    const exists = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (exists) return { success: false, error: "Username already taken." };

    const newUser = {
      username,
      password,
      displayName: displayName || username,
      avatar: "🎬",
    };
    const updated = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    return { success: true };
  }, [getUsers]);

  // Login
  const login = useCallback((username, password) => {
    const users = getUsers();
    const match = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );
    if (!match) return { success: false, error: "Invalid username or password." };

    const sessionUser = {
      username:    match.username,
      displayName: match.displayName,
      avatar:      match.avatar,
      loginTime:   new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  }, [getUsers]);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
