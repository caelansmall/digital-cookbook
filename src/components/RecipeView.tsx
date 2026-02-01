import { App, Typography, Flex, Card, Empty, Steps, Switch, Input, Button, Popconfirm, type PopconfirmProps, Spin, AutoComplete, Tooltip } from "antd";
import type { Ingredient, Recipe } from "../types/recipe.model";
import { useState } from "react";
import '../styling/recipe-view.css';
import TextArea from "antd/es/input/TextArea";
import { deleteRecipeById, updateRecipeById } from "../services/recipes.service";
import { useNavigate } from "react-router-dom";
import { EditFilled, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import { readIngredientsByPartialName } from "../services/ingredients.service";

interface RecipeViewProps {
  recipe: Recipe | null;
}

type IngredientOption = {
  value: string;
  label: string;
  ingredientId: number;
};

const RecipeView = (
  { recipe }: RecipeViewProps
) => {
  const [current,setCurrent] = useState(0);
  const [isEditing,setIsEditing] = useState(false);
  const [draft,setDraft] = useState<Recipe | null>(recipe);
  const [spinning,setSpinning] = useState(false);
  const [editDisabled,setEditDisabled] = useState(false);
  const [options,setOptions] = useState<IngredientOption[]>([]);
  const { Title, Text, Paragraph } = Typography;
  const { message } = App.useApp();
  const navigate = useNavigate();


  const onChange = (value: number) => {
    setCurrent(value);
  }

  const swapEditMode = (checked: boolean) => {
    setIsEditing(checked);
    setEditDisabled(checked);
  }

  const readIngredientByPartialName = debounce(async (searchText: string) => {
    if (typeof searchText !== "string" || !searchText.trim()) {
      setOptions([]);
      return;
    }

    const data = await readIngredientsByPartialName(searchText);

    setOptions(
      data.map((ingredient: {id: number; name: string}) => ({
        value: ingredient.name,
        label: ingredient.name,
        ingredientId: ingredient.id,
      }))
    );
  }, 300);

  const confirmDelete: PopconfirmProps['onConfirm'] = async () => {
    // console.log(e)
    if(recipe && recipe.id) {
      setSpinning(true);
      const deletedId = await deleteRecipeById(recipe.id);
      if(deletedId && deletedId.id > 0) {
        message.success("Recipe successfully deleted.")
        setSpinning(false);
        navigate('/feed', { state: { deleteRecipeSuccess: true }});
      }
    }
    
  }

  const addIngredient = () => {
    if (!draft) return;

    const nextIngredients = [
      ...(draft.ingredients ?? []),
      {
        ingredientAmountId: null, // important for backend diff logic
        ingredientId: null,
        name: "",
        quantity: "",
      },
    ];

    setDraft({
      ...draft,
      ingredients: nextIngredients,
    });
  };

  const removeIngredient = (index: number) => {
    if (!draft) return;

    const next = [...(draft.ingredients ?? [])];
    next.splice(index, 1);

    setDraft({
      ...draft,
      ingredients: next,
    });
  };

  const addStep = () => {
    if (!draft) return;

    const nextInstructions = [
      ...(draft.instructions ?? []),
      {
        id: null,           // null = new instruction
        instruction: "",
        stepNumber: (draft.instructions?.length ?? 0) + 1,
      },
    ];

    setDraft({
      ...draft,
      instructions: nextInstructions,
    });
  };

  const removeStep = (index: number) => {
    if (!draft) return;

    const next = [...(draft.instructions ?? [])];
    next.splice(index, 1);

    // re-number steps
    const renumbered = next.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));

    setDraft({
      ...draft,
      instructions: renumbered,
    });
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    // console.log(e)
  }

  const handleSave = async () => {

    if(draft){
      setSpinning(true);
      const updateId = await updateRecipeById(draft);

      if(updateId && updateId >= 0) {
        message.success("Recipe successfully updated!");
        swapEditMode(false);
        setSpinning(false);
        navigate("/feed", { state: { recipeUpdated: true, newRecipeId: updateId }});
      } else {
        message.error("Error updating recipe");
      }
    }
    
  }

  if (!recipe) {
    return <Empty style={{ paddingTop: '100px' }} description="No recipe selected..." />;
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
            <Tooltip
              placement="left"
              title={editDisabled ? "Press cancel to re-enter view mode." : null}
            >
              <Switch
                style={{
                  marginLeft: '15px'
                }}
                checked={isEditing}
                checkedChildren={<EditFilled />}
                unCheckedChildren={<EyeOutlined />}
                disabled={editDisabled}
                onChange={swapEditMode}
              />
            </Tooltip>
          </Flex>
          {(isEditing || recipe?.description) && (
            <div style={{ marginTop: 12 }}>
              {isEditing ? (
                <TextArea
                  variant="outlined"
                  placeholder="Enter description..."
                  value={draft?.description ?? ""}
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  style={{ width: '100%', textAlign: 'left' }}
                  onChange={(e) =>
                    setDraft(d => d && ({ ...d, description: e.target.value }))
                  }
                />
              ) : (
                <Paragraph
                  style={{
                    margin: 0,
                    fontSize: '15px',
                    color: '#555',
                    maxWidth: '100%',
                    textAlign: 'left'
                  }}
                >
                  {recipe.description}
                </Paragraph>
              )}
            </div>
          )}
        </Card>
        <Card title="Ingredients" variant="outlined">
          <Flex vertical gap={8}>

            {(isEditing ? draft?.ingredients : recipe.ingredients)?.map((i, index) => (
              isEditing ? (
                <Flex key={index} gap={8} style={{ width: '100%'}}>

                  <Input
                    value={i.quantity}
                    style={{ flex:1 }}
                    onChange={(e) => {
                      if (!draft || !draft.ingredients) return;
                      const next = [...draft.ingredients];
                      next[index] = { ...i, quantity: e.target.value };
                      setDraft({ ...draft, ingredients: next });
                    }}
                  />

                  <AutoComplete
                    options={options}
                    value={i.name}
                    style={{ flex:1 }}
                    placeholder="Enter ingredient..."
                    onChange={(e) => {
                      readIngredientByPartialName(e);
                      if(!draft || !draft.ingredients) return;
                      const next: Ingredient[] = [...draft.ingredients];
                      next[index] = {
                        ...i,
                        name: e,
                        ingredientId: null
                      };

                      setDraft({ ...draft, ingredients: next });
                    }}
                    onSelect={(value, option: IngredientOption) => {
                      if(!draft || !draft.ingredients) return;
                      const next = [...draft.ingredients];
                      next[index] = {
                        ...i,
                        name: value,
                        ingredientId: option.ingredientId ?? null,
                      };

                      setDraft({ ...draft, ingredients: next });
                    }}
                  />
                  <Button danger onClick={() => removeIngredient(index)}>
                    -
                  </Button>
                </Flex>
              ) : (
                <Text key={i.name}>• {i.quantity} {i.name}</Text>
              )
            ))}

            {isEditing && (
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={addIngredient}
                block
              >
                Add ingredient
              </Button>
            )}
          </Flex>

        </Card>

        <Card title="Instructions" variant="outlined">
          <Steps
            current={current}
            onChange={onChange}
            orientation="vertical"
            style={{ paddingLeft: '5%' }}
            items={(isEditing ? draft?.instructions : recipe.instructions)?.map((step,index) => ({
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
                <Flex gap={8}>
                  <TextArea
                    style={{ width: '100%', resize: 'vertical' }}
                    value={step.instruction}
                    onChange={(e) => {
                      if(!draft || !draft.instructions) return;
                      const next = [...draft.instructions];
                      next[index] = { ...step, instruction: e.target.value };
                      setDraft({ ...draft, instructions: next });
                    }}
                  />
                  <Button danger onClick={() => removeStep(index)}>
                    -
                  </Button>
                </Flex>
              ) : null
            }))}
          />

          {isEditing && (
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addStep}
              block
              style={{ marginTop: 16 }}
            >
              Add step
            </Button>
          )}
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
                    setEditDisabled(false);
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
