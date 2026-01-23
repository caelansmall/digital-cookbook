// import Form from 'react-bootstrap/Form';
// import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAuth } from '../providers/AuthProvider';

function RecipeForm() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { user } = useAuth();

  // const [ingredients, setIngredients] = useState([
  //   { name: '', quantity: '' }
  // ]);

  const onFinish = (values: any) => {
    // console.log('recieved values:',values);

    const newRecipe = {
      title: values.title,
      description: values.description,
      ingredients: values.ingredients,
      instructions: values.instructions,
      userCreatedId: user?.id
    }

    console.log(newRecipe);
  }

  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>

      <Form
        name='createRecipe'
        layout='vertical'
        variant="underlined"
        onFinish={onFinish}
        form={form}
        style={{ width: '100%', maxWidth: 1000 }}
        initialValues={{
        ingredients: [
            { name: '', quantity: '' },
          ],
        instructions: [
            { name: '' },
          ],
        }}
      >
        <Row
          justify="center"
          style={{
            width: '100%',
            columnGap: 16,
            marginTop: 20,
            marginBottom: 0
          }}
        >
          <Title
            style={{
              fontFamily: 'Inter',
              fontWeight: 300,
              fontSize: '24px',
              lineHeight: 1.2
            }}
            level={2}
          >New Recipe</Title>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item 
              style={{ display: 'block' }}
              name='title'
              label="Recipe Title"
              required
              rules={[{ required: true, message: 'Enter recipe title' }]}
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
            <Form.Item style={{ display: 'block' }} name='description' label="Description">
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
                    name={[name,'name']}
                    style={{ flex: 2, marginBottom: 0 }}
                    rules={[{ required: true, message: 'Missing ingredient name' }]}
                    required
                  >
                    <Input placeholder="Enter ingredient..." />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name,'quantity']}
                    style={{ flex: 1, marginBottom: 0 }}
                    rules={[{ required: true, message: 'Missing quantity'}]}
                    required
                  >
                    <Input style={{ width: '100%'}} placeholder="Enter amount..." />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
                      name={[name,'name']}
                      style={{ flex: 2, marginBottom: 0 }}
                      rules={[{ required: true, message: 'Incomplete instructions' }]}
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
          <Button type="primary" htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RecipeForm;