import { App, Typography, Flex, Card, Empty, Steps, Switch, Input, Button, Popconfirm, type PopconfirmProps, Spin } from "antd";
import type { Recipe } from "../types/recipe.model";
import { useEffect, useState } from "react";
import '../styling/recipe-view.css';
import TextArea from "antd/es/input/TextArea";
import { deleteRecipeById } from "../services/recipes.service";
import { useNavigate } from "react-router-dom";

interface RecipeViewProps {
  recipe: Recipe | null;
}

const RecipeView = (
  { recipe }: RecipeViewProps
) => {
  const { Title, Text, Paragraph } = Typography;
  const [current,setCurrent] = useState(0);
  const [isEditing,setIsEditing] = useState(false);
  const [draft,setDraft] = useState<Recipe | null>(null);
  const [spinning,setSpinning] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onChange = (value: number) => {
    setCurrent(value);
  }

  const swapEditMode = (checked: boolean) => {
    setIsEditing(checked);
  }

  const confirmDelete: PopconfirmProps['onConfirm'] = async (e) => {
    console.log(e)
    if(recipe && recipe.id) {
      setSpinning(true);
      const deletedId = await deleteRecipeById(recipe.id);
      console.log(deletedId)
      if(deletedId && deletedId.id > 0) {
        message.success("Recipe successfully deleted.")
        setSpinning(false);
        navigate('/feed', { state: { deleteRecipeSuccess: true }});
      }
    }
    
  }

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e)
  }

  const handleSave = async () => {
    console.log(draft);
  }

  useEffect(() => {
    setDraft(recipe);
    setCurrent(0);
    setIsEditing(false);
  },[recipe]);

  console.log(recipe)

  if (!recipe) {
    return <Empty style={{ paddingTop: '30px' }} description="No recipe selected..." />;
  } else {
    return (
      <>
        <Spin spinning={spinning} fullscreen />

        <Card variant="borderless">
          <Flex align="center" justify="space-between">
            {isEditing ? (
              <Input
                variant="underlined"
                value={draft?.title}
                onChange={(e) =>
                  setDraft(d => d && ({ ...d, title: e.target.value }))
                }
              />
            ) : (
              <Title 
                style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  margin: 0
                }} level={2}
              >{recipe.title}</Title>
            )}
            <Switch
              style={{
                marginLeft: '15px'
              }}
              checked={isEditing}
              checkedChildren=""
              unCheckedChildren=""
              onChange={swapEditMode}
            />
          </Flex>
        </Card>
        <Card title="Ingredients" variant="outlined">
          <Flex vertical gap={8}>
            {recipe.ingredients?.map((i, index) => (
              isEditing ? (
                <Flex key={index} gap={8}>
                  <Input
                    value={i.quantity}
                    onChange={(e) => {
                      if (!draft || !draft.ingredients) return;
                      const next = [...draft?.ingredients];
                      next[index] = { ...i, quantity: e.target.value };
                      setDraft({ ...draft, ingredients: next })
                    }}
                  />
                  <Input
                    value={i.name}
                    onChange={(e) => {
                      if (!draft || !draft.ingredients) return;
                      const next = [...draft?.ingredients];
                      next[index] = { ...i, name: e.target.value };
                      setDraft({ ...draft, ingredients: next})
                    }}
                  />
                </Flex>
              ) : (
                <Text
                  key={i.name}
                >• {i.quantity} {i.name}</Text>
              )
            ))}
          </Flex>
        </Card>
        <Card title="Instructions" variant="outlined">
          <Steps
            current={current}
            onChange={onChange}
            orientation="vertical"
            style={{ paddingLeft: '5%' }}
            items={recipe.instructions?.map((step,index) => ({
                title: isEditing ? null : (
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
                ),
                content: isEditing ? (
                  <TextArea
                    style={{
                      width: '100%',
                      resize: 'vertical'
                    }}
                    value={step.instruction}
                    onChange={(e) => {
                      if(!draft || !draft.instructions) return;
                      const next = [...draft?.instructions];
                      next[index] = { ...step, instruction: e.target.value };
                      setDraft({ ...draft, instructions: next });
                    }}
                  />
                ) : null
              })
            )}
          />
        </Card>
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: isEditing ? 200 : 120,
            zIndex: 1000
          }}
        >
          <Flex gap={12}>
            {isEditing ? (
              <>
                <Button
                  type="primary"
                  className="cancel-button"
                  onClick={handleSave}
                >Save</Button>

                <Button
                  onClick={() => {
                    setDraft(recipe);
                    setIsEditing(false);
                  }}
                >Cancel</Button>
              </>
            ) : (
              <Popconfirm
                title="Delete Recipe"
                description="Are you sure you want to delete this recipe? This cannot be undone."
                onConfirm={confirmDelete}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  // onClick={handleDelete}
                >Delete</Button>
              </Popconfirm>
            )}
          </Flex>
        </div>
      </>
    )
  }
}

export default RecipeView;
