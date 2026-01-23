const apiUrl = import.meta.env.VITE_BASE_API;

export const readRecipesByUser = async (userId: number | undefined) => {
  try {
    const data = await fetch(
      `${apiUrl}/api/recipe/user/${userId}`,
      { credentials: 'include' }
    );

    const result = await data.json();

    return result;
  } catch (error) {
    console.error(`[API] Error fetching recipes by user`,error);
    throw error;
  }
};