import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    id: null,
    userName: null,
    email: null,
    updateUser: () => {}, // Placeholder for the update function
});

export const useUser = () => useContext(AuthContext);
