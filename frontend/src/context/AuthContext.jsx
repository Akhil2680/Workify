import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('workify_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('workify_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = ({ token: newToken, user: newUser }) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('workify_token', newToken);
    localStorage.setItem('workify_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('workify_token');
    localStorage.removeItem('workify_user');
  };

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
