import { Button, Card, Input, Splitter } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import RecipeList from './RecipeList';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { readRecipeByPartialName, readRecipesByUser } from '../services/recipes.service';
import type { Recipe } from '../types/recipe.model';
import RecipeView from './RecipeView';
import debounce from "lodash/debounce";
import { CloseOutlined, FilterOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';

export default function RecipeFeed() {
  const location = useLocation();
  const { user } = useAuth();
  const [recipeList,setRecipeList] = useState<Recipe[]>([]);
  const [manualSelectedId, setManualSelectedId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
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

  const findRecipesByPartialName = debounce(async (name: string) => {
    if(user && user.id && name && name.trim().length > 0) {
      setIsSearchLoading(true);
      const data = await readRecipeByPartialName({
        userId: user.id,
        name: name.trim()
      });
      setRecipeList(data);
      setIsSearchLoading(false);
    } else {
      updateRecipes();
    }
  })
  
  return (

    <Splitter style={{ height: 'calc(100vh - 80px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Splitter.Panel defaultSize='30%' min="25%" max="50%">
        {isSearching ? (
          <Card
            size='small'
            variant='borderless'
            children={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Input
                  variant='underlined'
                  placeholder='Search recipes...'
                  onChange={(e) => findRecipesByPartialName(e.target.value)}
                  suffix={
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {isSearchLoading && <LoadingOutlined spin />}
                    </span>
                  }
                />
                <Button 
                  type='dashed'
                  shape='circle'
                  icon={<CloseOutlined />}
                  onClick={() => {
                    setIsSearching(false);
                    setIsSearchLoading(false);
                    updateRecipes();
                  }}
                  style={{
                    marginLeft: '15px'
                  }}
                />
              </div>
            }
          ></Card>
        ) : (
          <Card
            size='small'
            variant='borderless'
            children={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button className='submit-button' icon={<SearchOutlined />} onClick={() => setIsSearching(true)} size={'large'} />
                <Button className='submit-button' icon={<FilterOutlined />} size={'large'} />
              </div>
            }
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          />
        )}
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
