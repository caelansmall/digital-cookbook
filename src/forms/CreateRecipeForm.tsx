import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Typography, Spin, App, Card, Flex, AutoComplete, type AutoCompleteProps } from 'antd';
import '../styling/recipe-form.css';
import TextArea from 'antd/es/input/TextArea';
import { useAuth } from '../providers/AuthProvider';
import type { Recipe } from '../types/recipe.model';
import { createRecipe } from '../services/recipes.service';
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { readIngredientsByPartialName } from '../services/ingredients.service';
import debounce from 'lodash/debounce';
import SubmitButton from '../components/FormSubmitButton';

function RecipeForm() {
  const [spinning,setSpinning] = useState(false);
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [options,setOptions] = useState<AutoCompleteProps['options']>([]);
  const { message } = App.useApp();
  

  const onFinish = async (values: Recipe) => {

    if(!user || !user.id) {
      // console.log(user);
      return;
    }

    setSpinning(true);

    const newRecipe: Recipe = {
      title: values.title,
      description: values.description,
      ingredients: values.ingredients,
      instructions: values.instructions,
      userCreatedId: user?.id
    }

    newRecipe.instructions = newRecipe.instructions?.map((item,index) => {
      return {
        ...item,
        stepNumber: index+1,
      }
    });

    const newRecipeId = await createRecipe(newRecipe);

    if(newRecipeId && newRecipeId >= 0) {
      message.success("Recipe successfully created!");
      setSpinning(false);
      navigate("/feed", { state: { createRecipeSuccess: true, newRecipeId: newRecipeId }});
    }
  }

  const readIngredientOptions = debounce(async (searchText: string) => {

    if (typeof searchText !== "string" || !searchText) {
      setOptions([]);
      return;
    }

    const results = await readIngredientsByPartialName(searchText);

    setOptions(
      results.map((ingredient: { name: string }) => ({
        value: ingredient.name,
      }))
    );
  }, 300);

  return (
    <>
      <Spin spinning={spinning} fullscreen />

      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>

        <Card
          style={{ 
            width: '60%',
            borderRadius: '35px',
            paddingTop: '10px' 
          }} 
          title={<Title
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontWeight: 800,
                    fontSize: '24px',
                    lineHeight: 1.2,
                  }}
                  level={2}
                >New Recipe</Title>
            }
        >

          <Flex justify='center' align="center" style={{ flexDirection: 'column' }}>

            <Form
              name='createRecipe'
              layout='vertical'
              variant="underlined"
              autoComplete='off'
              onFinish={onFinish}
              form={form}
              style={{ width: '100%', maxWidth: 1000, fontFamily: 'Inter' }}
              initialValues={{
              ingredients: [
                  { name: '', quantity: '' },
                ],
              instructions: [
                  { name: '' },
                ],
              }}
            >

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item 
                    style={{ display: 'block' }}
                    hasFeedback
                    name='title'
                    label="Recipe Title"
                    validateTrigger='onBlur'
                    required
                    rules={[{ required: true, message: 'Enter recipe title' }, { max: 256, message: 'Title must be 256 characters or less.' }]}
                  >
                    <Input
                      placeholder='Enter title...'
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    style={{ display: 'block' }}
                    hasFeedback
                    name='description'
                    label="Description"
                    validateTrigger='onBlur'
                    rules={[{ max: 1024, message: 'Description must be 1024 characters or less.' }]}
                  >
                    <TextArea
                      placeholder='Enter description...'
                      style={{ width: '100%'}}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row
                align="middle"
                style={{
                  width: '100%',
                  columnGap: 16,
                  marginBottom: 12
                }}
              >
                <div style={{ flex: 2, }}
                >Ingredient</div>
                <div
                  style={{ flex: 1, }}
                >Quantity</div>
                <div
                  style={{ width: 24 }}
                />
              </Row>

              <Form.List name="ingredients">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField}) => (
                      <Row
                        key={key}
                        align="middle"
                        style={{ 
                          width: '100%',
                          columnGap: 16,
                          marginBottom: 12
                        }}
                      >
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name,'name']}
                          style={{ flex: 2, marginBottom: 0 }}
                          validateTrigger='onBlur'
                          rules={[{ required: true, message: 'Missing ingredient name' }, { max: 128, message: 'Ingredient name must be 128 characters or less.' }]}
                          required
                        >
                          <AutoComplete
                            options={options}
                            style={{ width: '100%' }}
                            onChange={readIngredientOptions}
                            placeholder="Enter ingredient..."
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name,'quantity']}
                          style={{ flex: 1, marginBottom: 0 }}
                          validateTrigger='onBlur'
                          rules={[{ required: true, message: 'Missing quantity'}, { max: 32, message: 'Quantity must be 32 characters or less.' }]}
                          required
                        >
                          <Input style={{ width: '100%'}} placeholder="Enter amount..." />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => {add(); setOptions([])}} block icon={<PlusOutlined />}>
                        Add ingredient
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Row
                justify="center"
                style={{
                  width: '100%',
                  columnGap: 16,
                  marginBottom: 12
                }}
              >
                <Title level={4}>Instructions</Title>
              </Row>

              <Form.List name="instructions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField}, index) => (
                      <Row
                        key={key}
                        align="middle"
                        style={{ 
                          width: '100%',
                          columnGap: 16,
                          marginBottom: 12
                        }}
                      >

                        <div
                          style={{
                            width: '24px',
                            textAlign: 'right',
                            fontWeight: 500,
                          }}
                        >
                          {index + 1}.
                        </div>

                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name,'name']}
                          style={{ flex: 2, marginBottom: 0 }}
                          validateTrigger='onBlur'
                          rules={[{ required: true, message: 'Incomplete instructions' }, { max: 1024, message: "Instruction but be 1024 characters or less." }]}
                          required
                        >
                          <TextArea 
                            variant="outlined"
                            placeholder="Enter instruction..."
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />
                        </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add instruction
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <SubmitButton form={form}>Submit</SubmitButton>
              </Form.Item>
            </Form>

          </Flex>
        </Card>
      </div>
    </>
  )
}

export default RecipeForm;
