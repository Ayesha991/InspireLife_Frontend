import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on load
    const storedToken = localStorage.getItem('token');
    const storedAdmin = localStorage.getItem('admin');

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = (userData, jwtToken) => {
    setAdmin(userData);
    setToken(jwtToken);
    localStorage.setItem('admin', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
