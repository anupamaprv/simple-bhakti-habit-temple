import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('simple-bhakti-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulated login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('simple-bhakti-users') || '[]');
    const foundUser = storedUsers.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('simple-bhakti-user', JSON.stringify(userWithoutPassword));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulated signup - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('simple-bhakti-users') || '[]');
    
    if (storedUsers.some((u: User) => u.email === email)) {
      throw new Error('Email already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('simple-bhakti-users', JSON.stringify(storedUsers));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('simple-bhakti-user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simple-bhakti-user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
