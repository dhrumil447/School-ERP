import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const USERS = {
  'admin@schoolerp.demo':   { password: 'Admin@123',   role: 'admin',   name: 'Admin User',       avatar: 'A' },
  'student@schoolerp.demo': { password: 'Student@123', role: 'student', name: 'Aarav Sharma',      avatar: 'A' },
  'teacher@schoolerp.demo': { password: 'Teacher@123', role: 'teacher', name: 'Dr. Sanjay Kumar',  avatar: 'S' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('erp_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const login = (email, password) => {
    const match = USERS[email];
    if (match && match.password === password) {
      const userData = {
        email,
        role: match.role,
        name: match.name,
        avatar: match.avatar,
        id: Math.random().toString(36).substr(2, 9),
      };
      setUser(userData);
      localStorage.setItem('erp_user', JSON.stringify(userData));
      return { success: true, role: match.role };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('erp_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
