import {Button, Container, Accordion, Form } from 'react-bootstrap'; 


const reg:React.FC = function () {

  
      return (
        <div> 

      <h1 className='text-center'>Register</h1>

        
        <p>Please fill in this form to create an account for public or student. </p>

        <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>If you are HSU student, please press it to input as well</Accordion.Header>
        <Accordion.Body>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Your Programme</Form.Label>
            <Form.Control type="text" name="Enter Programme" placeholder="BA-AHCC"/>  
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Year of entrance</Form.Label>
            <Form.Control type="text" name="Enter entrance" placeholder="2022"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Student ID</Form.Label>
            <Form.Control type="text" name="Enter student ID" placeholder="s200000"/>
          </Form.Group>

        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>User ID</Form.Label>
            <Form.Control type="text" name="Enter User ID" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Password</Form.Label>
            <Form.Control type="Password" name="Enter Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          By creating an account you agree to our <a href="#">Terms & Privacy</a>.
          </Form.Group>
          <Button variant="primary" type="submit">
            Registration
          </Button>
          <a href="../enter/login">  <Button>Back to Login</Button> </a>
        </Form>
    
      </div>
      )
    }
    
    export default reg