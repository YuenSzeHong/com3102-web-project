import { Container,Button } from 'react-bootstrap';


const type:React.FC = function () {

    return (
      <div>
          
      <div>
      <h1 className='text-center'>HSU calendar app</h1>
      </div>
      <Container>
      <p>You are logged in</p>
      <a href="../page/admin">admin page</a>
      <br/>
      <a href="../page/teacher">teacher page</a>
      <br/>
      <a href="../page/student">student/public page</a>
      <br/>
      <a href="../enter/login"><Button>log out</Button></a>

      
      </Container>
      </div>
    )
  }
  
  export default type