const apiUrl = import.meta.env.VITE_BASE_API

export const readUserByUsername = async (username: string) => {
    try {
        const data = await fetch(`${apiUrl}/api/user/username/${username}`, { credentials: 'include' });

        const result = await data.json();

        return result[0];        
    } catch (error) {
        console.error("[API] Error fetching users:",error);
        throw error;
    }
};