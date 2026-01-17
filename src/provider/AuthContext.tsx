'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { axiosPublic } from '@/lib/axios';
import { User, AuthResponse } from '@/types/index';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to refresh token on initial load
        const res: any = await axiosPublic.get<AuthResponse>('/auth/refresh-access-token', {
          withCredentials: true,
        });
        setAccessToken(res.data.data.accessToken);
        setUser(res.data.data.seller);
      } catch (error) {
        // If refresh fails, user is just unauthenticated
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, setUser, setAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
