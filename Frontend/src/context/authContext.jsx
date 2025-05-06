// src/context/authContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../API/api'; // use axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      const userData = { email, token };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  const signup = async (email, password) => {
    try {
      await api.post('/auth/signup', { email, password });
      await login(email, password); // Auto-login after signup
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert('Signup failed. Email might already be in use.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
