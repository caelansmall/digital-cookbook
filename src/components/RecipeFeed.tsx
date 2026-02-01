import { Splitter } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import RecipeList from './RecipeList';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { readRecipesByUser } from '../services/recipes.service';
import type { Recipe } from '../types/recipe.model';
import RecipeView from './RecipeView';

export default function RecipeFeed() {
  const location = useLocation();
  const { user } = useAuth();
  const [recipeList,setRecipeList] = useState<Recipe[]>([]);
  const [manualSelectedId, setManualSelectedId] = useState<number | null>(null);
  const autoSelectedId = location.state?.newRecipeId ?? null;
  const selectedRecipeId = manualSelectedId ?? autoSelectedId;
  const deleteSuccess = location.state?.deleteRecipeSuccess;
  const updateSuccess = location.state?.recipeUpdated;

  const updateRecipes = async () => {
  // grab recipe from backend --> pass to RecipeView
    let tempList = [];
    if(user?.id) {
      tempList = await readRecipesByUser(user.id);
    } else {
      console.error('User ID not present');
    }

    setRecipeList(tempList);
  }

  useEffect(() => {

    if (deleteSuccess || updateSuccess) {
      (async () => {
        await updateRecipes();
      })();
    }
    
  }, [deleteSuccess,updateSuccess]);

  useEffect(() => {
    // grab recipe from backend --> pass to RecipeView

    if(user) {
      (async () => {
        await updateRecipes();
      })();
    }
    
  }, [user]);

  const selectedRecipe = useMemo<Recipe | null>(() => {
    return recipeList.find(r => r.id === selectedRecipeId) ?? null;
  }, [recipeList, selectedRecipeId]);
  
  return (

    <Splitter style={{ height: 'calc(100vh - 80px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Splitter.Panel defaultSize='30%' min="25%" max="50%">
        <RecipeList
          recipeList={recipeList ?? []}
          selectedRecipeId={selectedRecipeId}
          onSelect={setManualSelectedId}
        />
      </Splitter.Panel>
      <Splitter.Panel>
        <RecipeView key={selectedRecipe?.id ?? "empty"} recipe={selectedRecipe} />
      </Splitter.Panel>
    </Splitter>
  )
}
