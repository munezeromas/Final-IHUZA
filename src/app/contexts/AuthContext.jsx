import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_CREDENTIALS = {
  email: 'admin@ihuza.com',
  password: '123456',
  user: {
    id: 'admin-001',
    name: 'Admin',
    email: 'admin@ihuza.com',
    role: 'admin',
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ihuza_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);


  const login = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_CREDENTIALS.user);
      localStorage.setItem('ihuza_user', JSON.stringify(ADMIN_CREDENTIALS.user));
      return true;
    }

    const usersData = localStorage.getItem('ihuza_users');
    const users = usersData ? JSON.parse(usersData) : [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem('ihuza_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

 
  const register = (name, email, password) => {
    if (email === ADMIN_CREDENTIALS.email) {
      return { success: false, message: 'This email is not available' };
    }

    const usersData = localStorage.getItem('ihuza_users');
    const users = usersData ? JSON.parse(usersData) : [];

    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'user', 
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('ihuza_users', JSON.stringify(users));

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    
    setUser(userWithoutPassword);
    localStorage.setItem('ihuza_user', JSON.stringify(userWithoutPassword));

    return { success: true };
  };


  const getAllUsers = () => {
    if (!isAdmin()) return [];
    
    const usersData = localStorage.getItem('ihuza_users');
    return usersData ? JSON.parse(usersData) : [];
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ihuza_user');
  };


  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin,
    getAllUsers, 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
