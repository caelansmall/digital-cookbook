import api from './api';

const apiUrl = import.meta.env.VITE_BASE_API

export const readUserByUsername = async (username: string) => {
    try {
        console.log('fetching users')
        await fetch(`${apiUrl}/api/user/username/${username}`, { credentials: 'include' })
        // const response = await api.get(`/users`, {
        //     headers: {
        //         'Authorization': `Bearer: ${token}`
        //     }
        // });
        // return response.data;
    } catch (error) {
        console.error("[API] Error fetching users:",error);
        throw error;
    }
};