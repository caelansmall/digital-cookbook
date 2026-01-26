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

      fetch(`${apiUrl}/me`, { credentials: 'include' })
        .then(res => res.ok ? res.json() : null)
        .then(user => setUser(user));
      // let didRefresh = false;

      // fetch(`${apiUrl}/me`, { credentials: 'include' })
      //   .then(res => {
      //     if(res.status === 401 && !didRefresh) {
      //       didRefresh = true;
      //       return fetch(`${apiUrl}/refresh`, { method: "POST", credentials: "include" })
      //         .then(() => fetch(`${apiUrl}/me`, { credentials: 'include' }));
      //     }
      //     return res;
      //   })
        // .then(res => res.ok ? res.json() : null)
        // .then(user => setUser(user));
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
