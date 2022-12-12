import { Container,Button, Form } from 'react-bootstrap';


const type:React.FC = function () {

    return (
      <div>
          
      <div>
      <h1 className='text-center'>HSU calendar app</h1>
      </div>
      <Container>
      <p>You are logged in</p>
      
      <br/>


      <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3">
            <a href="userlist">User list</a>
          </Form.Group>
          <Form.Group className="mb-3">
          <a href="modulemanagement">Event management</a>
          </Form.Group>
          <a href="../enter/login">  <Button>log out</Button> </a>
        </Form>
      


      
      </Container>
      </div>
    )
  }
  
  export default type