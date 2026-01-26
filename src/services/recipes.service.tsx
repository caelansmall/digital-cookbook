import type { Recipe } from "../types/recipe.model";

const apiUrl = import.meta.env.VITE_BASE_API;

const readRecipesByUser = async (userId: number) => {
  try {
    const data = await fetch(
      `${apiUrl}/api/recipe/user/${userId}`,
      { credentials: 'include' }
    );

    const result = await data.json();

    return result;
  } catch (error) {
    console.error(`Error fetching recipes by user`,error);
    throw error;
  }
};

const createRecipe = async (
  entity: Recipe,
) => {
  try {

    console.log(JSON.stringify(entity));

    const data = await fetch(
      `${apiUrl}/api/recipe`,
      { 
        method: 'POST',
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
    console.error(`Error creating recipe`,error);
    throw error;
  }

};

// TODO: read recipe by id

export {
  readRecipesByUser,
  createRecipe,
}
