import { useState, useEffect, useContext } from 'react';
import { useAuth } from './providers/AuthProvider';
import { readRecipesByUser } from './services/recipes.service';
import RecipeForm from './forms/CreateRecipeForm';

export default function RecipeFeed() {
  const { user } = useAuth();
  const [ currentRecipes, setCurrentRecipes ] = useState({});

  // const data = readRecipesByUser(user.id);

  // setCurrentRecipes(data);
  useEffect(() => {
    if(user != null || user != undefined) {
      const data = readRecipesByUser(user.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentRecipes(data);
    }
    
  }, [user])

  return (
    
  )
}