import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);

  // Strict In-Memory Auth: No persistent storage (localStorage/sessionStorage).
  // Typing ANY URL in the browser will find no saved session and redirect to Home Page (/).
  // Admin panel can ONLY be accessed by explicitly entering valid credentials on /login.
  const login = (userData, jwtToken) => {
    setAdmin(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch (e) {
      // Ignore storage errors
    }
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
