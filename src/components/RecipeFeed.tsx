// import { useState, useEffect } from 'react';
// import { useAuth } from '../providers/AuthProvider';
// import { readRecipesByUser } from '../services/recipes.service';
import { Splitter, Typography } from 'antd';
import { useState } from 'react';
import RecipeList from './RecipeList';

export default function RecipeFeed() {
  // const { user } = useAuth();
  // const [ currentRecipes, setCurrentRecipes ] = useState({});
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  // useEffect(() => {
  //     if(user != null || user != undefined) {
  //       const data = readRecipesByUser(user.id);
  //       // eslint-disable-next-line react-hooks/set-state-in-effect
  //       setCurrentRecipes(data);
  //     }
      
  //   }, [user])

  return (

    <Splitter style={{ height: '90%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Splitter.Panel defaultSize='30%' min="25%" max="50%">
        <RecipeList
          selectedRecipeId={selectedRecipeId}
          onSelect={setSelectedRecipeId}
        />
        {/* <Typography.Title style={{ whiteSpace: 'nowrap' }}>First</Typography.Title> */}
      </Splitter.Panel>
      <Splitter.Panel>
        <Typography.Title style={{ whiteSpace: 'nowrap' }}>Second</Typography.Title>
      </Splitter.Panel>
    </Splitter>
  )
}