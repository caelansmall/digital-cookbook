import { Typography, Flex, Card, Timeline, Empty } from "antd";
import type { Recipe } from "../types/recipe.model";

interface RecipeViewProps {
  recipe: Recipe | null;
}

const RecipeView = (
  { recipe }: RecipeViewProps
) => {
  const { Title, Text } = Typography;

  if (!recipe) {
    return <Empty style={{ paddingTop: '30px' }} description="No recipe selected..." />;
  } else {
    return (
      <>
        <Flex vertical gap={16}>
          <Title level={2}>{recipe.title}</Title>
        </Flex>
        <Card title="Ingredients" variant="outlined">
          <Flex vertical gap={8}>
            {recipe.ingredients?.map((i) => (
              <Text key={i.name}>
                • {i.quantity} {i.name}
              </Text>
            ))}
          </Flex>
        </Card>
        <Timeline
          items={recipe.instructions?.map((step, index) => ({
            children: (
              <Flex vertical gap={4}>
                <Text strong>Step {index+1}</Text>
                <Text>{step.name}</Text>
                {/* image goes here */}
              </Flex>
            ),
          }))}
        />
      </>
    )
  }
}

export default RecipeView;
