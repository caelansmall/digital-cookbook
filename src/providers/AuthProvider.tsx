import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState({ username: '', isLoggedIn: false });

    // Function to update the user state
    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    // The value provided to consumer components
    const contextValue = {
        user,
        updateUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}