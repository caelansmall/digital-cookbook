import { Typography, Flex, Card, Empty, Steps } from "antd";
import type { Recipe } from "../types/recipe.model";
import { useEffect, useState } from "react";
import '../styling/recipe-view.css';

interface RecipeViewProps {
  recipe: Recipe | null;
}

const RecipeView = (
  { recipe }: RecipeViewProps
) => {
  const { Title, Text, Paragraph } = Typography;
  const [current,setCurrent] = useState(0);

  const onChange = (value: number) => {
    setCurrent(value);
  }

  useEffect(() => {
    setCurrent(0);
  },[recipe]);

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
          <Steps
            current={current}
            onChange={onChange}
            orientation="vertical"
            style={{ paddingLeft: '5%'}}
            items={recipe.instructions?.map((step) => ({
                title: (
                  <div style={{ paddingTop: 4}}>
                    <Paragraph
                      style={{
                        lineHeight: 1.6,
                        marginBottom: 0,
                        maxWidth: 600,
                      }}
                    >
                      { step.instruction }
                    </Paragraph>
                  </div>
                )
              })
            )}
          />
        </Card>
      </>
    )
  }
}

export default RecipeView;
