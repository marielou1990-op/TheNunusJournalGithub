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
      // Check if Google client ID is configured
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        // Fallback to mock implementation for development
        const mockGoogleUser: User = {
          id: 'google_123',
          email: 'user@gmail.com',
          name: 'Google User',
          role: 'user',
          avatar: 'https://lh3.googleusercontent.com/a/default-user',
        };

        setUser(mockGoogleUser);
        localStorage.setItem('auth_user', JSON.stringify(mockGoogleUser));
        return;
      }

      // Use Google Identity Services for OAuth
      if (typeof window !== 'undefined' && window.google && window.google.accounts) {
        return new Promise<void>((resolve, reject) => {
          try {
            window.google.accounts.oauth2.initTokenClient({
              client_id: clientId,
              scope: 'openid email profile',
              callback: async (tokenResponse: any) => {
                if (tokenResponse.error) {
                  setIsLoading(false);
                  reject(new Error(tokenResponse.error || 'Google authentication failed'));
                  return;
                }

                try {
                  // Get user info with the access token
                  const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`);
                  if (!response.ok) {
                    throw new Error('Failed to fetch user information');
                  }

                  const userInfo = await response.json();
                  const googleUser: User = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.name,
                    role: userInfo.email === import.meta.env.VITE_ADMIN_EMAIL ? 'admin' : 'user',
                    avatar: userInfo.picture,
                  };

                  setUser(googleUser);
                  localStorage.setItem('auth_user', JSON.stringify(googleUser));
                  setIsLoading(false);
                  resolve();
                } catch (err) {
                  setIsLoading(false);
                  reject(new Error('Failed to fetch user information'));
                }
              },
            }).requestAccessToken();
          } catch (err) {
            setIsLoading(false);
            reject(new Error('Google OAuth initialization failed'));
          }
        });
      } else {
        // Fallback to mock implementation for development
        const mockGoogleUser: User = {
          id: 'google_123',
          email: 'user@gmail.com',
          name: 'Google User',
          role: 'user',
          avatar: 'https://lh3.googleusercontent.com/a/default-user',
        };

        setUser(mockGoogleUser);
        localStorage.setItem('auth_user', JSON.stringify(mockGoogleUser));
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
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
