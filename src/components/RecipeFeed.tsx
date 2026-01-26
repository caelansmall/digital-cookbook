import { Splitter, Typography } from 'antd';
import { useEffect, useState } from 'react';
import RecipeList from './RecipeList';

export default function RecipeFeed() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  useEffect(() => {
      // grab recipe from backend --> pass to RecipeView
      
    }, [selectedRecipeId])

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
