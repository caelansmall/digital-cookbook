// import Form from 'react-bootstrap/Form';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import { useState } from 'react';

function RecipeForm() {
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '' }
  ]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const values = [...ingredients];
    console.log(index)
    values.splice(index,1);
    console.log(values);
    setIngredients(values);
  };

  const handleChangeInput = (index: number, event) => {
    console.log(index,event)
    const values = [...ingredients];
    values[index][event.target.name] = event.target.value;
    setIngredients(values);
  };

  const handleSubmit = (event) => {
    console.log('Submitted data:',event);
  }

  return (
    <Container>
      <Form onSubmit={ handleSubmit }>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formRecipeTitle">
              <Form.Label className="text-start">Title</Form.Label>
              <Form.Control type="recipeTitle" placeholder='Enter Title...' required/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formRecipeDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="recipeDescription" placeholder='Enter Description...' />
            </Form.Group>
          </Col>
        </Row>
        {ingredients.map((ingredient,index) => {
          return (
            <div key={index}>
              <Row>
                <Col>
                  <Form.Group className="mg-3 pb-10" controlId="name">
                    <Form.Label>Ingredient</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name"
                      value={ingredient.name}
                      onChange={event => handleChangeInput(index, event)}
                      placeholder='Enter ingredient...' 
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mg-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="quantity"
                      value={ingredient.quantity}
                      onChange={event => handleChangeInput(index, event)}
                      placeholder='Enter quantity...' 
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button onClick={() => handleRemoveField(index)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          )
        })}
        <Button style={{ marginTop: '15px', backgroundColor: '#6B8E7F', borderColor: '#6B8E7F', color: 'white' }} onClick={handleAddIngredient}>Add Ingredient</Button>
      </Form>
    </Container>
  )
}

export default RecipeForm;