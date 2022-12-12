import {Container, Button, Form} from 'react-bootstrap';
import React, { useState } from 'react';


const login:React.FC = function () {
  const [ID, setID] = useState<string>("");
  const [PW, setPW] = useState<string>("");

  const resetInputField = () => {
    setID("");
    setPW("");
  };
    return (
      <div>
        
      <h1 className='text-center'>HSU calendar app</h1>

      <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User ID</Form.Label>
            <Form.Control type='text' value={ID} onChange={x => setID(x.target.value)} />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' value={PW} onChange={x => setPW(x.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <a href="../reg/registration">  <Button>registration</Button> </a>
        </Form>
      

      </div>
    )
  }
  
  export default login