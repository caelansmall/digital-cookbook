import { Typography, Flex, Card, Timeline, Empty } from "antd";
import type { Recipe } from "../types/recipe.model";

interface RecipeViewProps {
  recipe: Recipe | null;
}

const RecipeView = (
  { recipe }: RecipeViewProps
) => {
  const { Title, Text } = Typography;
  console.log(recipe)
  if (!recipe) {
    return <Empty style={{ paddingTop: '30px' }} description="No recipe selected..." />;
  } else {
    return (
      <>
        <Card variant="borderless">
          <Flex vertical gap={16}>
            <Title level={2}>{recipe.title}</Title>
          </Flex>
        </Card>
        <Card title="Ingredients" variant="outlined">
          <Flex vertical gap={8}>
            {recipe.ingredients?.map((i) => (
              <Text key={i.name}>
                • {i.quantity} {i.name}
              </Text>
            ))}
          </Flex>
        </Card>
        <Card title="Instructions" variant="outlined">
          <Timeline
            mode='start'
            items={recipe.instructions?.map((step, index) => ({
              title: (
                <Text strong>Step {index+1}</Text>
              ),
              content: (
                <Text>{step.instruction}</Text>
              ),
            }))}
          />
        </Card>
      </>
    )
  }
}

export default RecipeView;
