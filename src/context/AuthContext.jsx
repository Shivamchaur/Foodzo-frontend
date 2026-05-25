import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const getToken = () => {
  const match = document.cookie.match(new RegExp('(^| )foodzo_token=([^;]+)'));
  return match ? match[2] : '';
};

const setTokenCookie = (token) => {
  if (token) {
    document.cookie = `foodzo_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    console.log("Token successfully stored in cookies:", token);
  } else {
    document.cookie = `foodzo_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    console.log("Token removed from cookies.");
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('foodzo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    setTokenCookie(token);
  }, [token]);

  const setAuthData = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('foodzo_user', JSON.stringify(data.user));
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Login failed');
      setAuthData(result);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Register failed');
      setAuthData(result);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('foodzo_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
