import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual auth API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email === 'fasosrealestate@gmail.com' ? 'admin' : 'user',
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Google OAuth flow
      console.log('Google OAuth not yet configured');
      // This will be replaced with actual OAuth integration
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'manager';

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signInWithGoogle, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
