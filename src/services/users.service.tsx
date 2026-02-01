import type { User } from "../types/user.model";

const apiUrl = import.meta.env.VITE_BASE_API;

export const readUserByUsername = async (username: string) => {
  try {
    const data = await fetch(
      `${apiUrl}/api/user/username/${username}`,
      { credentials: 'include' }
    );

    const result = await data.json();

    return result[0];        
  } catch (error) {
    console.error("[API] Error fetching users:",error);
    throw error;
  }
};

export const updateUserById = async (
  entity: User,
) => {
  try {
    const data = await fetch(
      `${apiUrl}/api/user/${entity.id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entity)
      }
    );

    const result = data.json();

    return result;
  } catch (error) {
    console.error(`Error updating user`,error);
    throw error;
  }
}
