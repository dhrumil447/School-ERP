import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    // Mock authentication
    if (
      (email === 'admin@schoolerp.demo' && password === 'Admin@123') ||
      (email === 'student@schoolerp.demo' && password === 'Student@123') ||
      (email === 'teacher@schoolerp.demo' && password === 'Teacher@123')
    ) {
      const userData = {
        email,
        role,
        name: role === 'admin' ? 'Admin' : role === 'student' ? 'Student' : 'Teacher',
        id: Math.random().toString(36).substr(2, 9),
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
