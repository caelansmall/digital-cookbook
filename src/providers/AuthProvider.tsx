import { createContext, useState, useContext, type Dispatch, type SetStateAction, useMemo, type ReactNode, useEffect } from 'react';
import { type User } from '../types/user.model';

const apiUrl = import.meta.env.VITE_BASE_API;

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<UserContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [user,setUser] = useState<User | null>(null);
    const value = useMemo(() => ({ user, setUser }), [user])

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
              if(!cancelled) setUser(null);
              return;
            }

            res = await fetch(`${apiUrl}/me`, { credentials: 'include' });
          }

          if (res.ok && !cancelled) {
            setUser(await res.json());
          } else if (!cancelled) {
            setUser(null);
          }
        } catch {
          if (!cancelled) setUser(null);
        }
      };

      bootstrapAuth();
      return () => {
        cancelled = true;
      };

    }, []);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
