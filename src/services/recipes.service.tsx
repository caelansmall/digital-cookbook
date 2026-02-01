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

const deleteRecipeById = async (
  recipeId: number
) => {
  try {
    const data = await fetch(
      `${apiUrl}/api/recipe/${recipeId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    const result = data.json();

    return result;
  } catch (error) {
    console.error(`Error deleting recipe`,error);
    throw error;
  }
}

const updateRecipeById = async (
  entity: Recipe,
) => {
  try {
    const data = await fetch(
      `${apiUrl}/api/recipe/${entity.id}`,
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
    console.error(`Error updating recipe`,error);
    throw error;
  }
}

export {
  readRecipesByUser,
  createRecipe,
  deleteRecipeById,
  updateRecipeById
}
