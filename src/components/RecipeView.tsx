import { Typography, Flex, Card, Empty } from "antd";
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
            <Title style={{ fontFamily: 'Playfair Display, Georgia, serif', }} level={2}>{recipe.title}</Title>
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
          <Flex vertical gap={24}>
            {recipe.instructions?.map((step, index) => (
              <Flex key={index} align="flex-start">

                <Flex
                  justify="flex-end"
                  style={{ width: "25%", paddingRight: 16 }}
                >
                  <Text strong>
                    Step {index + 1}
                  </Text>
                </Flex>

                <Flex
                  vertical
                  align="center"
                  style={{ width: 24 }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      border: "2px solid #1677ff",
                      background: "#fff",
                      marginTop: '6px'
                    }}
                  />
                  {recipe.instructions && index < recipe.instructions.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        background: "#d9d9d9",
                        marginTop: 4,
                      }}
                    />
                  )}
                </Flex>

                <Flex style={{ flex: 1, paddingLeft: 16 }}>
                  <Text>
                    {step.instruction}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Card>
      </>
    )
  }
}

export default RecipeView;
