const apiUrl = import.meta.env.VITE_BASE_API;

const readIngredientsByPartialName = async (partialName: string) => {
  try {
    const data = await fetch(
      `${apiUrl}/api/ingredient/autocomplete/${partialName}`,
      { credentials: 'include' }
    );

    // console.log(data);

    const result = await data.json();

    return result;
  } catch (error) {
    console.error(`Error fetching ingredients by partial ingredient name`,error);
    throw error;
  }

};

export {
  readIngredientsByPartialName,
}