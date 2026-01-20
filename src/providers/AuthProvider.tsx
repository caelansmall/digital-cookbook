import { createContext, useState, useContext, type Dispatch, type SetStateAction, useMemo, type ReactNode } from 'react';
import { type User } from '../types/user.model';

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