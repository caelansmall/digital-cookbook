import { createContext, useState, useContext, type Dispatch, type SetStateAction, useMemo, type ReactNode, useEffect } from 'react';
import { type User } from '../types/user.model';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

const apiUrl = import.meta.env.VITE_BASE_API;

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<UserContextType | null>(null);

const AuthBootstrap = ({ children }: AuthProviderProps) => {
  const context = useContext(AuthContext);
  if(!context) throw new Error("AuthBootstrap must be within AuthContextProvider");

  const { setUser } = context;
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    const bootstrapAuth = async () => {
      try {
        let res = await fetch(`${apiUrl}/me`, { credentials: 'include' });

        if (res.status === 401) {
          const refresh = await fetch(`${apiUrl}/refresh`, {
            method: 'POST',
            credentials: 'include'
          });

          if (!refresh.ok) {
            if(!cancelled) {
              setUser(null);
              setLoading(false);
              if(location.pathname !== "/") {
                navigate("/");
              }
            }
            return;
          }

          res = await fetch(`${apiUrl}/me`, { credentials: 'include' });
        }

        if (res.ok && !cancelled) {
          const userData = await res.json();
          setUser(userData);
          setLoading(false);
          if(location.pathname === '/') {
            navigate('/feed');
          }
        } else if (!cancelled) {
          setUser(null);
          setLoading(false);
          if(location.pathname !== '/') {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Auth bootstrap error:', error);
        if (!cancelled) {
          setUser(null);
          setLoading(false);
          if (location.pathname !== '/') {
            navigate('/');
          }
        }
      }
    };

    bootstrapAuth();
    return () => {
      cancelled = true;
    };

  }, [navigate,location.pathname,setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [user,setUser] = useState<User | null>(null);

    const value = useMemo(() => ({
      user,
      setUser,
      loading: false
    }), [user]);

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
}

export const AuthWithBootstrap = ({ children }: { children: ReactNode }) => {
  return <AuthBootstrap>{children}</AuthBootstrap>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
